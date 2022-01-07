import { useState } from "react";
import Cart from '../template/Default/Cart';
import Input from '../template/Default/Elements/InputFG.jsx';
import init from '../../modules/init.js';

export default (props)=>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasCon] = useState('');
    const [errors, setErrors] = useState({});
    return (
        <Cart
        header={'Регистрация'}
        body={
            <form>
                <Input label="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
                <Input label="Логин" id="name" value={name} onChange={e=>setName(e.target.value)} errors={errors.name}/>
                <Input label="пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password}/>
                <Input label="Повтроите пароль" type="password" id="password_conf" value={password_confirmation} onChange={e=>setPasCon(e.target.value)} errors={errors.password_confirmation}/>
                <button type="button" className="btn btn-success" onClick={()=>{
                    window.api.post('/register', {email, password, name, password_confirmation})
                        .then(response=>{
                            init();
                        })
                        .catch(errors=>{
                            setErrors(errors);
                        });
                }}>
                    Регистрация
                </button>
            </form>
        }/>
    )
}
