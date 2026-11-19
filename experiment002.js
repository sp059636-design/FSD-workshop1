const EventEmitter = require('events');


const button = new EventEmitter();
button.on('click', () => {
    console.log("Button Clicked!");
});


button.on('mouseover', () => {
    console.log("Mouse is over the button!");
});


button.emit('click');
button.emit('mouseover');