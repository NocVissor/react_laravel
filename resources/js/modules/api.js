export default class api{
    url = '';
    static init(data) {
        api.url = data.url;
    }

    static query(data){
        var url = data.absolute_url?api.url:api.url+data.url;
        var method = data.type?data.type:'get';
        var data = data.data?data.data:[];
        var headers = data.headers?data.headers:{};


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

        return new Promise((resolve, reject) => {
            window.axios({
                method,
                url,
                data,
                headers,
            }).then(data=>{
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

