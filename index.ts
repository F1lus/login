//Külső importok (MIT)
import express from 'express'
import http from 'http'

//Saját importok
import session from './model/Session'
import Connect from './model/Connection'

//Előkészítés
const app: express.Express = express()

const server: http.Server = http.createServer(app)

//Middleware

app.use(session)

//Routing
app.post('/home', (req: express.Request, res: express.Response) => {
    if(req.body.signal){
        const connect = new Connect()
        connect.metaCommands('CREATE DATABASE IF NOT EXISTS login_filimon_istok CHARACTER SET utf8_hungarian_ci;')
        .then(dbResponse => {
            if(dbResponse){
                connect.metaCommands('CREATE TABLE IF NOT EXISTS users ('+
                    'id int NOT NULL AUTO_INCREMENT,'+
                    'username varchar(16) NOT NULL,'+
                    'password varchar(16) NOT NULL,'+
                    'PRIMARY KEY (id)'+
                ');')
                .then(tableResponse => {
                    res.status(200).json({created_db: tableResponse})
                }).catch(err => console.log(err))
            }else{
                res.status(200).json({created_db: false})
            }
        }).catch(err => console.log(err))
    }
})

app.post('/login', (req: express.Request, res: express.Response) => {
    
})

//A szerver indítása
server.listen(process.env.PORT || 5000, () => {
    console.log('A szerver készen áll!')
})

