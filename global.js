console.log(global);
//this gives us a list of functions availabe to the global scope of node .js

//you call this function by writing node(filename{in this case it is global}) in the terminal

//example
setTimeout(()=>{
    console.log('in the timeout');
},3000)
// this returns the statement 3s after global was logged 
//other functions like setInterval( that reloads the code over an over again),clearInterval(that stops the setinterval process),__dirname(that gets us the absolute directory the code belongs to),__filename(gets us the file it belongs to  )
//e.g
console.log(__dirname)
console.log(__filename)

//note we can no longer acces queryselector or other dom objects
//because we are no longer in the browser
