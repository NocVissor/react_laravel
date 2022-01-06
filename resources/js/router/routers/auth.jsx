import Auth from '../../middleware/auth';
import Login from '../../components/auth/login.jsx';
import routes from '../routes';
import React from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';

export default ()=>{
    return (
        <Routes>
            <Route path={routes.login} element={
                <Auth No={()=>
                    <Login/>
                } Yes={()=>
                    <Navigate to={routes.home} />
                } />
            } />
        </Routes>
    )
}
