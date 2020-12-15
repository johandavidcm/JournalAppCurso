import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes)
    
    const [ formValues, handleInputChange, reset ] = useForm( note );

    const { body, title, id } = formValues;

    const activeId = useRef( note.id );
    
    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }

    useEffect(() => {
        if( activeId.current !== note.id ){
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch( activeNote( formValues.id, {
            ...formValues
        }))
    }, [formValues, dispatch]);

    return (
        <div className="notes__main-content animate__animated animate__fadeInRight">
            <NotesAppBar/>
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange= { handleInputChange }
                    name="title"
                />
                <textarea
                    placeholder="What Happened today little bitch faggot?"
                    className="notes__textarea"
                    value={ body }
                    onChange= { handleInputChange }
                    name="body"
                ></textarea>
                {
                    (note.url) &&
                    <div>
                        <img
                            className="notes__image"
                            src={ note.url }
                            alt="Galaxia Washo"
                        />
                    </div>
                }
            </div>
            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
