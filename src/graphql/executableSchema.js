import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types/typeDefs';
import resolvers from './resolvers/resolvers';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
export default executableSchema;