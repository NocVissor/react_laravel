import React, {useState, useEffect} from "react";
import Auth from '../../../middleware/auth';
import Admin from '../../../middleware/admin';
import {NavLink} from "react-router-dom";
import routes from "../../../router/routes";
import { observer } from "mobx-react"
export default observer(()=>{

    const user = window.store.user;

    return(
        <header>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <NavLink to={routes.home}>Главная</NavLink>
                        <NavLink to={routes.example}>Ex</NavLink>
                        <NavLink to={routes.example2}>Ex-2</NavLink>
                        <Admin Yes={()=>
                            <NavLink to={routes.admin.users}>Пользователи</NavLink>
                        }/>
                    </div>
                    <Auth Yes={()=>
                        <div className="col user">
                            <NavLink to={routes.settings}>{user.name}</NavLink>
                        </div>
                    }
                    No ={()=>
                        <div className="col auth">
                            <NavLink to={routes.login}>Вход</NavLink>
                            <NavLink to={routes.register}>Регистрация</NavLink>
                        </div>
                    }/>
                </div>
            </div>
        </header>
    )
});
