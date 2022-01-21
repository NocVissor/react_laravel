import { useSelector } from "react-redux";

import {useState, useEffect} from 'react';

export default function Auth(props){
    const user = useSelector(state=>state.user)

    if(user !== null && user && props.Yes){
        var Yes = props.Yes;
        return <Yes />
    }
    else if(user !== null && props.No){
        var No = props.No;
        return <No />;
    }
    return null;
}
