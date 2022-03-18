const fs = require("fs");
const path = require('path')


const jsonsInDir = fs.readdirSync('./datas').filter(file => path.extname(file) === '.json');
var jsonFull;

jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join('./datas', file));
  const json = JSON.parse(fileData.toString());
  jsonFull = { ...json, ...jsonFull };
});

jsonFull = JSON.stringify(jsonFull,null,2);

fs.writeFile("./data-all.json", jsonFull, err => {
    if (err) console.log("Error writing file:", err);
});

