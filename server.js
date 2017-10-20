import webpack from 'webpack';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import config from './webpack.config';
import { schema, rootValue} from './src/graphql/schema.js';

const server = express();
//var compiler = webpack(config);
const PORT = 8080;

//app.use(require('webpack-dev-middleware')(compiler))
server.use('/graphql', bodyParser.json(), graphqlExpress(context => ({
  schema,
  rootValue,
  context: context,
})));

server.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});