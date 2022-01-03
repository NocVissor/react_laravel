import React from "react";
import Auth from '../../../middleware/auth';
import {NavLink} from "react-router-dom";
import routes from "../../../router/routes";
export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <NavLink to={routes.home}>Главная</NavLink>
                            <NavLink to={routes.example}>Ex</NavLink>
                            <NavLink to={routes.example2}>Ex-2</NavLink>
                        </div>
                        <Auth Yes={()=>
                            <div className="col user">
                                user
                            </div>
                        }
                        No ={()=>
                            <div className="col auth">
                                <NavLink to={routes.login}>Вход</NavLink>
                            </div>
                        }/>
                    </div>
                </div>
            </header>
        )
    }
}
