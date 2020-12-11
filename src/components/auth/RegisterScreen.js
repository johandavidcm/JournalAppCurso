import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const[ formValues, handleInputChange ] = useForm({
        name: 'Johan David',
        email: 'johancarras16@gmail.com',
        password: '1234',
        password2: '1234'
    });

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if( isFormValid() ){
            console.log('Formulario Valido');
            dispatch( startRegisterEmailPasswordName(email, password, name) );
        }
    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch( setError('Ingrese un nombre') );
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch( setError('Ingrese un email válido') );
            return false;
        }else if( password !== password2 || password.length < 5){
            dispatch( setError('Las contraseñas no coinciden o no cumplen el requisito de longitud') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={ handleRegister }>
                {
                    msgError && (
                    <div
                        className="auth__alert-error"
                    >
                        { msgError }
                    </div>)
                }
                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value= { name }
                />
                <input
                    type="email"
                    placeholder="Correo"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value= { email }
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value= { password }
                />
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    name="password2"
                    className="auth__input"
                    onChange={ handleInputChange }
                    value= { password2 }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Registrar
                </button>
                <hr/>
                <Link
                    to="/auth/login"
                    className="link"
                >
                    Alredy registered?
                </Link>
            </form>
        </>
    )
}
