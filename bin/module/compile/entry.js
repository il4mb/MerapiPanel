const path = require('path');
const cwd = process.cwd();
const glob = require('glob');

const assets_entry = function (working_dir) {

    return glob.sync(path.join(working_dir, "Assets", "src", "*.{js,ts,tsx}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(working_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.\w+$/, '');
        const value = (path.resolve(working_dir, path.dirname(file), path.basename(file)).replace(/\.\w+$/, ''));
        entry[(cwd == working_dir ? "" : ".\\..\\..\\..\\") + key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}


const widgets_entry = function (working_dir) {
    return glob.sync(path.join(working_dir, "Widgets", "**", "src", "*.{js,ts}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(working_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.\w+$/, '');
        const value = (path.resolve(working_dir, path.dirname(file), path.basename(file)).replace(/\.\w+$/, ''));
        entry[(cwd == working_dir ? "" : ".\\..\\..\\..\\") + key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}


const blocks_entry = function (working_dir) {
    return glob.sync(path.join(working_dir, "Blocks", "**", "src", "*.{js,ts,tsx}"), {
        ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
        nodir: true, // Treat directories as files
        maxDepth: 2 // Limit the depth of the search to 2 directory levels
    }).reduce((entry, file) => {
        const key = path.resolve(working_dir, path.dirname(file).replace(/src$/, 'dist'), path.basename(file)).replace(/\.\w+$/, '');
        const value = (path.resolve(working_dir, path.dirname(file), path.basename(file)).replace(/\.\w+$/, ''));
        entry[(cwd == working_dir ? "" : ".\\..\\..\\..\\") + key.replace(cwd, './')] = value.replace(cwd, './');
        return entry;
    }, {});
}

module.exports = {
    assets_entry,
    widgets_entry,
    blocks_entry
}