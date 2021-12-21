const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const exec = require('shelljs.exec');
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
      { title: 'Initialize Git', value: 'initgit', selected: true }
    ],
    initial: null,
    instructions: false,
  }
  
  var response = await prompts(question);
  response = response.includes;

  shell.mkdir('-p', [
    './views',
    './assets/lib', './assets/js',
    './assets/css', './assets/img',
    './models',
    './controllers',
    './routers'
  ]);

  fs.writeFileSync('./views/.gitignore', '');
  fs.writeFileSync('./assets/lib/.gitignore', '');
  fs.writeFileSync('./assets/css/.gitignore', '');
  fs.writeFileSync('./assets/js/.gitignore', '');
  fs.writeFileSync('./assets/img/.gitignore', '');
  fs.writeFileSync('./models/.gitignore', '');
  fs.writeFileSync('./controllers/.gitignore', '');
  fs.writeFileSync('./routers/.gitignore', '');
  
  if(exec('npm init -y').code !== 0){
    console.log(chalk.red.bold('Error initialising NPM package'));
  }
  
  response.forEach(element => {
    
    switch(element) {

      case 'tailwindcss':
        shell.mkdir('-p', ['./src']);
        exec('npm install --save-dev tailwindcss');

        const tailwindcss = shell.cat(__dirname + '/config/tailwind.css').stdout;
        const tailwindConfig = shell.cat(__dirname + '/config/tailwind.config.js').stdout;

        fs.writeFile('./src/tailwind.css', tailwindcss, (err) => {
          if(err) console.log(chalk.red.bold(`Error writing tailwind.css file`));
        });

        fs.writeFile('./tailwind.config.js', tailwindConfig, (err) => {
          if(err) console.log(chalk.red.bold(`Error writing tailwind.config.js file`));
        })

        break;

      case 'snowpack':
        exec('npm install --save-dev snowpack');

        const snowpackConfig = shell.cat(__dirname + '/config/snowpack.config.js');

        fs.writeFile('./snowpack.config.js', snowpackConfig, (err) => {
          if(err) console.log(chalk.red.bold('Error writing snowpack.config.js file'));
        })
        break;

      case 'nodemon':
        exec('npm install --save-dev nodemon');

        const nodemonConfig = shell.cat(__dirname + '/config/nodemon.json').stdout;

        fs.writeFile('./nodemon.json', nodemonConfig, (err) => {
          if(err) console.log(chalk.red.bold(`Error writing nodemon.json file`));
        });
        
        break;

      case 'gitattributes':
        const gitattributes = shell.cat(__dirname + '/config/.gitattributes').stdout;

        fs.writeFile('./.gitattributes', gitattributes, (err) => {
          if(err) console.log(chalk.red.bold(`Error writing .gitattributes file`));
        });

        break;

      case 'gitignore':
        const gitignore = shell.cat(__dirname + '/config/.gitignore').stdout;

        fs.writeFile('./.gitignore', gitignore, (err) => {
          if(err) console.log(chalk.red.bold(`Error writing .gitignore file`));
        })

        break;

      case 'readme':
        fs.writeFile('./README.md', '', (err) => {
          if(err) console.log(chalk.red.bold('Error writing README.md file'));
        })
        break;

      case 'initgit':
        if(exec('git init').code !== 0) {
          console.log(chalk.red.bold('Error initialising Git repo'));
        }
        break;

    }
  });

})();