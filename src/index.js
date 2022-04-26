import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { readFileSync } from "fs";

import { dirname } from "path";
import { fileURLToPath } from "url";

import resolver from "./resolvers/resolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

const port = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', () => {
    console.log('Connected to mongoDB');
});

const schema = buildSchema(readFileSync(__dirname + '/schema/user.schema.gql').toString());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
