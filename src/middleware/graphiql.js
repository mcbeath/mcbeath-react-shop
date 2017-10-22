import { graphiqlExpress } from 'apollo-server-express';

export default graphiqlExpress(req => {
  try {
    return {
      endpointURL: '/graphql'
    };
  } catch (e) {
    console.error(e.stack);
  }
});
