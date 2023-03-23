import { useState } from "react";
import Template from '../template/Default/Auth/index';
import Input from '../template/Default/Elements/InputFG.jsx';
import init from '../../modules/init.js';
import Checkbox from '../template/Default/Elements/Checkbox.jsx';

export default (props)=>{
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasCon] = useState('');
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const [agreeER, setAgreeER] = useState([]);
    return (
        <Template mode="register">
            <form>
                <Input label="Email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
                <Input label="Username" id="name" value={name} onChange={e=>setName(e.target.value)} errors={errors.name}/>
                <Input label="Password" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password}/>
                <Input label="Repeat password" type="password" id="password_conf" value={password_confirmation} onChange={e=>setPasCon(e.target.value)} errors={errors.password_confirmation}/>
                <Checkbox error_show={false} errors={agreeER} label={<>I agree to<a className="ms-25" href="/" onClick={e=>e.preventDefault()}>privacy policy &amp; terms</a></>} checked={agree} onChange={e=>{setAgree(e.target.checked)}}/>
                <button type="button" className="btn btn-primary d-block w-100" onClick={()=>{
                    if(agree){
                        setAgreeER([]);
                        window.api.post('/register', {email, password, name, password_confirmation})
                        .then(response=>{
                            init();
                        })
                        .catch(errors=>{
                            setErrors(errors);
                        });
                    }
                    else{
                        setAgreeER(['required']);
                    }
                }}>
                    Sign up
                </button>
            </form>
        </Template>
    )
}
