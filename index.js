var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var fetch = require('node-fetch');
var address = {};
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/post', function(req, res){
	io.emit('chat message', req.body.text);
	address = req.body.address
	res.send('POST request to the homepage');

});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(address)
    fetch('http://localhost:3978/api/receive/messages', { 
    	method: 'POST',
    	headers: {
                'Content-Type': 'application/json'
            },
    	 body: JSON.stringify({
    message: msg,
    address: address
    
  }) })
  });
});


http.listen(3030, function(){
	console.log('listening on *:3030')
});