import express from 'express'
import http from 'http'

const app: express.Express = express()

const server: http.Server = http.createServer(app)

server.listen(process.env.PORT || 5000, () => {
    console.log('A szerver készen áll!')
})

