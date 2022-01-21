import {createStore} from "redux";
import reducer from './reducer.jsx';
var Provider = require("react-redux").Provider;

var store = createStore(reducer, {
  user: null,
  code: (typeof code === 'undefined')?200:code
});
window.store = store;
import * as actions from "./actions.jsx";
window.actions = actions;

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

