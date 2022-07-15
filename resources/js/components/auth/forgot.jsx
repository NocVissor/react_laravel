import { useState } from "react";
import Cart from '../template/Default/Cart';
import Input from '../template/Default/Elements/InputFG.jsx';
import {Navigate} from "react-router-dom";
import routes from "../../router/routes";
import { toast } from 'react-toastify';
import Template from '../template/Default/Auth/index';
export default (props)=>{
    const [email, setEmail] = useState('');
    const [redir, setRedir] = useState(false);
    const [errors, setErrors] = useState({});
    if(!redir){
        return (
            <Template mode="forgot">
                <>
                    <form>
                        <Input label="Email" id="email" value={email} onChange={e=>setEmail(e.target.value)} errors={errors.email}/>
                        <button type="button" className="btn btn-primary d-block w-100" onClick={()=>{
                            window.api.post('/password/forgot', {email})
                                .then(response=>{
                                    toast.success('Ссылка для сброса пароля отправлена на вашу почту');
                                    setRedir(true);
                                })
                                .catch(errors=>{
                                    setErrors(errors);
                                });
                        }}>
                            Send reset link
                        </button>
                    </form>
                </>
            </Template>

        )
    } else{
        return (<Navigate to={routes.home}/>);
    }
}
