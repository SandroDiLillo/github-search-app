# GithubSearchPage

A modern web application for searching GitHub users and repositories, built with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
- [Development](#development)
    - [Available Scripts](#available-scripts)
    - [Code Generation](#code-generation)
- [Building](#building)
- [Testing](#testing)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)
- [Project Metadata](#project-metadata)

---

## Features

- 🔍 **Search GitHub Users & Repositories:** Find users and repositories with advanced filtering.
- 📄 **Repository & User Details:** View detailed information about users and repositories.
- ⚡ **Responsive UI:** Built with Angular Material for a modern, responsive experience.
- 🔗 **Direct Links:** Quickly navigate to GitHub profiles and repositories.
- 🛠️ **Configurable API:** Easily set your own GitHub API token for higher rate limits.

## Demo

> _Add a link or screenshots here if available._

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Angular CLI](https://angular.dev/tools/cli) installed globally

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/github-search-page.git
cd github-search-page
npm install
```

### Configuration

To use a personal GitHub API token (recommended for higher rate limits):

1. Open `src/environments/environment.ts` and `src/environments/environment.developmet.ts`.
2. Set your GitHub token in the `githubToken` field:

     ```ts
     export const environment = {
         production: false,
         githubToken: 'YOUR_GITHUB_TOKEN_HERE',
         githubApiBaseUrl: 'https://api.github.com',
         githubSearchReposPath: '/search/repositories',
         githubSearchIssuesPath: '/search/issues',
     };
     ```

3. _Never commit your personal token to a public repository._

---

## Development

Start the local development server:

```bash
ng serve
```

Visit [http://localhost:4200/](http://localhost:4200/) in your browser. The app reloads automatically when you modify source files.

### Available Scripts

- `npm start` – Start the app in production mode.
- `npm run start dev` – Start the app in development mode.
- `npm run build` – Build the app for production.
- `npm run watch` – Build and watch for changes.
- `npm test` – Run unit tests.

### Code Generation

Generate a new component:

```bash
ng generate component component-name
```

For more schematics (e.g., `directive`, `pipe`):

```bash
ng generate --help
```

---

## Building

Build the project for production:

```bash
ng build
```

The build artifacts are stored in the `dist/` directory.

---

## Testing

Run unit tests:

```bash
ng test
```

---

## Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Docs](https://angular.dev/docs)
- [GitHub REST API Docs](https://docs.github.com/en/rest)

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests to help improve this project.

---

## License

This project is licensed under the MIT License.

---

## Project Metadata

<details>
    <summary>package.json</summary>

```json
{
    "name": "github-search-page",
    "version": "0.0.0",
    "scripts": {
        "ng": "ng",
        "start": "ng serve --configuration production",
        "start dev": "ng serve",
        "build": "ng build",
        "watch": "ng build --watch --configuration development",
        "test": "ng test"
    },
    "prettier": {
        "overrides": [
            {
                "files": "*.html",
                "options": {
                    "parser": "angular"
                }
            }
        ]
    },
    "private": true,
    "dependencies": {
        "@angular/cdk": "^20.0.4",
        "@angular/common": "^20.0.0",
        "@angular/compiler": "^20.0.0",
        "@angular/core": "^20.0.0",
        "@angular/forms": "^20.0.0",
        "@angular/material": "^20.0.4",
        "@angular/platform-browser": "^20.0.0",
        "@angular/router": "^20.0.0",
        "octokit": "^5.0.3",
        "rxjs": "~7.8.0",
        "tslib": "^2.3.0",
        "zone.js": "~0.15.0"
    },
    "devDependencies": {
        "@angular/build": "^20.0.4",
        "@angular/cli": "^20.0.4",
        "@angular/compiler-cli": "^20.0.0",
        "@types/jasmine": "~5.1.0",
        "autoprefixer": "^10.4.21",
        "jasmine-core": "~5.7.0",
        "karma": "~6.4.0",
        "karma-chrome-launcher": "~3.2.0",
        "karma-coverage": "~2.2.0",
        "karma-jasmine": "~5.1.0",
        "karma-jasmine-html-reporter": "~2.1.0",
        "postcss": "^8.5.6",
        "typescript": "~5.8.2"
    }
}
```
</details>

---

## Environment Configuration Example

```ts
export const environment = {
    production: true,
    githubToken: '', // Add your GitHub token here
    githubApiBaseUrl: 'https://api.github.com',
    githubSearchReposPath: '/search/repositories',
    githubSearchIssuesPath: '/search/issues',
};
```
