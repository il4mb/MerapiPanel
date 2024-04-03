const fs = require("fs");
const path = require("path");
const colours = require('../../conlor.js');
const cwd = process.cwd();

const moduleName = process.argv[4];
if (!moduleName) {
    console.log(`Usage: MerapiPanel ${colours.fg.magenta}module ${colours.fg.blue}--watch ${colours.fg.magenta}<module-name>${colours.reset}`);
    process.exit(1);
}


if (!fs.existsSync(path.join(cwd, "include", "Module", moduleName))) {
    console.log("cant find module ", moduleName);
    process.exit(1);
}



const webpack = require('webpack');
const config = require('./webpack.config.js');


console.log(`Working directory: ${colours.fg.green} ${path.join(cwd, "include", "Module", moduleName)} ${colours.reset}`);

config.watch = false;

// Call webpack with the config and a callback function
webpack(config, (err, stats) => {
    // This callback function will be invoked after each build
    if (err) {
        console.error(err);
        return;
    }

    console.log(stats.toString({
        // webpack stats configuration
        colors: true, // Adds color to the output
        modules: false, // Reduce the amount of stuff printed to the console
        children: false, // If you are using ts-loader, setting this to true will display TypeScript errors
        chunks: false, // Makes the build much quieter
        chunkModules: false // Makes the build much quieter
    }));

    // You can also check for specific compilation errors here
    if (stats.hasErrors()) {
        const info = stats.toJson();
        console.error(info.errors); // Log errors
    }

    // Similarly, you might want to check for warnings
    if (stats.hasWarnings()) {
        const info = stats.toJson();
        console.warn(info.warnings); // Log warnings
    }
});


