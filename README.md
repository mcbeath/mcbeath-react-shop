# mcbeath-react-shop
## 搭建Koa2环境
本地安装koa2和babel环境,Koa2需要使用ES7语法，所以node要切换7.10以上的版本。

    nvm use 7
    npm install koa --save
    npm install babel-core babel-polyfill babel-register babel-preset-env --save-dev
### 解释下babel几个模块的作用：
#### bebel-polyfill
因为Babel默认是不会转换Map,Promise等全局对象，这里就需要加载bebel-polyfill模块进行转换
####babel-preset-env
babel-preset-env 是一个新的 preset模块，可以根据配置的目标运行环境（environment）自动启用需要的 babel 插件。有了babel-preset-env就不用考虑babel-preset-es2015.
    
- 目前我们写 javascript 代码时，需要使用 N 个 preset，比如：babel-preset-es2015、babel-preset-es2016。es2015 可以把 ES6 代码编译为 ES5，es2016 可以把 ES2016 代码编译为 ES6。babel-preset-latest 可以编译 stage 4 进度的 ECMAScript 代码。
- 可能每个项目中都使用了非常多的 preset，包括不必要的。例如很多浏览器支持 ES6 的 generator，如果我们使用 babel-preset-es2015 的话，generator 函数就会被编译成 ES5 代码。
 babel-preset-env 的工作方式类似 babel-preset-latest，唯一不同的就是 babel-preset-env 会根据配置的 env 只编译那些还不支持的特性。

本地安装好babel后，还需要配置babel.在当前项目中新建一个.babelrc
在.babelrc中添加如下配置,这样Koa2 项目中就可以使用ES6的语法

    {
      "presets": ["env"]
    }

在当前项目中新建一个文件server.js
server.js文件中的代码如下：
    
    import Koa from 'koa';
    const app = new Koa();
	const PORT = 3000;
    app.use(async (ctx, next) => {
      const start = new Date();
      await next();
      const ms = new Date() - start;
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
    // response
    app.use((ctx) => {
      ctx.body = 'Hello Koa in app-async.js';
    });
    app.listen(PORT,function(){
	  console.log("系统启动，端口：8080");
	});
    
到这里为止，koa2的环境就已经搭建完成

## graphql服务

### graphql
GraphQL 是一个由Facebook提出的 应用层查询语言. 使用 GraphQL, 你可以基于图模式定义你的后端. 然后客户端就可以请求所需要的数据集。
![](http://upload-images.jianshu.io/upload_images/551828-8d055caea7562605.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因此, 你不必因为客户端数据需求的变更而改变你的后端. 这解决了管理REST API中的最大的问题.

GraphQL同样能够让客户端程序高效地批量获取数据. 例如, 看一看下面这个GraphQL请求:

    {
      latestPost {
    _id,
    title,
    content,
    author {
      name
    },
    comments {
      content,
      author {
    name
      }
    }
      }
    }

这个 GraphQL 请求获取了一篇博客文章和对应评论与作者信息的数据. 下面是请求的返回结果:
    
    {
      "data": {
    "latestPost": {
      "_id": "03390abb5570ce03ae524397d215713b",
      "title": "New Feature: Tracking Error Status with Kadira",
      "content": "Here is a common feedback we received from our users ...",
      "author": {
    "name": "Pahan Sarathchandra"
      },
      "comments": [
    {
      "content": "This is a very good blog post",
      "author": {
    "name": "Arunoda Susiripala"
      }
    },
    {
      "content": "Keep up the good work",
      "author": {
    "name": "Kasun Indi"
      }
    }
      ]
    }
      }
    }
    
这里是它的规范：http://facebook.github.io/graphql

### apollo-server-koa

这是Koa整合的graphql服务

#### 用例
    import koa from 'koa'; // koa@2
    import koaRouter from 'koa-router';
    import koaBody from 'koa-bodyparser';
    import { graphqlKoa } from 'apollo-server-koa';
     
    const app = new koa();
    const router = new koaRouter();
    const PORT = 3000;
     
    // koaBody is needed just for POST.
    app.use(koaBody());
     
    router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
    router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
     
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT);

### GraphiQL

使用apollo-server-koa服务在浏览器展示graphiql IDE，用于操作graphql。

    import { graphiqlKoa } from 'apollo-server-koa';
     
    // Setup the /graphiql route to show the GraphiQL UI
    router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
    }));

如果你的graphql端点需要保护，通过认证，或者如果你需要在GraphiQL作出请求通过其他自定义头文件，你可以使用passheader选项–字符串将被添加到请求标头对象。
如：

    import { graphiqlKoa } from 'apollo-server-koa';
     
    router.get('/graphiql', graphiqlKoa({
    	endpointURL: '/graphql',
    	passHeader: `'Authorization': 'Bearer lorem ipsum'`
    }));

### apollo例子

https://github.com/namelos/apollo-example

http://insights.thoughtworks.cn/author/wangyifan/

### koa-bodyparser 

https://www.npmjs.com/package/koa-bodyparser

一种用于koa解析路由body，基于co-body。支持JSON、表单和文本类型。

例子：
    var Koa = require('koa');
    var bodyParser = require('koa-bodyparser');
     
    var app = new Koa();
    app.use(bodyParser());
     
    app.use(async ctx => {
      // the parsed body will store in ctx.request.body 
      // if nothing was parsed, body will be an empty object {} 
      ctx.body = ctx.request.body;
    });

koa@1对应koa-bodyparser@1

koa@2对应koa-bodyparser@2

### koa-router

> Router middleware for koa

> https://www.npmjs.com/package/koa-router

- Express-style routing using app.get, app.put, app.post, etc.
- Named URL parameters.
- Named routes with URL generation.
- Responds to OPTIONS requests with allowed methods.
- Support for 405 Method Not Allowed and 501 Not Implemented.
- Multiple route middleware.
- Multiple routers.
- Nestable routers.
- ES7 async/await support.

Install using npm:

npm install koa-router

#### 用例：

    var Koa = require('koa');
    var Router = require('koa-router');
     
    var app = new Koa();
    var router = new Router();
     
    router.get('/', function (ctx, next) {
      // ctx.router available 
    });
     
    app
      .use(router.routes())
      .use(router.allowedMethods());

## 配置git忽略项目

新建一个.gitignore文件，文件的内容如下：

    node_modules/
## 安装React和ReactDOM

    npm install react react-dom --save

在当前项目目录下新建一个components文件夹，在建一个app文件夹，并在app文件夹中新建一个main.js
main.js的代码如下：
    
    import React from 'react';
    import ReactDOM from 'react-dom';
    ReactDOM.render(<div>aaa</div>, document.getElementById('root'));

### resolvers - just pass around multiple resolver objects,
import { merge } from 'lodash';
import { resolvers as gitHubResolvers } from './github/schema';
import { resolvers as sqlResolvers } from './sql/schema';
const rootResolvers = { ... };
// Merge all of the resolver objects together
const resolvers = merge(rootResolvers, gitHubResolvers, sqlResolvers);



