import Auth from '../../middleware/auth';
import Login from '../../components/auth/login.jsx';
import Register from '../../components/auth/register.jsx';
import Verify from '../../components/auth/verify.jsx';
import routes from '../routes';
import React from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';

export default (
        <React.Fragment>
            <Route path={routes.login} element={
                <Auth No={()=>
                    <Login/>
                } Yes={()=>
                    <Navigate to={routes.unAuth} />
                } />
            } />

            <Route path={routes.register} element={
                <Auth No={()=>
                    <Register/>
                } Yes={()=>
                    <Navigate to={routes.unAuth} />
                } />
            } />

            <Route path={routes.verify} element={
                <Auth No={()=>
                    <Navigate to={routes.login} />
                } Yes={()=>
                    <Verify />
                } />
            } />



        </React.Fragment>
    );
