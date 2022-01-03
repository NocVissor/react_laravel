import FG from './FormGroup.jsx';

function InputFG(props){
    return (
        <FG
            {...props}
            input={
                <input className="form-control" {...props} aria-describedby={props.id + ' - describedby'} />
            }
        />
    );
}

InputFG.defaultProps = {
    value: null,
    type: 'text',
    onChange: ()=>false,
    id: ''
}

export default InputFG;
