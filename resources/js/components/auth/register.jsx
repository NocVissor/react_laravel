import { useState } from "react";
import Template from '../template/Default/Auth/index';
import Input from '../template/Default/Elements/InputFG.jsx';
import init from '../../modules/init.js';
import Checkbox from '../template/Default/Elements/Checkbox.jsx';

export default (props)=>{
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasCon] = useState('');
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const [agreeER, setAgreeER] = useState([]);
    const [phoneConfirmed, setPhoneConfirmed] = useState(false);
    const [sendSms, setSendSms] = useState(false);
    
    return (
        <Template name="Регистрация">
            <Input
            onChange={e=>{
                setPhoneConfirmed(false);
                setSendSms(false);
                setPhone(e.target.value);
            }}
            placeholder="+7(999)999-99-99" mask="+7(999)999-99-99" label="Телефон" id="phone" value={phone} errors={errors.phone}/>
            {(!sendSms && !phoneConfirmed) && 
                <button type="button" className="btn btn-primary" onClick={()=>{
                window.api.post('/send-phone-code', {phone})
                .then(response=>{
                    setSendSms(true);
                })
                .catch(errors=>{
                    setErrors(errors);
                });
                }}>Подтвердить телефон</button>
            }
            {sendSms && !phoneConfirmed && <>
                <Input label="sms код" id="code" value={code} onChange={e=>setCode(e.target.value)} errors={errors.code}/>
                <button type="button" className="btn btn-primary" onClick={()=>{
                window.api.post('/confirm-phone', {phone, code})
                .then(response=>{
                    setPhoneConfirmed(true);
                })
                .catch(errors=>{
                
                    setErrors(errors);
                });
                }}>Отправить код</button>
            </>}
            {phoneConfirmed && <>
                <span class="badge badge-success">Телефон подтверждён!</span>
            </>}
            <Input label="Как вас зовут?" id="name" value={name} onChange={e=>setName(e.target.value)} errors={errors.name}/>
            <Input label="Email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
            <Input placeholder="Пароль" label="пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password}/>
            <Input label="Повтроите пароль" type="password" id="password_conf" value={password_confirmation} onChange={e=>setPasCon(e.target.value)} errors={errors.password_confirmation}/>
            

            <button disabled={!phoneConfirmed} type="button" className="btn btn-success" onClick={()=>{
                window.api.post('/register', {phone, code, password, email, name, password_confirmation})
                    .then(response=>{
                        init();
                    })
                    .catch(errors=>{
                        setErrors(errors);
                    });
            }}>
                Регистрация
            </button>

        </Template>
    )
}
