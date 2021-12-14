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
  
  const response = await prompts(question);

  response.forEach(element => {
    
    switch(element) {

      case 'tailwindcss':
        console.log(`tailwindcss`);
        break;

      case 'snowpack':
        console.log(`snowpack`);
        break;

      case 'nodemon':
        console.log(`nodemon`);
        break;

      case 'gitattributes':
        console.log(`gitattributes`);
        break;

      case 'gitignore':
        console.log(`gitignore`);
        break;

      case 'readme':
        console.log(`readme`);
        break;

      case 'initgit':
        console.log(`initgit`);
        break;

      case 'initnpm':
        console.log(`initnpm`);
        break;

    }
  });
})();