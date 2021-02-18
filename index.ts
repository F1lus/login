//Külső importok (MIT)
import express from 'express'
import http from 'http'
import cors from 'cors'
import expressSession from 'express-session'

const mysqlStore = require('express-mysql-session')(expressSession)

//Saját importok
import Connect, { createDb } from './model/Connection'

//Előkészítés
const app: express.Express = express()

const server: http.Server = http.createServer(app)

declare module 'express-session' {
    interface Session {
        username: string;
    }
}

//Middleware

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type',
    credentials: true
}))

app.use(async (req, res, next) => {
    try {
        await createDb().catch(err => console.log(err))

        const sessionStore = await new mysqlStore({
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
            saveUninitialized: false,
            store: sessionStore
        })

        session(req, res, next)
    } catch (err) {
        console.log('Ops')
    }
})

app.use(express.json())

//Routing

app.get('/login', (req: express.Request, res: express.Response) => {
    if (req.session.username) {
        res.json({ user: req.session.username })
    }
})

app.post('/login', (req: express.Request, res: express.Response) => {
    if (req.body.username && req.body.password) {
        const connect = new Connect()
        connect.queryBuilder('SELECT * FROM users WHERE username = ? LIMIT 1;', req.body.username)
            .then(result => {
                if (Array.isArray(result) && result.length > 0) {
                    if (result[0].password === req.body.password) {
                        req.session.username = result[0].username
                        res.json({ access: true })
                    } else {
                        res.json({ access: false })
                    }
                } else {
                    res.json({ access: false })
                }
                connect.close()
            }).catch(err => {
                connect.close()
                console.log(err)
            })
    }
})

app.post('/register', (req: express.Request, res: express.Response) => {
    if (req.body.username && req.body.password) {
        if (req.body.username.length < 5 || req.body.username.length > 16 || req.body.password.length < 6 || req.body.password.length > 16) {
            return
        }
        const connect = new Connect()
        connect.queryBuilder(`SELECT * FROM users WHERE username = ?;`, req.body.username)
            .then(result => {
                if (Array.isArray(result) && result.length === 0) {
                    connect.queryBuilder('INSERT INTO users (username, password) VALUES (?, ?);', req.body.username, req.body.password)
                        .then(response => {
                            res.json({ register: typeof response === 'object' && response != null })
                            connect.close()
                        }).catch(err => {
                            connect.close()
                            console.log(err)
                        })
                } else {
                    res.json({ error: 'username_taken' })
                    connect.close()
                }
            }).catch(err => {
                connect.close()
                console.log(err)
            })
    }
})

app.post('/logout', (req: express.Request, res: express.Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.json({ logout: true })
    })
})

//A szerver indítása
server.listen(5000, () => {
    console.log('A szerver készen áll!')
})

