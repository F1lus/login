import mysql from 'mysql'

export function createDb() {
    return new Promise((resolve, reject) => {
        const createDb: string = `
            CREATE DATABASE IF NOT EXISTS login_filimon_istok CHARACTER SET utf8mb4;

            USE login_filimon_istok;

            CREATE TABLE IF NOT EXISTS users (
                id int NOT NULL AUTO_INCREMENT,
                username varchar(16) BINARY NOT NULL,
                password varchar(16) BINARY NOT NULL,
                PRIMARY KEY (id)
            );`
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            multipleStatements: true
        })

        connection.connect((err) => {
            if (err) {
                console.log(err)
            }
            connection.query(createDb, (err) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                connection.end()
                resolve(true)
            })
        })
    })


}

export default class Connection {

    private connection: mysql.Connection

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'login_filimon_istok'
        })
        this.connection.connect(err => {
            if (err) {
                console.log(err)
            }
        })
    }

    public queryBuilder(sql: string, ...data: any[]) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, data, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

    public close() {
        this.connection.end()
    }
}