import routes from '../routes';
import React from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';
import RouterAuth from './auth.jsx';
import RouterAdmin from './admin.jsx';

import Home from '../../components/Home.jsx';
import Settings from '../../components/settings.jsx';
import Auth from '../../middleware/auth';


export default ()=>{
    return (
        <>
            <Routes>
                <Route path={routes.home} element={
                    <Auth Yes={()=>
                        <Home/>
                    } No={()=>
                        <Navigate to={routes.login} />
                    } />
                } />
                <Route path={routes.settings} element={
                    <Auth Yes={()=>
                        <Settings/>
                    } No={()=>
                        <Navigate to={routes.login} />
                    } />
                } />
                {RouterAuth}
                {RouterAdmin}

            </Routes>

        </>
    )
}
