const { program } = require("commander");
const fs = require('fs');

program.argument("<string>");

program.parse();

let fileLocation = program.args[0];

fs.readFile(fileLocation,'utf-8',(err,data)=>{
  if(err){
    console.log(`No file exist : ${fileLocation}`)
    return;
  }
  const word = data.trim().split(/\s+/);
  const wordCount = word.filter(Boolean).length;
  console.log(`${wordCount} words in the ${fileLocation}`)
})

