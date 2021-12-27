import React from "react";

import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import $ from 'jquery';
import './index.scss';

export default class Default extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        $('body').addClass('default-template');
    }
    render(){
        return(
            <>
                <Header/>
                <Sidebar/>
                {this.props.children}
                <Footer/>
            </>
        )
    }
}
