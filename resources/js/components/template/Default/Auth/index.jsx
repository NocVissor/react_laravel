import React from "react";
// import "@fontsource/montserrat";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss';
import Cart from '../Cart';
import './index.scss';
import routes from "../../../../router/routes";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
export default class Default extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Cart
            header={'Вход'}
            body={
                <form>
                    {this.props.children}
                </form>  
            }/>
        );         
    }
}
