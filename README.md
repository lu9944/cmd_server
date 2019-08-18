# cmd_server
在centos7.2下通过测试，记得在服务器策略开启对应的端口8010

## 安装node.js
- wget https://nodejs.org/dist/v12.3.1/node-v12.3.1-linux-x64.tar.xz
- xz -d node-v12.3.1-linux-x64.tar.xz
- tar -xf node-v12.3.1-linux-x64.tar
- ln -s ~/node-v12.3.1-linux-x64/bin/node /usr/bin/node
- ln -s ~/node-v12.3.1-linux-x64/bin/npm /usr/bin/npm
## 安装PM2
- npm install -g pm2 
- ln -s ~/node-v12.3.1-linux-x64/bin/pm2 /usr/local/bin/pm2
## 安装数据库
- wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm
- sudo rpm -Uvh mysql57-community-release-el7-10.noarch.rpm
- yum install -y mysql-community-server
- service mysqld start
- grep 'temporary password' /var/log/mysqld.log  --取得密码
- mysql -u root -p  --登录
- 输入你刚刚得到的密码
- set global validate_password_policy=0;
- set global validate_password_length=1;
- ALTER USER 'root'@'localhost' IDENTIFIED BY 'iop78931988';  --设置数据库密码
- 退出数据库
- service mysqld restart --重启mysql

## 配置数据库，记得先登录
- CREATE SCHEMA cmd_server ;
- CREATE TABLE cmd_server.cmd ( id INT NOT NULL AUTO_INCREMENT, cmd_text VARCHAR(450) NOT NULL, apikey VARCHAR(45) NOT NULL, PRIMARY KEY (id)); 

## 启动PM2服务
下载这个zip压缩包，放到/home目录下解压，PM2运行。
- cd /home
- 运行不了unzip命令的用这个：yum install -y unzip zip
- unzip updo-master.zip
- cd /home/updo-master
- npm install -d //这个是安装所需要的依赖，可根据自己的实际情况使用
- pm2 start app.js //运行app.js
- pm2 logs //查看日志
- pm2 stop all 停止所有服务
- 保存当前进程状态：pm2 save
- 生成开机自启动服务：pm2 startup
- 启用开机自启:systemctl enable pm2-root



## 以下是接口
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
