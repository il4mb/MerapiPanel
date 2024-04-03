#!/usr/bin/env node

const colours = require('./conlor.js');
const args = process.argv.slice(2);

switch (args[0]) {

    case "create-module": {
        require("./create-module/index.js");
        break;
    }
    case "module": {
        require("./module/index.js");
        break;
    }

    default: {
        if (args[0]) {
            console.log("Unknown command: " + colours.fg.red + args[0], colours.reset);
        }
        console.log("Usage:");
        console.log(`  merapipanel ${colours.fg.green}create-module${colours.reset} <module-name>`);
        console.log(`  merapipanel ${colours.fg.green}module${colours.reset} <option> <module-name>`);
        break;
    }
}