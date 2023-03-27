import { useState } from "react";
import Template from '../template/Default/Auth/index';
import Input from '../template/Default/Elements/InputFG.jsx';
import Checkbox from '../template/Default/Elements/Checkbox.jsx';
import init from '../../modules/init.js';
import {NavLink} from "react-router-dom";
import routes from "../../router/routes";


export default (props)=>{
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState('');
    const [errors, setErrors] = useState({});
    return (
        <Template name="Вход">
            <Input placeholder="Телефон" mask="+7(999)999-99-99" id="phone" value={phone} onChange={e=>setPhone(e.target.value)} errors={errors.phone}/>
            <Input label="passwod" eye={0} placeholder="Пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password} inp_help={
                <NavLink to={routes.forgot}>Не помню пароль</NavLink>
            }/>
            <button type="button" className="btn btn-success" onClick={()=>{
                window.api.post('/login', {phone, password})
                    .then(response=>{
                        init();
                    })
                    .catch(errors=>{
                        setErrors(errors);
                    });
            }}>
                Войти
            </button>
        </Template>
    )
}
