import React, {useState, useEffect} from "react";

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Template from '../components/template/Default/Index.jsx';
import RouterIndex from './routers/index.jsx';
import NF from '../components/404.jsx';


import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';


var firstLoad = true;

function RouterHandler(props){
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if(!firstLoad){
            if(window.store.getState().code == 404){
                dispatch(window.actions.setCode(200));
            }
        }
        else{
            firstLoad = false;
        }
    },[location.pathname, location.search]);

    return (<>
        {props.children}
    </>);
}





export default function RouterContainer(params) {
    const code = useSelector(state=>state.code);
    let Content;
    if(code == 404){
        Content = <NF/>
    }
    else{
        Content = <RouterIndex/>
    }

    return (
        <BrowserRouter history={history}>
            <RouterHandler/>

            <Template>
                {Content}
            </Template>
        </BrowserRouter>
    )
}





