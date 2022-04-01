
const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { stat } = require('fs');
let cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use('/', require('./ROUTES/pages'));

var port = process.env.PORT || 8091;
server.listen(port);
console.log('User API is running at ' + port);