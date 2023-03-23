import admin from './routes/admin';

export default {
    example: '/example',
    login: '/login',
    register: '/register',
    settings: '/settings',
    home: '/',
    verify: '/email/verify/:id/:hash',
    forgot: '/password/forgot',
    resend: '/password/resend',
    unAuth: '/',
    admin
}

