# React Component lib

As we build out scalable applications in React, we often face challenges in maintaining the growing complexity of component structures. that why the lib follows Atmoic design system.

The Atomic Design Pattern is a methodology for creating user interfaces (UI) that is based on the concept of "atoms," which are the smallest, indivisible elements of a UI. These atoms can then be combined to form molecules, which are small groups of atoms that function together as a unit. From there, molecules can be combined to form organisms, which are larger groups of molecules that function together to perform a specific task. Finally, organisms can be combined to form templates, which are complete UI layouts that can be used to build a user interface.

-  Atoms: These are the smallest, most basic UI elements, such as buttons, inputs, and text.

-  Molecules: These are groups of atoms that function together as a unit, such as a search bar (made up of an input and a button) or a navigation menu (made up of a list of links).

-  Organisms: These are larger groups of molecules that function together to perform a specific task, such as a header (made up of a logo and a navigation menu) or a footer (made up of a list of links and a copyright notice).

-  Templates: These are complete UI layouts that can be used to build a user interface, such as a homepage template (made up of a header, a main content area, and a footer).

-  Pages: The page level refers to the complete UI of a specific page on a website or application. It is made up of a combination of templates, organisms, molecules, and atoms.

![image](https://ik.imagekit.io/5aalo5l7bu7/Portfolio/sd_red_AJ4x2.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1672058507486)

# Lib

[x] Atoms
[x] Molecules
[x] Organisms
[] Templates
[] Pages

## Links

Link to the Static Storybook deploy - [Link](https://willowy-semifreddo-521b84.netlify.app/)

Read More about the Lib in my portfolio -

# TSUP React w/ Storybook User Guide

This will guide you how to setup the lib. clone the repo first.

## Commands

### install the packages

```bash
npm i
```

### Run all the test files

```bash
npm run test
```

### Build the Lib in dist folder

```bash
npm run build # or yarn build
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

```bash
npm run storybook
```

### Storybook Build static webapp

```bash
npm run build-storybook
```

This loads the stories from `./src/**stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

There are other commands which you can explore it.

### Example

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

Code quality is set up for you with `prettier`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Including Styles

it is configured with tailwind css but there the design system it self is created using .scss with loaders. we can use both for now since both will converted into single .css file. maybe in future i will remove scss completly but for now both will remain.

### Vitest

vitest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

### GitHub Actions

Two actions are added by default:

-  `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
-  `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple Vite React app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```
