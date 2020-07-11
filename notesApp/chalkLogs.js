const chalk = require('chalk');
const log = console.log;

const textLog = message => {
  log(chalk.cyan(message));
};

const successLog = (title, content) => {
  log(chalk`{bgGreen.bold.rgb(0,51,0) ${title}:}`, chalk`{green ${content}}`);
};

const errorLog = (errTitle, errMessage) => {
  log(
    chalk`{bgRed.bold.rgb(102,0,0) ${errTitle}:}`,
    chalk`{red ${errMessage}}`
  );
};

const variableLog = (variable, value) => {
  log(
    chalk`{bgBlue.bold.rgb(0,0,77) [${variable}]:}`,
    chalk`{rgb(51,153,255) ${value}}`
  );
};

module.exports = { successLog, errorLog, variableLog, textLog };
