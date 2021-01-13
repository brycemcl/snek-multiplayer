#!/usr/bin/env node
const net = require('net');
process.stdout.write('\x07');

const { Game } = require('./src/Game');
const { UserInterface } = require('./src/UserInterface');
const { RemoteInterface } = require('./src/RemoteInterface');
const game = new Game(new UserInterface(), new RemoteInterface());

// Begin game
game.start();


const connect = function () {
  const conn = net.createConnection({
    host: '135.23.222.131',
    port: 50542
    // port: 50541host
  });
  // interpret incoming data as text
  conn.setEncoding('utf8');

  conn.on("data", (data) => {
    console.log(data);
  });

  return conn;
};

console.log('Connecting ...');
connect();