import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggeIn, setIsLoggeIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ){
                dispatch(login( user.uid, user.displayName ));
                dispatch( startLoadingNotes( user.uid ) );
                setIsLoggeIn( true );
            }
            else{
                setIsLoggeIn(false);
            }
            setChecking(false);
        })
    }, [ dispatch, setChecking, setIsLoggeIn ]);


    if( checking ){
        return(
            <h1>Espere</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component= { AuthRouter }
                        isAuth = { isLoggeIn }
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        isAuth={ isLoggeIn }
                        component={ JournalScreen }
                    />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
