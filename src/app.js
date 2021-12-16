const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const prompts = require('prompts');
const chalk = require('chalk');

(async () => {

  const question = {
    type: 'multiselect',
    name: 'includes',
    message: 'Please pick the options that you want to configure:',
    choices: [
      { title: 'TailwindCSS config file', value: 'tailwindcss' },
      { title: 'Snowpack config file', value: 'snowpack' },
      { title: 'Nodemon config file', value: 'nodemon' },
      { title: 'Add .gitattributes', value: 'gitattributes' },
      { title: 'Add .gitignore', value: 'gitignore', selected: true },
      { title: 'Add README', value: 'readme', selected: true },
      { title: 'Initialize Git', value: 'initgit', selected: true },
      { title: 'Initialize default NPM', value: 'initnpm', selected: true }
    ],
    initial: null,
    instructions: false,
  }
  
  var response = await prompts(question);
  response = response.includes;

  response.forEach(element => {
    
    switch(element) {

      case 'tailwindcss':
        break;

      case 'snowpack':
        break;

      case 'nodemon':
        break;

      case 'gitattributes':
        var gitattributes = shell.cat(__dirname + '/config/.gitignore');
        gitattributes = gitattributes.stdout;

        break;

      case 'gitignore':
        var gitignore = shell.cat(__dirname + '/config/.gitignore');
        gitignore = gitignore.stdout;

        break;

      case 'readme':
        break;

      case 'initgit':
        console.log('\r\n' + chalk.greenBright('√') + chalk.white.bold(' Message from Git:'));

        if(shell.exec('git init').code !== 0) {
          console.log(chalk.red.bold('Error initialising Git repo'));
        }
        break;

      case 'initnpm':
        console.log('\r\n' + chalk.greenBright('√') + chalk.white.bold(' Message from NPM:'));

        if(shell.exec('npm init -y').code !== 0){
          console.log(chalk.red.bold('Error initialising NPM package'));
        }
        break;

    }
  });

  shell.mkdir('-p', [
    './views',
    './assets/lib', './assets/js',
    './assets/css', './assets/img',
    './models',
    './controllers',
    './routers'
  ]);

})();