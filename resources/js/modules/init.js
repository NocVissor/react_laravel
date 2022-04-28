var ready = false;
var actions = [];
export function add_init(action){
    actions.push(action);
    if(ready) action();
}
export default function init(full=false){
    window.api.post('/init', {time:serval.time}).then((response)=>{
        if(typeof response.user !== 'undefined'){
            window.store.setUser(response.user);
            if(response.new_time - response.old_time > 10){
                serval.noAjax = false;
            }
            ready = true;
            if(full){
                actions.forEach((val)=>{
                    val();
                })
            }
        }
    }).catch((error)=>{
        console.log(error);
        if(error.status == 419){
            window.location.reload();
        }
    });
}

