import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import views from 'koa-views';
import path from 'path';

import schema from './src/graphql/schema.js';
import executableSchema from './src/graphql/executableSchema';

const app = new koa();
const router = new koaRouter();
const PORT = 8080;

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema: executableSchema }));
router.get('/graphql', graphqlKoa({ schema: executableSchema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.use(require('koa-static')(path.join(__dirname,'./build')));
app.use(views(path.join(__dirname,'./views'),{
	extension:'html'
}))
app.use(async (ctx,next)=>{
	const start = new Date();
	await next();
	const ms = new Date()-start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//response
app.use(async(ctx)=>{
	
	await ctx.render('index.html');
})


app.listen(PORT,()=>console.log(`localhost:${PORT}`));