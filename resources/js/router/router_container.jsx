import React, {useState, useEffect} from "react";

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Template from '../components/template/Default/Index.jsx';
import RouterIndex from './routers/index.jsx';
import NF from '../components/404.jsx';
import store from 'js-simple-store';

import { useLocation } from 'react-router-dom';


var firstLoad = true;

function RouterHandler(props){
    const location = useLocation();
    useEffect(() => {
        if(!firstLoad){
            if(store.getState('code', code) == 404){
                store.setState('code', 200);
            }
        }
        else{
            firstLoad = false;
        }
    });

    return (<>
        {props.children}
    </>);
}





export default function RouterContainer(params) {


    var StoreCode = store.getState('code', code);

    const [Hcode, SetHcode] = useState(StoreCode);
    let calId = store.addCallback('code', ({to})=>{
        SetHcode(to)
    });
    useEffect(() =>()=>store.clearCallback('code', calId));
    let Content;
    if(Hcode == 404){
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





