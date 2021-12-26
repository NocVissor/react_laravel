export default class api{
    static url = '';
    static noAjax = true;


    static init(data) {
        api.url = data.url;
    }

    static query(data){
        api.noAjax = false
        var url = data.absolute_url?api.url:api.url+data.url;
        var method = data.type?data.type:'get';
        var data = data.data?data.data:[];
        var headers = data.headers?data.headers:{};
        if(!data.csrf){
            data.csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        data.api = true;
        if(!headers['X-CSRF-TOKEN']){
            headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        }
        function error_handing(data){

            if(data.response) data = data.response;

            if(data.data.errors){
                return data.data.errors;
            }
            else{
                console.log('unprocessed error');
                console.log(data.data);
                return {};
            }
        }
        console.log(data);
        return new Promise((resolve, reject) => {
            var config = {
                method,
                headers,
            }
            if(method == 'post'){
                config.data = data;
            }
            else{
                config.params = data;
            }

            window.axios(url, config).then(data=>{
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


    static post(url, data, headers = []){
        return api.query({url, data, headers, type: 'post'});
    }
    static get(url, data, headers = []){
        return api.query({url, data, headers, type: 'get'});
    }
}

