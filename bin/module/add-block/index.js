const fs = require("fs");
const path = require("path");
const colours = require('../../conlor.js');


const blockName = process.argv[5];

const start = (module_dir) => {


    console.log(`${colours.fg.red}WARNING:${colours.reset} this feature is not ready yet`);
    process.exit(1);


    if (!blockName) {
        console.log("Usage: merapipanel module <module-name> add-block <block-name>");
        process.exit(1);
    }


    if (!fs.existsSync(path.join(module_dir, "Blocks"))) {
        fs.mkdirSync(path.join(module_dir, "Blocks"));
    }

    if (!fs.existsSync(path.join(module_dir, "Blocks", blockName))) {
        fs.mkdirSync(path.join(module_dir, "Blocks", blockName));
    }


    const folders = ["src", "dist"];
    folders.forEach((folder) => {
        fs.mkdirSync(path.join(module_dir, "Blocks", blockName, folder));
    });

    const files = [
        {

        },
        {
            name: "src/index.js",
            content: ``
        },
        {
            name: "dist/index.js",
            content: ``
        },

    ]

}

module.exports = {
    start
}