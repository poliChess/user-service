import express from "express";
import mongoose from "mongoose";

import usersRouter from "./routes/users.js";

const app = express();

const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/myapp', () => {
    console.log('Connected to mongoDB');
});

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
