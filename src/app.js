const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const prompts = require('prompts');

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
        break;

      case 'gitignore':
        break;

      case 'readme':
        break;

      case 'initgit':
        break;

      case 'initnpm':
        break;

    }
  });

  shell.mkdir([
    './views',
    './assets',
    './assets/lib',
    './assets/js',
    './assets/css',
    './assets/img',
    './models',
    './controllers',
    './routers'
  ]);

})();