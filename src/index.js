import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";

import resolver from "./resolvers/resolver.js";
import schema from "./schema/schema.js";

const app = express();

const port = 3000;

// TODO: mlab (or some other non-local db)
mongoose.connect('mongodb://localhost:27017/myapp', () => {
    console.log('Connected to mongoDB');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
