import FG from './FormGroup.jsx';
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
function InputFG(props){
    const [show, setShow] = useState(false);
    return (
        <FG
            {...props}
            input={
                <>
                    {(props.type == 'password' && props.eye == true) && (

                    <div className="input-group-merge input-group">
                        <>
                            {props.mask && (
                                <InputMask mask={props.mask} className={'form-control '+(props.errors.length > 0?' is-invalid  ':'')} {...props} type={show?'text':'password'} aria-describedby={props.id + ' - describedby'} />
                            )}
                            {!props.mask && (
                                <input className={'form-control '+(props.errors.length > 0?' is-invalid  ':'')} {...props} type={show?'text':'password'} aria-describedby={props.id + ' - describedby'} />
                            )}
                        </>

                       
                       {show && 
                        <span className="cursor-pointer input-group-text" onClick={()=>{setShow(false)}}>
                            <img src="storage/assets/images/eye-close.svg"/>
                        </span>}
                        {!show && 
                        <span className="cursor-pointer input-group-text"  onClick={()=>{setShow(true)}}>
                            <img src="storage/assets/images/eye-open.svg"/>
                        </span>}
                    </div>
                    )}
                    {!(props.type == 'password' && props.eye == true) && (
                    <>
                        {props.mask && (
                            <InputMask mask={props.mask} className={'form-control '+(props.errors.length > 0?' is-invalid  ':'')} {...props} aria-describedby={props.id + ' - describedby'} />
                        )}
                        {!props.mask && (
                            <input className={'form-control '+(props.errors.length > 0?' is-invalid  ':'')} {...props} aria-describedby={props.id + ' - describedby'} />
                        )}
                    </>
                    )}
                    {props.after}
                </>
            }
        />
    );
}

InputFG.defaultProps = {
    value: null,
    type: 'text',
    onChange: ()=>false,
    id: '',
    after: '',
    mask: {
        type: Boolean,
        value: false,
    },
    eye: 1,
    errors: []
}

export default InputFG;
