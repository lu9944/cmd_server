const mysql=require('mysql') //引入数据库
const {MYSQL_CONF}=require('../conf/db') //引入数据库配置
const con = mysql.createConnection(MYSQL_CONF)//创建连接
con.connect()//开始连接

function exec(sql){ //执行SQL语句
    const promise=new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
   
    return promise //返回一个对象

}

module.exports={exec}