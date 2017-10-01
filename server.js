import koa from 'koa'; // koa@2
import koaRouter from 'koa-router'; // koa-router@next
import koaBody from 'koa-bodyparser'; // koa-bodyparser@next
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import schema from './src/graphql/schema.js';
import executableSchema from './src/graphql/executableSchema';

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema: executableSchema }));
router.get('/graphql', graphqlKoa({ schema: executableSchema }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT,()=>console.log(`localhost:${PORT}`));