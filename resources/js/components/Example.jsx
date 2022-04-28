import React, {useEffect} from 'react';

export default class Example extends React.Component {

    constructor(props){
        super(props);
        this.state = {test: null}
        this.updateAxios = this.updateAxios.bind(this);
    }

    updateAxios(){
        window.api.post('/example'+this.props.id ).then(responce=>{
            this.setState({test: responce.test});
        }).catch(()=>{});
    }

    componentDidMount(){
        window.add_init(()=>{

            if(serval.noAjax && typeof serval.test !== 'undefined'){
                serval.noAjax = false;
                this.setState({test: serval.test});
            }
            else{
                this.updateAxios();
            }

        });
    }
    componentDidUpdate(prevProps){
        if(this.props.id != prevProps.id){
            this.updateAxios();
        }
    }
    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>
                            {this.state.test}
                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

