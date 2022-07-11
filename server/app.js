const Innertube = require('youtubei.js');
const express = require('express');
const http = require('http');
const fs = require('fs');
const local = require('app.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));

http.createServer(app).listen(3000, 'localhost')
.then(() => {
  console.log('Running at http://localhost:3000');
})
.catch((err) => {
  console.log(err);
})