window._ = require('lodash');

try {
    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

 import Echo from 'laravel-echo'

//  window.Io = require('socket.io-client');
import Pusher from 'pusher-js'
 window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    // forceTLS: true
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    encrypted: false,
    disableStats:true
    // disableStats:true
 })

//  .channel('redis')
//  .listen('RedisEvent', (e) => {
//      console.log(e);
//  })

// .join('redis').here((e) => {
//     console.log(e);
// })
// .listen('RedisEvent', (e) => {
//     console.log(e);
// });




window.Echo.join('redis')
    // .here((e) => {
    //     console.log(e);
    // })
    .listen('RedisEvent', (e) => {
        console.log(e);
    });





import 'bootstrap/dist/css/bootstrap.min.css';



import api from './modules/api';

api.init({
    url: '/api'
});
window.api = api;

import init, {add_init} from './modules/init';

window.add_init = add_init;





window.models = {};
import Store from './models/store';
window.store = Store;
import routes from './router/routes';
window.routes = routes;
init(true);
