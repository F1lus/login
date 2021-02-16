import expressSession from 'express-session'

const mysqlStore = require('express-mysql-session')(expressSession)

const sessionStore = new mysqlStore({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_filimon_istok',
    expiration: 86400000,
    clearExpired: true,
    checkExpirationInterval: 900000
})

const session = expressSession({
    secret: '#sec_61d$',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: sessionStore
})

export default session

 