import FG from './FormGroup.jsx';
import { useEffect, useState } from 'react';
import React from 'react';

function Checkbox(props){
    const label = (
    <label htmlFor={props.id} className="form-check-label form-label">
        {props.label}
    </label>);
    return (<div className="form-check">
        <input {...props} type="checkbox" className={'form-check-input '+(props.errors.length > 0?' is-invalid  ':'')} />
        {label}

        {props.error_show && props.errors.map((error, i)=>(
            <React.Fragment key={error}>
                <small className="form-text text-danger" >{error}</small>
            </React.Fragment>
        ))}
    </div>
    );
}



Checkbox.defaultProps = {
    type: 'text',
    onChange: ()=>false,
    checked: false,
    id: '',
    errors: [],
    error_show: true

}

export default Checkbox;
