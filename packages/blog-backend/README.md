## 开发的时候如何配置代码

.webpackrc.js下
```json
 proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    },
  },
```
