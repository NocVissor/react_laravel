import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

function Example() {

    useEffect(() => {
        window.api.post('test', {one: 'a'})
        .then(responce=>{
            console.log(responce);
            console.log('success');
        })
        .catch(errors=>{
            console.log(errors);
            console.log('error');
        });
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
