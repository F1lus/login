import mysql from 'mysql'

export default class Connection{

    private connection: mysql.Connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'login_filimon_istok'
    })

    constructor(){
        this.connection.connect(err => {
            if(err){
                console.log(err.stack)
            }
        })
    }

    public metaCommands(sql: string){
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results) => {
                if(error){
                    reject(error)
                }else{
                    resolve(results != null)
                }
            })
        })
    }

    private queryBuilder(sql: string, data: any[]){
        return new Promise((resolve, reject) => {
            if(sql.indexOf('INSERT') === -1 || sql.indexOf('UPDATE') === -1 || sql.indexOf('DELETE') === -1){
                let counter = 0
                sql.split('').forEach(value => {
                    if(value === '?'){
                        counter++
                    }
                })
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