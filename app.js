var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
kafka = require('kafka-node');

server.listen(3000);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log("A client is connected.");
/*
  socket.on('chart1', function(query){
    console.log(query);
  });*/
});

var zkserver = 'localhost:2181'; // Kafka Server Address
var kafka_client_id = 'reporting-layer';
var kafkaClient = new kafka.Client(zkserver,kafka_client_id);
var consumer = new kafka.Consumer(kafkaClient,[{ topic: 'chart1' }, { topic: 'chart2' }, { topic: 'chart3' }, { topic: 'chart4' }],{autoCommit: true});

consumer.on('message', function (message) {
  console.log("["+message.topic+"]: "+message.value);
	io.emit(message.topic, message.value); // Reading Kafka topic value and Kafka message
});
