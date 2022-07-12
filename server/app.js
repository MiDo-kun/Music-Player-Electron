const Innertube = require('youtubei.js');
const express = require('express');
const fs = require('fs');

const app = express();
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

async function Youtube_API() {
  const youtube = await new Innertube({gl: 'US'});

  app.post('/query', async function(req, res, next) {
    const query = req.body.query;
    const search = await youtube.search(query, {client: 'YOUTUBE'});
    res.json(search);
  });
}

app.listen(3000, () => {
  console.log('Running at http://localhost:3000');
  Youtube_API();
})