import fs from 'fs';
import path from 'path';
import Counter from './sql';

import createResolvers from './resolvers';
import Feature from '../connector';

//import schema from './schema.graphqls';
const schema = fs.readFileSync(path.join(__dirname, './schema.graphqls'), 'utf-8')

export default new Feature({
  schema,
  createResolversFunc: createResolvers,
  createContextFunc: () => ({ Counter: new Counter() })
});
