import { useState } from "react";
import Cart from '../template/Default/Cart';
import Input from '../template/Default/Elements/InputFG.jsx';
import init from '../../modules/init.js';
import {NavLink} from "react-router-dom";
import routes from "../../router/routes";

export default (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    return (
        <Cart
        header={'Вход'}
        body={
            <form>
                <Input label="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
                <Input label="пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password} help={
                    <NavLink to={routes.forgot}>Восстановить пароль</NavLink>
                }/>
                <button type="button" className="btn btn-success" onClick={()=>{
                    window.api.post('/login', {email, password})
                        .then(response=>{
                            init();
                        })
                        .catch(errors=>{
                            setErrors(errors);
                        });
                }}>
                    Войти
                </button>
            </form>
        }/>
    )
}
