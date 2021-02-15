//Külső importok (MIT)
import express from 'express'
import http from 'http'

//Saját importok
import session from './model/Session'

//Előkészítés
const app: express.Express = express()

const server: http.Server = http.createServer(app)

//Middleware

app.use(session)

//Routing

app.post('/login', (req: express.Request, res: express.Response) => {
    
})

//A szerver indítása
server.listen(process.env.PORT || 5000, () => {
    console.log('A szerver készen áll!')
})

