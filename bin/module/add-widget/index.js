const fs = require("fs");
const path = require("path");
const colours = require('../../conlor.js');


const widgetName = process.argv[5];


function loadingAnimation() {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let currentFrameIndex = 0;

    return setInterval(() => {
        process.stdout.write('\r' + frames[currentFrameIndex] + ' Loading... ');
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }, 100);
}



const start = (module_dir) => {

    const loadingAnimationInterval = loadingAnimation();

    const moduleName = path.basename(module_dir).toLowerCase();

    if (!widgetName) {
        clearInterval(loadingAnimationInterval);
        console.log("Usage: merapipanel module <module-name> add-widget <widget-name>");
        process.exit(1);
    }


    if (!fs.existsSync(path.join(module_dir, "Widgets"))) {
        fs.mkdirSync(path.join(module_dir, "Widgets"));
    }
    if(!fs.existsSync(path.join(module_dir, "Widgets", "index.php"))){
        fs.writeFileSync(path.join(module_dir, "Widgets", "index.php"), `<?php\n// GENERATED FILE. DO NOT EDIT.\n\nreturn array_map(function ($file) {\n\treturn require_once $file;\n}, glob(__DIR__ . '/**/index.php', GLOB_BRACE));\n`);
    }
    if (!fs.existsSync(path.join(module_dir, "Widgets", widgetName))) {
        fs.mkdirSync(path.join(module_dir, "Widgets", widgetName));
    } else {
        clearInterval(loadingAnimationInterval);
        console.log(`Widget with this name already exists: ${colours.fg.red}${widgetName}${colours.reset}`);
        process.exit(1);
    }


    const folders = ["src", "dist"];
    folders.forEach((folder) => {
        fs.mkdirSync(path.join(module_dir, "Widgets", widgetName, folder));
    });

    const files = [
        {
            name: "index.php",
            content: `<?php\n\nreturn [\n\t'name' => '@${moduleName}/${widgetName}',\n\t'title' => '${widgetName}',\n\t'category' => 'default',\n\t'description' => 'Widget ${widgetName}',\n];`
        },
        {
            name: "src/index.js",
            content: `import "./style.scss";\n\nconsole.log("hello world from module ${moduleName} with widget hallo");\n\n// write your code here";`
        },
        {
            name: "src/style.scss",
            content: `html, body {\n\theight: 100vh;\n\twidth: 100vw;\n\tmargin: 0;\n\tpadding: 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.widget-${moduleName}-${widgetName} {\n\theight: 100vh;\n\tcolor: red;\n\tfont-weight: 700;\n\tfont-size: 25px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}`
        },
        {
            name: "dist/index.js",
            content: `console.log("hello world from module ${moduleName} with widget ${widgetName}");`
        },

        {
            name: "dist/index.css",
            content: `html, body {\n\theight: 100vh;\n\twidth: 100vw;\n\tmargin: 0;\n\tpadding: 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.widget-${moduleName}-${widgetName} {\n\theight: 100vh;\n\tcolor: red;\n\tfont-weight: 700;\n\tfont-size: 25px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}`
        }
    ];

    files.forEach((file) => {
        fs.writeFileSync(path.join(module_dir, "Widgets", widgetName, file.name), file.content);
    });


    clearInterval(loadingAnimationInterval);
    console.log(`Widget ${colours.fg.blue}${widgetName}${colours.reset} added to ${colours.fg.blue}${moduleName}${colours.reset} module`);
    console.log(`Goto ${colours.fg.blue}${path.join(module_dir, "Widgets", widgetName)}${colours.reset} to edit it.`);    
}

module.exports = {
    start
}