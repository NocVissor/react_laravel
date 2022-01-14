import store from 'js-simple-store';

import {useState, useEffect} from 'react';

export default function Auth(props){
    var StoreUser = store.getState('user', null);
    const [user, SetUser] = useState(StoreUser);
    let calId = store.addCallback('user', ({to})=>{
        SetUser(to)
    });
    useEffect(() =>()=>store.clearCallback('user', calId));
    if(user !== null && user && props.Yes && user.role == 'admin'){
        var Yes = props.Yes;
        return <Yes />
    }
    else if(user !== null && props.No){
        var No = props.No;
        return <No />;
    }
    return null;
}
