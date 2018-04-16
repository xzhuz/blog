问题

如果遇到mongo数据库查询不上
```shell
    use blog -- 需要连接的数据库
    db.auth('test', '123')
    返回1则说明正常
```

修改用户密码
```shell
    db.changeUserPassword('test', 'test')
```


Nginx 启动 重启 关闭

1. 启动

   ```shell
   cd /usr/local/nginx/sbin
   ./nginx
   ```

2. 重启

   ```shell
   cd /usr/local/nginx/sbin
   ./nginx -s reload
   ```

    reload
3. ​关闭

   ```shell
   cd /usr/local/nginx/sbin
   ./nginx -s stop
   ```

     查询nginx主进程号

   　　ps -ef | grep nginx

   　　从容停止   kill -QUIT 主进程号

   　　快速停止   kill -TERM 主进程号

   　　强制停止   kill -9 nginx

   　　若nginx.conf配置了pid文件路径，如果没有，则在logs目录下

   　　kill -信号类型 '/usr/local/nginx/logs/nginx.pid'



### 配置代理

server {

        listen       80;
        server_name  127.0.0.1;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
                    root   ../build;
                    index  index.html;
        	    try_files $uri /index.html;
        }
        location /articles {
            proxy_pass http://localhost:9093;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host:$server_port;
        }

        location /user {
            proxy_pass http://localhost:9093;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host:$server_port;
        }

        location /menu {
            proxy_pass http://localhost:9093;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host:$server_port;
        }

        location /about {
            proxy_pass http://localhost:9093;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host:$server_port;
        }

        location /file {
            proxy_pass http://localhost:9093;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Server $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host:$server_port;
        }
}

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
