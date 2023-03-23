var ready = false;
var actions = [];
export function add_init(action){
    actions.push(action);
    if(ready) action();
}
export default function init(full=false){



    window.api.get('/init', {time}).then((response)=>{
        if(typeof response.user !== 'undefined'){
            window.store.setUser(response.user);
            window.api.token = response.token;
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
    }).catch((error)=>{
        console.log(error);
        // window.store.setUser(false);
        noAjax = false;
        // if(error.status == 419){
        //     window.location.replace(window.location.href);
        // }
    });


    actions.forEach((val)=>{
        val();
    })
}

