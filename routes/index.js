const express = require("express");
const fs = require("fs");
const { setMaxIdleHTTPParsers } = require("http");
const router = express.Router();

const PATH_ROUTES = __dirname;

console.log(PATH_ROUTES);
// fonction qui retire l'extension 
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}
const b = fs.readdirSync(PATH_ROUTES);

const a = fs.readdirSync(PATH_ROUTES).filter( (file) => {
    const name = removeExtension(file);
    if (name !== 'index') {
        console.log(name+ "///"+file);
        router.use(`/${name}`,require(`./${file}`));
    }
});

console.log(b);

// router.use("/tracks", require("./tracks.js"));

//console.log(router.stack);

module.exports = router;