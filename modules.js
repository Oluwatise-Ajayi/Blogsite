//we use the require function to import data from another file,but it doesnt give us access to the data from the file, we can only do this by exporting from the file itself using the (module.exports).,
//we have some built in modules like os and filesystem
//e.g
const os = require("os");
const fs = require("fs");
console.log(os);
//we also have functions we can use on it like homedir(),platform(),etc
console.log(os.platform(), os.homedir());

//meanwhile we can use functions like mkdir,readFile,writeFile ,existsSync ,rmdir ,unlink(used to delete files)and others from the file system module
//e.g
fs.mkdir("./assets", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("folder created");
});
