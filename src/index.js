import express from "express";
import bodyParser from "body-parser";

const server = express();

server.use(bodyParser.json());

server.get('/test', (req, res) => {
    res.send('Ok');
});

server.listen(3000, () => { console.log('Server started') });
