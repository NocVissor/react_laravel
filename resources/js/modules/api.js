import { toast } from 'react-toastify';

export default class api{
    static url = '';

    static init(data) {
        api.url = data.url;
    }

    static query(data){
        var url = data.absolute_url?api.url:api.url+data.url;
        var method = data.type?data.type:'get';
        var dataParams = data.data?data.data:{};
        var headers = data.headers?data.headers:{};
        if(!dataParams.csrf){
            dataParams.csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        if(!headers['X-CSRF-TOKEN']){
            headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
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
                return errors;
            }
            else{
                console.log('unprocessed error');
                console.log(data.data);
                return {};
            }
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
                    resolve(data.data);
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
