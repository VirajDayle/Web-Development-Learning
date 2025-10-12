const { program } = require("commander");
const fs = require("fs");

program
  .name("counter")
  .description("CLI to count file based text")
  .version("1.0.0");

program
  .command("count")
  .argument("<file>", "file to count words")
  .description("Count the no of words in the file")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(`File not exist : ${file}`);
      } else {
        const words = data.trim().split(/\s+/);
        const wordCount = words.filter(Boolean).length;
        console.log(`${wordCount} words in file ${file}`);
      }
    });
  });

program.parse();
