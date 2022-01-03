import React from "react";

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../components/Home.jsx';
import Example from '../components/Example.jsx';
import Template from '../components/template/Default/Index.jsx';
import routes from './routes';
import Auth from '../middleware/auth';
import RouterAuth from './router_auth';


export default function (params) {

    return (
        <BrowserRouter history={history}>
            <Template>
                <Routes>
                    <Route path={routes.example} element={ <Example id=""/> } />
                    <Route path={routes.example2} element={ <Example id="2"/> } />
                    <Route path={routes.home} element={<Home/>} />
                </Routes>
                <RouterAuth/>
            </Template>
        </BrowserRouter>
    )
}
