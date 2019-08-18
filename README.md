# cmd_server
-----
自用脚本通讯，原生node.js写法，目前功能有4个api

接口 | 新增条目
---|---
URL | http://IP:8010/cmd/new/
请求方式 | POST
请求头类型 | Content-Type:application/json
请求示例 | {"apikey":"qq529050578","cmd_text":"1111223"}
apikey | 索引
cmd_text | 存储的文本

接口 | 删除条目
---|---
URL | http://IP:8010/cmd/delete/
请求方式 | POST
请求头类型 | Content-Type:application/json
请求示例 | {"apikey":"qq529050578"}
apikey | 索引

接口 | 查询条目
---|---
URL | http://IP:8010/cmd/get/
请求方式 | POST
请求头类型 | Content-Type:application/json
请求示例 | {"apikey":"qq529050578"}
apikey | 索引

接口 | 更新条目
---|---
URL | http://IP:8010/cmd/post/
请求方式 | POST
请求头类型 | Content-Type:application/json
请求示例 |  {"apikey":"qq529050578","cmd_text":"1111223"}
apikey | 索引
cmd_text | 待更新的文本
