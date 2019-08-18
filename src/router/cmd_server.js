const { cmd_post,cmd_new,cmd_get } = require('../controller/cmd_server')
const { SuccessMode, ErrorModel } = require('../model/resModel')

const handleCmdRouter = (req, res) => {
      const method = req.method  //写入客户端访问方式
      const url = req.url  //写入客户端访问的链接
      const path = url.split('?')[0] //取URL前半地址
      //CMD提交API
      if (method === "POST" && path === '/cmd/post/') {     //更新API
           const user=JSON.parse(JSON.stringify(req.body));
           const result=cmd_post(user.cmd_text,user.apikey)
           return result.then(data=>{
                 if(data){
                       return new SuccessMode('提交成功')
                 }
                 return new ErrorModel('提交失败')
           })
      }

      if (method === "POST" && path === '/cmd/new/') {     //申请设备API
            const user=JSON.parse(JSON.stringify(req.body));
            const result=cmd_new(user.cmd_text,user.apikey)
            return result.then(data=>{
                  if(data){
                        return new SuccessMode('设备申请成功')
                  }
                  return new ErrorModel('设备申请失败')
            })
       }

       if (method === "POST" && path === '/cmd/get/') {     //查询
            const user=JSON.parse(JSON.stringify(req.body));
            const result=cmd_get(user.apikey)
            return result.then(data=>{
                 console.log("data:",data) 
                  if(data){
                        return new SuccessMode(data)
                  }
                  return new ErrorModel('查询失败')
            })
       }
       if (method === "POST" && path === '/cmd/delete/') {     //删除指定条目
            const user=JSON.parse(JSON.stringify(req.body));
            const result=cmd_delete(user.apikey)
            return result.then(data=>{ 
                  if(data){
                        return new SuccessMode("删除成功")
                  }
                  return new ErrorModel('删除失败')
            })
       }



}


module.exports = handleCmdRouter