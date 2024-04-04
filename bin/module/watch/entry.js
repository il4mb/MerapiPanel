const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require('glob');

const moduleName = process.argv[4];

if (!fs.existsSync(path.join(cwd, "include", "Module", moduleName))) {
    console.log("cant find module ", moduleName);
    process.exit(1);
}

const module_dir = path.join(cwd, "include", "Module", moduleName);


const assets_entry = function () {

    return glob.sync(path.join(module_dir, "Assets", "src", "*.{js,ts}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(module_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.(js|ts)$/, '');
        const value = (path.resolve(module_dir, path.dirname(file), path.basename(file)).replace(/\.(js|ts)$/, ''));
        entry[key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}


const widgets_entry = function () {
    return glob.sync(path.join(module_dir, "Widgets", "**", "src", "*.{js,ts}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(module_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.(js|ts)$/, '');
        const value = (path.resolve(module_dir, path.dirname(file), path.basename(file)).replace(/\.(js|ts)$/, ''));
        entry[key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}


const blocks_entry = function () {
    return glob.sync(path.join(module_dir, "Blocks", "**", "src", "*.{js,ts}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(module_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.(js|ts)$/, '');
        const value = (path.resolve(module_dir, path.dirname(file), path.basename(file)).replace(/\.(js|ts)$/, ''));
        entry[key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}

module.exports = {
    assets_entry,
    widgets_entry,
    blocks_entry
};