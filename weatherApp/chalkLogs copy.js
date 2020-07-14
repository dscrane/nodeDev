const chalk = require('chalk');
const log = console.log;

const textLog = message => {
  log(chalk.cyan(message));
};

const successLog = (title, content) => {
  log(
    '\n',
    chalk`{bgGreen.bold.rgb(0,51,0).dim ${title}:}`,
    chalk`{green ${content}}`
  );
};

const errorLog = (errTitle, errMessage) => {
  log(
    '\n',
    chalk`{bgRed.bold.rgb(102,0,0) ${errTitle}:}`,
    chalk`{red ${errMessage}}`
  );
};

const variableLog = (variable, value) => {
  log(
    '\n',
    chalk`{bgBlue.bold.rgb(0,0,77) [${variable}]:}`,
    chalk`{rgb(51,153,255) ${value}}`
  );
};

const commandLog = (command, title, message = null) => {
  if (command === 'add') {
    log(
      '\n' +
        chalk.cyan('Adding New Note:\n') +
        chalk.yellow(' title: ') +
        title +
        '\n' +
        chalk.yellow(' message: ') +
        message +
        '\n'
    );
  }

  if (command === 'remove') {
    log(
      chalk.red('Removing Existing Note:\n') + chalk.yellow(' title: ') + title
    );
  }

  if (command === 'read') {
    log(
      chalk.cyan('Requested Note:\n') +
        chalk.yellow(' title: ') +
        title +
        '\n' +
        chalk.yellow(' message: ') +
        message
    );
  }

  if (command === 'list') {
    log(
      '\n' +
        chalk.yellow(' title: ') +
        title +
        '\n' +
        chalk.yellow(' message: ') +
        message
    );
  }
};

module.exports = { successLog, errorLog, variableLog, textLog, commandLog };
