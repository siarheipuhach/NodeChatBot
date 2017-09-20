var restify  = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: 'e818bb43-3c29-43b0-b4ab-c0b76a33b405',
    appPassword: '8st4Yd3bYDRJNknVc0LhMQn'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
	console.log(session.message.text)
	console.log(session.message)
    session.send("You said: %s", session.message.text);
    session.send("You name is: %s", session.message.user.name);

});

module.export = connector;
