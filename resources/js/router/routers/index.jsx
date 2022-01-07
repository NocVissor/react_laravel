import routes from '../routes';
import React from 'react';
import { Route, Routes, Navigate  } from 'react-router-dom';
import RouterAuth from './auth.jsx';

import Home from '../../components/Home.jsx';
import Example from '../../components/Example.jsx';
import Settings from '../../components/settings.jsx';
import Auth from '../../middleware/auth';


export default ()=>{
    return (
        <>
            <Routes>
                <Route path={routes.example} element={ <Example id=""/> } />
                <Route path={routes.example2} element={ <Example id="2"/> } />
                <Route path={routes.home} element={<Home/>} />
                <Route path={routes.settings} element={
                    <Auth Yes={()=>
                        <Settings/>
                    } No={()=>
                        <Navigate to={routes.unAuth} />
                    } />
                } />
                {RouterAuth}

            </Routes>

        </>
    )
}
