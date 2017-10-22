import fs from 'fs';
import path from 'path';
import { makeExecutableSchema, addErrorLoggingToSchema } from 'graphql-tools';

import modules from '../modules';

const rootSchemaDef = fs.readFileSync(path.join(__dirname, './rootSchema.graphqls'), 'utf-8')

const executableSchema = makeExecutableSchema({
  typeDefs: [rootSchemaDef].concat(modules.schemas),
  resolvers: modules.createResolvers()
});

addErrorLoggingToSchema(executableSchema, { log: e => consolog.error(e) });

export default executableSchema;
