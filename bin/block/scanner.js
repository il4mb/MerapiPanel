const glob = require('glob');
const path = require('path');
const fs = require('fs');


const toRelativePath = (filePath) => {
    return (filePath.replace(process.cwd(), '.')).replace(/\\/g, '/');
}

module.exports = {
    getEntry: () => {

        const blocksJson = glob.sync('./**/src/block.json', {
            ignore: ['./node_modules/**', './dist/**', './.git/**', './.vscode/**', './.vscode-test/**', './vendor/**', './tests/**'], // Ignore node_modules directory
            nodir: true, // Treat directories as files
            maxDepth: 2 // Limit the depth of the search to 2 directory levels
        });

        const entry = {};
        blocksJson.forEach((blockJson) => {

            const source_dirname = path.join(process.cwd(), path.dirname(blockJson));
            const target_dirname = source_dirname.replace(/src$/, 'dist');

            const block = require(path.join(process.cwd(), blockJson));
            if (block.index) {
                entry[toRelativePath(path.resolve(target_dirname, "index"))] = toRelativePath(path.resolve(source_dirname, (block.index).replace(/file:/, '')).replace(/\.js$/, ''));
            }
            if (block.view) {
                entry[toRelativePath(path.resolve(target_dirname, "view"))] = toRelativePath(path.resolve(source_dirname, (block.view).replace(/file:/, '')).replace(/\.js$/, ''));
            }
        });
        
        return entry;
    }
}