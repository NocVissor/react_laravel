var redux = require("redux");
var reducer = require("./reducer.jsx");

var store = redux.createStore(reducer);



let inistate = {};

if(typeof test !== 'undefined'){
    inistate.test = test;
}







store.dispatch({
    type: "SET_STATE",
    state: inistate
});

import React from "react";
var Provider = require("react-redux").Provider;

export default class Store extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

