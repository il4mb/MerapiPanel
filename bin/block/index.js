const colours = require('../conlor.js');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');
const fs = require('fs');


console.log("Working directory: " + colours.fg.green + process.cwd() + colours.reset);

config.watch = true;

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


    const entrys = Object.keys(config.entry).map((entry) => {
        return entry.replace(/dist\/(.*)$/, 'dist/');
    }).filter((entry, i, arr) => {
        return arr.indexOf(entry) === i;
    });

    entrys.forEach((entry) => {

        const dirname = path.resolve(process.cwd(), entry);
        const srcBlock = require(path.resolve(`${dirname}/..`, 'src', 'block.json'));

        console.log("  asset " + path.resolve(`${dirname}/..`, 'src', 'block.json'));



        const blokJson = {
            name: srcBlock.name,
            title: srcBlock.title,
            description: srcBlock.description || "",
            category: srcBlock.category || "General",
            attributes: srcBlock.attributes || [],
            options: srcBlock.options || [],
        };
        if (srcBlock.icon) { // icons is optional
            blokJson['icon'] = srcBlock.icon;
        }

        if (!fs.existsSync(path.resolve(dirname, 'block.json'))) {
            fs.writeFileSync(path.resolve(dirname, 'block.json'), JSON.stringify(blokJson));
        }

        if (fs.existsSync(path.resolve(dirname, 'index.js'))) {
            blokJson['index'] = "file:./index.js";
        }
        if (fs.existsSync(path.resolve(dirname, 'index.css'))) {
            blokJson['style'] = "file:./index.css";
        }
        if (fs.existsSync(path.resolve(dirname, 'view.js'))) {
            blokJson['view'] = "file:./view.js";
        }

        fs.writeFileSync(path.resolve(dirname, 'block.json'), JSON.stringify(blokJson));
    });
});
