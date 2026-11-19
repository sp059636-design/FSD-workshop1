console.log("Start");

setTimeout(() => {
    console.log("SetTimeout");
}, 0);

setImmediate(() => {
    console.log("SetImmediate");
});

process.nextTick(() => {
    console.log("NextTick");
});

console.log("End");