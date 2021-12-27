import React, {useEffect} from 'react';

class Example extends React.Component {

    constructor(props){
        super(props);
        this.state = { timer: null }
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            window.api.get('/example', {one: 'a'})
            .then(response=>{
                if(response.test){
                    this.props.setState({test: response.test});
                }
            })
            .catch(errors=>{
                console.log(errors);
            });
        }, 9000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>
                            {this.props.test}
                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        test: state.get("test")
    };
}

var actions = require("../redux/actions.jsx");
var connect = require("react-redux").connect;
export default  connect(mapStateToProps, actions)(Example);

