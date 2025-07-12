const fs = require('fs');
const path = require('path');

// Paths
const projectRoot = path.resolve(__dirname);
const rootPkgPath = path.join(projectRoot, 'package.json');
const componentsDir = path.join(projectRoot, 'dist', 'lib', 'Components');
const wrapperDir = path.join(projectRoot, 'dist', 'lib', 'Wrappers');
const utilsDir = path.join(projectRoot, 'dist', 'lib', 'Utils');
const hooksDir = path.join(projectRoot, 'dist', 'Hooks');

if (!fs.existsSync(rootPkgPath)) {
   throw new Error(`❌ Cannot find root package.json at: ${rootPkgPath}`);
}

// Read root package.json
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf-8'));

// Ensure exports field exists
if (!rootPkg.exports) {
   rootPkg.exports = {};
}

// Add core exports
rootPkg.exports['.'] = {
   import: './dist/index.mjs',
   require: './dist/index.js',
};

rootPkg.exports['./dist/index.css'] = {
   import: './dist/index.css',
   require: './dist/index.css',
};

rootPkg.exports['./dist/global.css'] = {
   import: './dist/global.css',
   require: './dist/global.css',
};

// Helper: add entries from a directory
function addExportsFromDirectory(entries, exportRoot, dirPath) {
   entries.forEach((entry) => {
      if (!entry.isDirectory()) return;

      const name = entry.name;
      const exportPath = `./dist/lib/${exportRoot}/${name}`;
      const base = `./dist/lib/${exportRoot}/${name}`;

      rootPkg.exports[exportPath] = {
         import: `${base}/index.mjs`,
         require: `${base}/index.js`,
      };

      const cssPath = path.join(dirPath, name, 'index.css');
      if (fs.existsSync(cssPath)) {
         rootPkg.exports[`${exportPath}/index.css`] = {
            import: `${base}/index.css`,
            require: `${base}/index.css`,
         };
      }
   });
}

// For hooks
function addHookExports(entries) {
   entries.forEach((entry) => {
      if (!entry.isDirectory()) return;

      const name = entry.name;
      const exportPath = `./Hooks/${name}`;
      const base = `./dist/Hooks/${name}`;

      rootPkg.exports[exportPath] = {
         import: `${base}/index.mjs`,
         require: `${base}/index.js`,
      };
   });
}

// Add dynamic exports
if (fs.existsSync(componentsDir)) {
   const components = fs.readdirSync(componentsDir, { withFileTypes: true });
   const wrapper = fs.readdirSync(wrapperDir, { withFileTypes: true });
   const utils = fs.readdirSync(utilsDir, { withFileTypes: true });
   const hooks = fs.readdirSync(hooksDir, { withFileTypes: true });

   addExportsFromDirectory(components, 'Components', componentsDir);
   addExportsFromDirectory(wrapper, 'Wrappers', wrapperDir);
   addExportsFromDirectory(utils, 'Utils', utilsDir);
   addHookExports(hooks);
}

// Write changes back to root package.json
fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2));
console.log(
   `✅ Updated root package.json with ${
      Object.keys(rootPkg.exports).length
   } exports.`
);
