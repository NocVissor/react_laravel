var ready = false;
var actions = [];
export function add_init(action){
    actions.push(action);
    if(ready) action();
}
export default function init(full=false){
    window.api.post('/init', {time}).then((response)=>{
        if(typeof response.user !== 'undefined'){
            window.store.dispatch(window.actions.setUser(response.user))
            if(response.new_time - response.old_time > 10){
                noAjax = false;
            }
            ready = true;
            if(full){
                actions.forEach((val)=>{
                    val();
                })
            }
        }
    });
}

