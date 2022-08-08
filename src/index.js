import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import discovery from "./grpc/discovery.js";

import resolver from "./resolvers/resolver.js";
import schema from "./schema/schema.js";

const app = express();

const port = 3000;

mongoose.connect('mongodb://mongo:27017/user-service', () => {
  console.log('user service connected to mongo');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`user service started`);
});

discovery.register('user-service', 'user-service:3000');
