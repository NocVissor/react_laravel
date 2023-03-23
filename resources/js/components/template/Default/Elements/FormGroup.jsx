import React from 'react';
function FormGroup(props) {
    let describedby = props.id + ' - describedby';
    return (
        <div className="from-group">
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {props.input}
            {props.help ?
            <small id={describedby} className="form-text text-muted">{props.help}</small>
            :false}

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
    help: false,
    errors: []
}

export default FormGroup;
