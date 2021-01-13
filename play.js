#!/usr/bin/env node
const { connect } = require('./client');
process.stdout.write('\x07');

const { Game } = require('./src/Game');
const { UserInterface } = require('./src/UserInterface');
const { RemoteInterface } = require('./src/RemoteInterface');
const game = new Game(new UserInterface(), new RemoteInterface());

// Begin game
game.start();

console.log('Connecting ...');
const conn = connect();


const setupInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
};

let currentDirection = "";
const input = setupInput();

input.on('data', (key) => {
  if (key === '\u0003') {
    process.exit();
  }
  if (key === "w" && currentDirection !== "Move: down") {
    currentDirection = "Move: up";
  } else if (key === "s" && currentDirection !== "Move: up") {
    currentDirection = "Move: down";
  } else if (key === "a" && currentDirection !== "Move: right") {
    currentDirection = "Move: left";
  } else if (key === "d" && currentDirection !== "Move: left") {
    currentDirection = "Move: right";
  }

});;

setInterval(() => {
  conn.write(currentDirection);
}, 60);