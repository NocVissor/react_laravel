import React from 'react';
function FormGroup(props) {
    let describedby = props.id + ' - describedby';
    let label = <></>;
    if(props.label){
        label = (
        <label htmlFor={props.id} className="form-label">
            {props.label}
        </label>);
    }
    return (
        <div className="from-group">

            
            {props.help ?
                <div className="d-flex justify-content-between">
                    {label}
                    {props.help}
                </div>
            :label}
            {props.input}
            <div className="inp_help">{props.inp_help}</div>
            {
                props.errors.map((error, i)=>(
                    <React.Fragment key={error}>
                        <small className="form-text text-danger" >{error}</small>
                    </React.Fragment>
                ))
            }

        </div>
    )
}

FormGroup.defaultProps = {
    label: '',
    id: '',
    input: <></>,
    help: null,
    inp_help: null,
    errors: []
}

export default FormGroup;
