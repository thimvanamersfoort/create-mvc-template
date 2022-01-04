const fs = require('fs/promises');
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
			{ title: 'ESLint config file', value: 'eslint', selected: true },
			{ title: 'Prettier config file', value: 'prettier', selected: true },
			{ title: 'Add .gitattributes', value: 'gitattributes' },
			{ title: 'Add .gitignore', value: 'gitignore', selected: true },
			{ title: 'Add README', value: 'readme', selected: true },
		],
		initial: null,
		instructions: false,
	};

	var response = await prompts(question);
	response = response.includes;

	console.log('\r\n' + chalk.green.bold('Installing your packages...'));

	shell.mkdir('-p', [
		'./views',
		'./assets/lib',
		'./assets/js',
		'./assets/css',
		'./assets/img',
		'./models',
		'./controllers',
		'./routers',
	]);

	await fs.writeFile('./views/.gitignore', '');
	await fs.writeFile('./assets/lib/.gitignore', '');
	await fs.writeFile('./assets/css/.gitignore', '');
	await fs.writeFile('./assets/js/.gitignore', '');
	await fs.writeFile('./assets/img/.gitignore', '');
	await fs.writeFile('./models/.gitignore', '');
	await fs.writeFile('./controllers/.gitignore', '');
	await fs.writeFile('./routers/.gitignore', '');
	await fs.writeFile('./app.js', '');

	if (exec('npm init -y').code !== 0) {
		console.log(chalk.red.bold('Error initialising NPM package'));
	}

	response.forEach(async (element) => {
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
})();
