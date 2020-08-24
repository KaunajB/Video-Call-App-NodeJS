let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, { path: '/stream' });
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

const port = 9742;

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// io.of('/video-call/stream').on('connection', stream);
io.sockets.on('connection', stream);

server.listen(port, () => console.log('Server listening on port', port));
