import Cart from './template/Default/Cart';
import { useState, useEffect } from "react";
import init from '../modules/init.js';
import Input from './template/Default/Elements/InputFG.jsx';
import { toast } from 'react-toastify';
import { observer } from "mobx-react";
import {NavLink} from 'react-router-dom';
export default observer(()=>{

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [old, setOld] = useState('');
    const [password_confirmation, setPasCon] = useState('');
    const [errors, setErrors] = useState({});

    const noChange = true;

    function parseUser(user){
        setEmail(user.email);
        setName(user.name);
    }

    const storeUser = window.store.user;

    useEffect(()=>{
        window.add_init(()=>{
            if(serval.noAjax && typeof serval.user !== 'undefined'){
                serval.noAjax = false;
                parseUser(serval.user);
            }
            else{
                window.api.get('/settings' ).then(response=>{
                    parseUser(response.user);
                }).catch(()=>{});
            }
        });
    }, [noChange]);

    return (
        <Cart
        header={'Настройки'}
        body={
            <form>
                <Input label="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
                { !storeUser.verify_email && <button type="button" className="btn btn-success" onClick={()=>{
                    window.api.post('/email/verify/resend')
                        .then(response=>{
                            toast.success('Письмо отправлено!');
                        })
                        .catch(e=>{});
                    }}>
                    Подтвердить почту
                </button>
                }

                <Input label="Логин" id="name" value={name} onChange={e=>setName(e.target.value)} errors={errors.name}/>
                <Input
                after={<NavLink to={window.routes.forgot}>Не помню старый пароль</NavLink>}
                label="Старый пароль" type="password" id="old" value={old} onChange={e=>setOld(e.target.value)} errors={errors.old}/>
                <Input label="Новый пароль" type="password" id="password" value={password} onChange={e=>setPassword(e.target.value)} errors={errors.password}/>
                <Input label="Повтроите пароль" type="password" id="password_conf" value={password_confirmation} onChange={e=>setPasCon(e.target.value)} errors={errors.password_confirmation}/>

                <button type="button" className="btn btn-success" onClick={()=>{
                    window.api.post('/settings', {email, password, name, old, password_confirmation})
                        .then(response=>{
                            setErrors([]);
                            if(response.pass){
                                setOld('');
                                setPassword('');
                                setPasCon('');
                            }
                            init();
                        })
                        .catch(errors=>{
                            setErrors(errors);
                        });
                    }}>
                    Сохранить
                </button>


                <button type="button" className="btn btn-danger" onClick={()=>{
                    window.api.get('/logout')
                        .then(response=>{
                            init();
                        })
                        .catch(e=>{});
                    }}>
                    Выйти
                </button>

            </form>
        }/>
    );
});
