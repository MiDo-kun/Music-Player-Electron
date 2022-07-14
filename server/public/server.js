const express     = require('express');
const ffmpegPath  = require('ffmpeg-static');
Stream            = require('node-rtsp-stream');

let app = express();

let server = app.listen(3000);

app.get('/', function(req, res){
   
    res.send('Server is ready!');
    
});