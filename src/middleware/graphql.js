import { graphqlExpress } from 'apollo-server-express';
import 'isomorphic-fetch';
import schema from '../api/schema';
import modules from '../modules';

export default graphqlExpress(async req => {
  try {
    return {
      schema,
      context: await modules.createContext(req)
    };
  } catch (e) {
    console.log(e.stack);
  }
});
