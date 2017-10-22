import webpack from 'webpack';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import config from './webpack.config';
//import { schema, rootValue} from './src/graphql/schema.js';
import graphqlMiddleware from './src/middleware/graphql';
import graphiqlMiddleware from './src/middleware/graphiql';

const server = express();
//var compiler = webpack(config);
const PORT = 8080;

//app.use(require('webpack-dev-middleware')(compiler))
server.use('/graphql', bodyParser.json(), (...args) => graphqlMiddleware(...args));

server.get('/graphiql', (...args) => graphiqlMiddleware(...args)); // if you want GraphiQL enabled


server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});