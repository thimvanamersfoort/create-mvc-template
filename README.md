# Create MVC Template
Creates a blank NodeJS MVC-based file template, with included configuration files. This is a personal project, and configurations / file structures are purely based on personal preference.

### How the app works:
1. User input to detect which folders and configuration files to include.
2. Reads config files from application binary memory.
3. Pastes file contents in new files (Created with Node `FS` module).
4. Initializes NPM and Git.

### Add-ons:

- TailwindCSS config file
- Snowpack config file
- Nodemon config file
- Prettier config file
- ESLint config file
- Add `.gitattributes` file
- Add `.gitignore` file
- Add `README.md` file
- Init Git repository
- Init NPM


### Dependencies:
All dependencies are built-in into the application. To build the application, use the `npm run build` command, or use the pre-built applications in the `/dist` folder.

- [ShellJS](github.com/shelljs/shelljs)
- [ShellJS Exec (*Improved speed*)](github.com/danday74/shelljs.exec)
- [Prompts](github.com/terkelg/prompts)
- [Chalk](github.com/chalk/chalk)
- [Node FS](https://nodejs.org/api/fs.html)
