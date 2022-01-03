import store from 'js-simple-store';

export default function init(){
    window.api.post('/init').then((response)=>{
        if(typeof response.user !== 'undefined'){
            store.setState('user', response.user);
        }
    });
}

