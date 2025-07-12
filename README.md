# React Component Library

A reusable, customizable, and scalable React component library styled with SCSS. Built with Storybook for documentation, development.

## Features

-  Built with React
-  Styled using SCSS
-  Interactive documentation via Storybook
-  Modular and reusable component architecture
-  Easy to integrate into existing projects

## Links

Link to the Static Storybook deploy - [Link](https://willowy-semifreddo-521b84.netlify.app/)

Read More about the Lib in my [Portfolio]()

## usage

```bash
npm install @priyang/react-component-lib
# or
yarn add @priyang/react-component-lib
```

we can import all component from index or import from individual.

```tsx
import { Button } from '@priyang/react-component-lib';
import '@priyang/react-component-lib/index.css'; // this css for all the components.
import '@priyang/react-component-lib/global.css'; // this is for css variables and global class.

function App() {
   return (
      <Button text="Submit" variant="primary-border" isLoading={submitting} />
   );
}
```

or import singular component.

```tsx
import { Button } from '@priyang/react-component-lib/lib/Components/Button';
import '@priyang/react-component-lib/lib/Components/Button/index.css'; // this css for only Button.
import '@priyang/react-component-lib/global.css'; // this is for css variables and global class.

function App() {
   return (
      <Button text="Submit" variant="primary-border" isLoading={submitting} />
   );
}
```

## Folder Structure

```js
src/
  components/
    Button/
      Button.tsx
      Button.scss
      index.ts
  styles/
.storybook/
  main.js
  preview.js
```

## Installation

Clone the repo (dev branch recommend.)

```bash
git -b dev clone --single-branch https://github.com/priyang12/react-component-lib.git
cd react-component-lib
npm install
npm run storybook
```

### install the packages

```bash
npm i
```

### Run all the test files

Just to make sure things are working perfectly.

```bash
npm run test
```

### Storybook

To view the components and their usage examples, run:

```bash
npm run storybook
```

This will start the Storybook development server at http://localhost:6006.

### Storybook static webapp

this is the Build that we deployed.

```bash
npm run build-storybook
```

This loads the stories from `./src/**stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig.

## Example (Playground)

We have a Vite react project call example which we can use to test our package.
Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

we can use the `../dist` diretory to test our packge but i would recommand to build you package and deploy it locally then test it in the exmaple.

```
    "react-component-lib":"file:~/priyang-react-component-lib-1.0.0.tgz"
```

## Configuration

Code quality is set up for you with `prettier`. Adjust the respective fields in their files accordingly.

### Including Styles

it is configured with tailwind css (for passing styles in storybook) but there the design system it self is created using .scss with loaders. build package
does not contain any tailwind utils only scss converted to css.

### Vitest

vitest tests are set up to run with `npm test` or `yarn test`.

```bash
npm test
npm coverage
```

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run checkSize` and visualize it with `npm run analyzeMapper`.

-  Note: this only check the main index.js.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

### GitHub Actions

Two actions are added by default:

-  `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
-  `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying Storybook

Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash

npm run build # builds to dist
netlify deploy
```

### Deploying the Example Playground

The Playground is just a simple Vite React app, you can deploy it anywhere you would normally deploy that.

```bash

cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

## Publishing

### Create a Changeset

Before publishing, generate a changeset to describe what changed

```bash

npm changeset
```

This creates a file in the .changeset/ directory.

### Apply the Version Bump and publish

```bash
npm version
npm publish # this run npm run changeset publish --access=public
```

Make sure you are logged in to npm (npm login) and have publish permissions for the package
