import React, {useEffect} from "react";

import { BrowserRouter } from 'react-router-dom';

import Template from '../components/template/Default/Index.jsx';
import RouterIndex from './routers/index.jsx';
import NF from '../components/404.jsx';

import { useLocation } from 'react-router-dom';


var firstLoad = true;

function RouterHandler(props){
    const location = useLocation();
    useEffect(() => {
        if(!firstLoad){
            if(window.store.code == 404){
                window.store.code = 200;
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



import { observer } from "mobx-react"

export default observer((props)=>{
    let Content;
    if(window.store.code == 404){
        Content = <NF/>
    }
    else{
        Content = <RouterIndex/>
    }

    return (
        <BrowserRouter history={history}>
            <RouterHandler/>

            <Template>{Content}</Template>
        </BrowserRouter>
    )
});





