import { useState } from "react";
import Cart from '../template/Default/Cart';
import Input from '../template/Default/Elements/InputFG.jsx';
import {Navigate} from "react-router-dom";
import routes from "../../router/routes";
import { toast } from 'react-toastify';

export default (props)=>{
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasCon] = useState('');
    const [redir, setRedir] = useState(false);
    const [errors, setErrors] = useState({});


    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const email = params.get('email');

    if(!redir){
        return (
            <Cart
            header={'Восстановление пароля'}
            body={
                <form>
                    <Input label="пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password}/>
                    <Input label="Повтроите пароль" type="password" id="password_conf" value={password_confirmation} onChange={e=>setPasCon(e.target.value)} errors={errors.password_confirmation}/>

                    <button type="button" className="btn btn-success" onClick={()=>{
                        window.api.post('/password/resend', {password, password_confirmation, token, email})
                            .then(response=>{
                                toast.success('Пароль успешно сброшен!');
                                setRedir(true);
                            })
                            .catch(errors=>{
                                setErrors(errors);
                            });
                    }}>
                        Восстановить
                    </button>
                </form>
            }/>
        )
    } else{
        return (<Navigate to={routes.home}/>);
    }
}
