var redux = require("redux");
var reducer = require("./reducer.jsx");

var store = redux.createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: {
    test:  test
  }
});
console.log(store);



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

