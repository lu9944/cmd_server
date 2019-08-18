const http=require('http'); //const 声明一个只读的常量,http是用来接收内置模块的

const PORT=8010;

const cmd_Server_router=require('./app')//默认是引入app.js的，你也可以不写.js,为什么要引入的，因为这是模块化编写

const server = http.createServer(cmd_Server_router)//createServer里面就是填写回调函数。

server.listen(PORT)

console.log("服务器已经启动,端口:"+PORT)