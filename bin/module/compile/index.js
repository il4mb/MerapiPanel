const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const glob = require('glob');
const colours = require('../../conlor.js');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const { assets_entry, widgets_entry, blocks_entry } = require('./entry.js');



function loadingAnimation() {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let currentFrameIndex = 0;

    return setInterval(() => {
        process.stdout.write('\r' + frames[currentFrameIndex] + ' Loading... ');
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }, 100);
}


function blinkingDotAnimation(interval, text) {
    let isVisible = true;

    return setInterval(() => {
        process.stdout.write('\r\x1b[33m' + (isVisible ? '•' : ' ') + ' ' + text + '\x1b[0m');
        isVisible = !isVisible;
    }, interval);
}



const passArgument = (moduleDirname, compileMode) => {

    var loadingInterval = loadingAnimation();

    const entry = {
        ...assets_entry(moduleDirname),
        ...widgets_entry(moduleDirname),
        ...blocks_entry(moduleDirname)
    };

    config.entry = entry;
    switch (compileMode) {
        case "watch": {
            config.watch = true;
            break;
        }
        case "build": {
            config.mode = 'production';
            config.watch = false;
            break;
        }
    }
    config.output = {
        filename: '[name].js',
        path: path.resolve(moduleDirname, './'),
        asyncChunks: false,
    }


    const compiler = webpack(config, (err, stats) => {

        clearInterval(loadingInterval);
        if (blinkingInterval) clearInterval(blinkingInterval);

        console.clear();
        console.log(`Module directory: ${colours.fg.green} ${moduleDirname} ${colours.reset}`);
        console.log(`Compile Mode: ${colours.fg.green} ${compileMode} ${colours.reset}`);


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


        if (compileMode == 'watch') {
            var blinkingInterval = blinkingDotAnimation(800, 'Waiting for changes.');
        }

    });
}

// Export the function
module.exports = {
    passArgument
};