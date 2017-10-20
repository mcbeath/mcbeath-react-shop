import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './types/typeDefs';
import resolvers from './resolvers/resolvers'
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});