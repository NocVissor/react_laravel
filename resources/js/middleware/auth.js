import { observer } from "mobx-react"

export default observer((props)=>{
    const user = window.store.user;

    if(user !== null && user && props.Yes){
        var Yes = props.Yes;
        return <Yes />
    }
    else if(user !== null && props.No){
        var No = props.No;
        return <No />;
    }
    return null;
});
