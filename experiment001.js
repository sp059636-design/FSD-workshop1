const EventEmitter = require('events');


class MyEmitter extends EventEmitter {}


const myEmitter = new MyEmitter();

myEmitter.on('greet', () => {
    console.log("Hello! Welcome to Node.js");
});


myEmitter.on('exit', () => {
    console.log("Goodbye! Exiting program...");
});

myEmitter.emit('greet');
myEmitter.emit('exit');