import { toast } from 'react-toastify';

export default class api{
    static url = '';
    static token = false;
    static init(data) {
        api.url = data.url;
    }

    static query(data){
        var url = data.absolute_url?api.url:api.url+data.url;
        var method = data.type?data.type:'get';
        var dataParams = data.data?data.data:{};
        var headers = data.headers?data.headers:{};
        if(!api.token && !dataParams.csrf){
            api.token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        if(!api.token && !headers['X-CSRF-TOKEN']){
            api.token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        if(api.token){
            dataParams.csrf = api.token;
            headers['X-CSRF-TOKEN'] = api.token;
        }



        dataParams.api = true;
        function error_handing(data){
            if(data.response) data = data.response;
            if(typeof data.data.errors !== 'undefined'){
                let errors = data.data.errors
                if(errors.messageError){
                    toast.error(errors.messageError);
                }
                if(data.status == 404){
                    api.setCode(404);
                }
                send_handing(data.data);
                return errors;
            }
            else{
                console.log('unprocessed error');
                console.log(data.data);
                if(data.status == 419){
                    // window.location.replace('/?code=419');
                }
                return data;
            }
        }


        function send_handing(data){
            if(typeof data.title !== 'undefined'){
                document.title = data.title;
            }
            return data;
        }

        return new Promise((resolve, reject) => {
            var config = {
                method,
                headers,
            }
            if(method == 'post'){
                config.data = dataParams;
            }
            else{
                config.params = dataParams;
            }
            config.url = url;
            window.axios.request(config).then(data=>{
                if(data.data.type && data.data.type == 'success'){
                    resolve(send_handing(data.data));
                }
                else{
                    reject(error_handing(data));
                }
            }).catch(error=>{
                reject(error_handing(error));
            });
        });
    }


    static post(url, data = {}, headers = {}){
        return api.query({url, data, headers, type: 'post'});
    }
    static get(url, data = {}, headers = {}){
        return api.query({url, data, headers, type: 'get'});
    }
    static setCode(code){
        window.store.code = code;
    }
}
