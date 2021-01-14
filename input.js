
const handleUserInput = function () {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
};

let currentSay = "";
let currentDirection = "";
const input = handleUserInput();


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
  } else if (key === "h") {
    currentSay = "Say: Hello";
  }
});;

const setupInput = (conn) => {
  const interval = 120;
  setInterval(() => {
    conn.write(currentDirection);
    if (currentSay) {
      setTimeout(() => {
        conn.write(currentSay);
        currentSay = "";
      }, interval / 2);
    }
  }, interval);
};
module.exports = { setupInput };