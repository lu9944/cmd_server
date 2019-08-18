const querystring = require('querystring')
const handleCmdRouter = require('./src/router/cmd_server')

const getPostData = (req) => {
   const promise = new Promise((resolve, reject) => {
      console.log("req:",req.headers);
      if (req.method != 'POST') {
         resolve({})//不是post返回空
         return
      }
      if (req.headers['content-type'] !== 'application/json') {
         resolve({})//不是json格式返回空
         return
      }
      let postData = ''
      req.on('data', chunk => {
         postData += chunk.toString() //等待数据传输完毕
      })
      req.on('end', () => {
         //数据传输完毕触发事件
         if (!postData) {
            resolve({})//postData为null，返回{}
            return
         }
         resolve(JSON.parse(postData))
      })
   })
   return promise
}

const serverHandle = (req, res) => {//"=>"是es6的标准，是构造一个箭头函数。可以被调用。
   res.setHeader('Content-type', 'application')//设置返回格式
   //处理student.js路由
   const url = req.url
   req.path = url.split('?')[0]
   //解析query
   req.query = querystring.parse(url.split('?')[1])
   //处理POSTDATA
  
   getPostData(req).then(postData => { //调用getPostData优先处理postData

     // console.log("postdata:", postData);
      req.body = postData

      const userResult = handleCmdRouter(req,res)
      if(userResult){
         userResult.then(userData=>{
            res.end(JSON.stringify(userData))
         })
         return
      }

      //未命中,就是请求的方式等不符合设计标准，则返回。
      res.writeHead(404, { "Content-type": "text/plain" })
      res.write("404 not Found")
      res.end()
      /*因为res是一个返回的对象，所以可以设置一些返回的头和内容什么的，设置好了，用res.end();提交即可*/

   })
}
console.log("引入app.js，OK")
module.exports = serverHandle//导出直接函数，到时候直接引用就可以了。