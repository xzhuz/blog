Personal Blog
========

> 使用React技术栈搭建的个人博客网站😀😀, 目前`Blog1.2`🤗 后续会继续更新版本的😜.

技术栈:

前端: React, Create-React-App, Redux, React-Redux, React-Router v4, simplemde-markdown-editor

后端: Spring Boot, mysql, Redis, Druid (后端地址： [Server](https://github.com/xebcxc/springboot-server) )

> 后端 的最初版本是Node、Express、Mongoose,  但是由于本身也是一个后端开发人员，所以直接就用spring Boot来实现了。

实现功能:
+ 前台页面
   - 首页博客列表展示
   - 首页热门博客展示,在右边sidebar展示浏览量最多的三篇博客
   - 首页展示所有博客标签,右边sidebar展示
   - 根据某一tag获取所有拥有该tag的所有博客文章
   - 获取相关tag的相关热门博客.
   - 博客内容展示--支持MarkDown格式内容
   - 关于我内容
   - 首页博客列表分页
+ 后台管理
   - 查看所有博客文章 (已发布和未发布)
   - 发布新博客
   - 编辑已有博客
   - 删除博客
   - 上传图片到服务器

### 项目首页预览
![首页预览](./doc/example.png)

