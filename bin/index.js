#!/usr/bin/env node

const colours = require('./conlor.js');
const args = process.argv.slice(2);

switch (args[0]) {

    case "create-module": {
        require("./create-module/index.js");
        break;
    }
    case "block": {
        require("./block/index.js");
        break;
    }

    case "theme": {
        require("./theme/index.js");
        break;
    }

    default: {
        if (args[0]) {
            console.log("Unknown command: " + colours.fg.red + args[0], colours.reset);
        }
        console.log("Usage:");
        console.log(`  merapipanel ${colours.fg.green}block${colours.reset}`);
        console.log(`  merapipanel ${colours.fg.green}theme${colours.reset}`);
        console.log(`  merapipanel ${colours.fg.green}create-module${colours.reset}`);
        break;
    }
}