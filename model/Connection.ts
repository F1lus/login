import mysql from 'mysql'

class Connection{

    private connection: mysql.Connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'logindb_typescript'
    })

    constructor(){
        this.connection.connect(err => {
            if(err){
                console.log(err.stack)
            }
        })
    }

    private queryBuilder(sql: string, data: any[]){
        return new Promise((resolve, reject) => {
            if(sql.indexOf('INSERT') === -1 || sql.indexOf('UPDATE') === -1 || sql.indexOf('DELETE') === -1){
                const counter = sql.split('?').length/2
                if(data.length > counter){
                    reject('data_mismatch')
                }else{
                    this.connection.query({
                        sql: sql,
                        timeout: 30*1000
                    }, data, (error, results) => {
                        if(error){
                            reject(error)
                        }else{
                            resolve(results)
                        }
                    })
                }
            }else{
                this.connection.query({
                    sql: sql,
                    timeout: 30*1000
                }, data, (error, results) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(results)
                    }
                })
            }
        })
    }

    
    public close() {
        this.connection.end()
    }
}