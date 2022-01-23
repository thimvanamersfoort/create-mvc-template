const fs = require('fs/promises');
const shell = require('shelljs');
const exec = require('shelljs.exec');
const prompts = require('prompts');
const chalk = require('chalk');

(async () => {
	const questions = [
    {
      type: 'multiselect',
      name: 'folders',
      message: 'Please pick the folders you want to add:',
      choices: [
        { title: '/views', value: 'views', selected: true },
        { title: '/assets', value: 'assets', selected: true },
        { title: '/models', value: 'models' },
        { title: '/controllers', value: 'controllers'},
        { title: '/routers', value: 'routers'},
        { title: '/app.js', value: 'app.js'}
      ],
      initial: null,
      instructions: false,
    },
    {
      type: 'multiselect',
      name: 'configs',
      message: 'Please pick the options that you want to configure:',
      choices: [
        { title: 'TailwindCSS config file', value: 'tailwindcss' },
        { title: 'Snowpack config file', value: 'snowpack' },
        { title: 'Nodemon config file', value: 'nodemon' },
        { title: 'ESLint config file', value: 'eslint', selected: true },
        { title: 'Prettier config file', value: 'prettier', selected: true },
        { title: 'Add .gitattributes', value: 'gitattributes' },
        { title: 'Add .gitignore', value: 'gitignore', selected: true },
        { title: 'Add README', value: 'readme', selected: true },
      ],
      initial: null,
      instructions: false,
    }
  ];

	var response = await prompts(questions);
	var folders = response.folders;
  var configs = response.configs;

	console.log('\r\n' + chalk.green.bold('Installing your packages...'));

  folders.forEach(async (element) => {
		switch (element) { 
      
      case 'views': {
        shell.mkdir('-p', ['./views']);
        await fs.writeFile('./views/.gitignore', '');
        await fs.writeFile('./views/index.html', '');

        break;
      }

      case 'assets': {
        shell.mkdir('-p', [
          './assets/lib',
          './assets/js',
          './assets/css',
          './assets/img',
        ]);

        await fs.writeFile('./assets/lib/.gitignore', '')
        await fs.writeFile('./assets/css/.gitignore', '')
        await fs.writeFile('./assets/js/.gitignore', '')
        await fs.writeFile('./assets/img/.gitignore', '')

        break;
      }

      case 'models': {
        shell.mkdir('-p', ['./models']);
        await fs.writeFile('./models/.gitignore', '');

        break;
      }

      case 'controllers': {
        shell.mkdir('-p', ['./controllers']);
        await fs.writeFile('./controllers/.gitignore', '');

        break;
      }

      case 'routers': {
        shell.mkdir('-p', ['./routers']);
        await fs.writeFile('./routers/.gitignore', '');
        
        break;
      }

      case 'app.js': {
        await fs.writeFile('./app.js', '');

        break;
      }

    } 
  });

	if (exec('npm init -y').code !== 0) {
		console.log(chalk.red.bold('Error initialising NPM package'));
	}

	configs.forEach(async (element) => {
		switch (element) {
			case 'tailwindcss': {
				shell.mkdir('-p', ['./src']);
				exec('npm install --save-dev tailwindcss');

				const tailwindcss = shell.cat(
					__dirname + '/config/tailwind.css'
				).stdout;
				const tailwindConfig = shell.cat(
					__dirname + '/config/tailwind.config.js'
				).stdout;

				await fs.writeFile('./src/tailwind.css', tailwindcss);
				await fs.writeFile('./tailwind.config.js', tailwindConfig);

				break;
			}

			case 'snowpack': {
				exec('npm install --save-dev snowpack');
				const snowpackConfig = shell.cat(
					__dirname + '/config/snowpack.config.js'
				);
				await fs.writeFile('./snowpack.config.js', snowpackConfig);

				break;
			}

			case 'nodemon': {
				exec('npm install --save-dev nodemon');
				const nodemonConfig = shell.cat(
					__dirname + '/config/nodemon.json'
				).stdout;
				await fs.writeFile('./nodemon.json', nodemonConfig);

				break;
			}

			case 'eslint': {
				exec('npm install --save-dev eslint');
				const esLintConfig = shell.cat(
					__dirname + '/config/.eslintrc.js'
				).stdout;
				await fs.writeFile('./.eslintrc.js', esLintConfig);

				break;
			}

			case 'prettier': {
				exec('npm install --save-dev prettier');
				const prettierConfig = shell.cat(
					__dirname + '/config/.prettierrc.js'
				).stdout;
				await fs.writeFile('./.prettierrc.js', prettierConfig);

				break;
			}

			case 'gitattributes': {
				const gitattributes = shell.cat(
					__dirname + '/config/.gitattributes'
				).stdout;
				await fs.writeFile('./.gitattributes', gitattributes);

				break;
			}

			case 'gitignore': {
				const gitignore = shell.cat(__dirname + '/config/.gitignore').stdout;
				await fs.writeFile('./.gitignore', gitignore);

				break;
			}

			case 'readme': {
				await fs.writeFile('./README.md', '');
				break;
			}
		}
	});

	if (exec('git init').code !== 0) {
		console.log(chalk.red.bold('Error initialising Git repo'));
	}

	var packageJSON = JSON.parse(shell.cat('./package.json').stdout);
	const scripts = {
		start: 'node app.js',
		build: '',
		format: 'prettier --write .',
		lint: 'eslint --fix-dry-run --ext .js "**/*.js" ',
	};

	packageJSON.scripts = scripts;
	await fs.writeFile('./package.json', JSON.stringify(packageJSON));

  console.log(chalk.green.bold.underline('Packages installed succesfully.'));
})();
