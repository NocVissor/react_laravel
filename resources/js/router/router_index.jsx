import React from "react";

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../components/Home.jsx';
import Example from '../components/Example.jsx';

export default class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/example" element={<Example/>} />
                    <Route path="/" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}
