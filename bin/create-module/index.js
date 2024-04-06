const fs = require("fs");
const path = require("path");
const _moduleName = (process.argv[3]).replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
const moduleName = _moduleName.charAt(0).toUpperCase() + _moduleName.slice(1);
const cwd = process.cwd();
const colours = require("../conlor.js");


const minimal_folder = [
    "Assets",
    "Assets/src",
    "Blocks",
    "Widgets",
    "Widgets/hallo",
    "Widgets/hallo/src",
    "Widgets/hallo/dist",
    "Views",
    "Controller",
];
const minimal_files = [
    {
        name: "Assets/src/main.js",
        content: `console.log("hello world from ${moduleName}");`,
    },
    {
        name: "Views/Api.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName}\\Views;\n\nuse MerapiPanel\\Box\\Module\\__Fragment;\nuse MerapiPanel\\Box\\Module\\Entity\\Module;\n\nclass Api extends __Fragment\n{\n\tprotected $module;\n\tfunction onCreate(Module $module)\n\t{\n\t\t$this->module = $module;\n\t}\n}`,
    },
    {
        name: "Views/index.html.twig",
        content: `<div class="d-flex align-content-center" style="min-height: 700px; width: 100%">\n\t<div class="text-center">\n\t\t<h2 class="fs-2 fw-bold">Coming Soon</h2>\n\t\t<p>this is base template, you should not see this</p>\n\t</div>\n</div>`,
    },

    {
        name: "Widgets/hallo/src/style.scss",
        content: `html, body {\n\theight: 100vh;\n\twidth: 100vw;\n\tmargin: 0;\n\tpadding: 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.widget-${_moduleName}-hallo {\n\theight: 100vh;\n\tcolor: red;\n\tfont-weight: 700;\n\tfont-size: 25px;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}`,
    },

    {
        name: "Widgets/hallo/src/index.js",
        content: `import "./style.scss";\n\nconsole.log("hello world from module ${moduleName} with widget hallo");\n\n// write your code here";`
    },
    {
        name: "Widgets/hallo/index.php",
        content: `<?php\n\nreturn [\n\t'name' => '@${_moduleName}/hallo',\n\t'title' => 'hallo widget',\n\t'category' => 'default',\n\t'description' => 'sample widget from module ${moduleName}'\n];`
    },
    {
        name: "Widgets/hallo/render.php",
        content: `<?php\n// write logic here\n?>\n<div class="widget-${_moduleName}-hallo">hello world</div>`
    },
    {
        name: "Widgets/index.php",
        content: `<?php\n\nreturn (array_map(function ($file) {\n\treturn require_once $file;}, glob(__DIR__ . '/**/index.php', GLOB_BRACE)));`
    },

    {
        name: "Controller/Guest.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName}\\Controller;\n\nuse MerapiPanel\\Box\\Module\\__Controller;\nuse MerapiPanel\\Views\\View;\nuse MerapiPanel\\Utility\\Router;\n\nclass Guest extends __Controller\n{\n\n\tfunction register()\n\t{\n\t\tRouter::GET("/${moduleName}", "index", self::class);\n\t\t// register other route\n\t}\n\tfunction index()\n\t{\n\t\treturn View::render("index.html.twig");\n\t}\n}`,
    },
    {
        name: "Controller/Admin.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName}\\Controller;\n\nuse MerapiPanel\\Box\\Module\\__Controller;\nuse MerapiPanel\\Views\\View;\nuse MerapiPanel\\Utility\\Router;\n\nclass Admin extends __Controller\n{\n\n\tfunction register()\n\t{\n\t\tRouter::GET("/${moduleName}", "index", self::class);\n\t\t// register other route\n\t}\n\tfunction index()\n\t{\n\t\treturn View::render("index.html.twig");\n\t}\n}`,
    },
    {
        name: "/Service.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName};\n\nuse MerapiPanel\\Box\\Module\\__Fragment;\nuse MerapiPanel\\Box\\Module\\Entity\\Module;\n\nclass Service extends __Fragment {\n\tprotected Module $module;\n\tfunction onCreate(Module $module) {\n\t\t$this->module = $module;\n\t}\n\n\t// add other funstion here\n\n}`,
    }
];

function initial_create(module_dir) {

    minimal_folder.forEach((folder) => {
        fs.mkdirSync(path.join(module_dir, folder));
    });
    minimal_files.forEach((file) => {
        fs.writeFileSync(path.join(module_dir, file.name), file.content);
    });
}


if (!moduleName) {
    console.log("Usage: merapipanel create-module <module-name>");
    process.exit(1);
}


if (fs.existsSync(path.join(cwd, "include", "module"))) {
    if (!fs.existsSync(path.join(cwd, "include", "module", moduleName))) {

        fs.mkdirSync(path.join(cwd, "include", "module", moduleName));
        initial_create(path.join(cwd, "include", "module", moduleName));
        console.log(`Module ${colours.fg.green}${moduleName}${colours.reset} created!.`);
        console.log(`Goto ${colours.fg.green}${cwd}/include/module/${moduleName}${colours.reset} to edit it.`);
        console.log("Command: ");
        console.log(`   watch: ${colours.fg.green}npx ${colours.reset}MerapiPanel ${colours.fg.magenta}module ${colours.fg.blue}--watch ${colours.fg.magenta}${moduleName}${colours.reset}`);
        console.log(`   build: ${colours.fg.green}npx ${colours.reset}MerapiPanel ${colours.fg.magenta}module ${colours.fg.blue}--build ${colours.fg.magenta}${moduleName}${colours.reset}`);
    } else {
        console.log("Module with this name already exists");
        process.exit(1);
    }
} else {
    console.log("create module must be in MerapiPanel directory");
    process.exit(1);
}
