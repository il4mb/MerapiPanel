const fs = require("fs");
const path = require("path");
const moduleName = process.argv[3];
const cwd = process.cwd();


const minimal_folder = [
    "Assets",
    "Assets/src",
    "Blocks",
    "Widgets",
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
        name: "Controller/Guest.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName}\\Controller;\n\nuse MerapiPanel\\Box\\Module\\__Controller;\nuse MerapiPanel\\Views\\View;\nuse MerapiPanel\\Utility\\Router;\n\nclass Guest extends __Controller\n{\n\n\tfunction register()\n\t{\n\t\tRouter::GET("/", "index", self::class);\n\t\t// register other route\n\t}\n\tfunction index()\n\t{\n\t\treturn View::render("index.html.twig");\n\t}\n}`,
    },
    {
        name: "Controller/Admin.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName}\\Controller;\n\nuse MerapiPanel\\Box\\Module\\__Controller;\nuse MerapiPanel\\Views\\View;\nuse MerapiPanel\\Utility\\Router;\n\nclass Admin extends __Controller\n{\n\n\tfunction register()\n\t{\n\t\tRouter::GET("/", "index", self::class);\n\t\t// register other route\n\t}\n\tfunction index()\n\t{\n\t\treturn View::render("index.html.twig");\n\t}\n}`,
    },
    {
        name: "/Service.php",
        content: `<?php\nnamespace MerapiPanel\\Module\\${moduleName};\n\nuse MerapiPanel\\Box\\Module\\__Fragment;\nuse MerapiPanel\\Box\\Module\\Entity\\Module;\n\nclass ${moduleName} extends __Fragment {\n\tprotected Module $module;\n\tfunction onCreate(Module $module) {\n\t\t$this->module = $module;\n\t}\n\n\t// add other funstion here\n\n}`,
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
    } else {
        console.log("Module with this name already exists");
        process.exit(1);
    }
} else if (!fs.existsSync(path.join(cwd, moduleName))) {
    fs.mkdirSync(path.join(cwd, moduleName));
    initial_create(path.join(cwd, moduleName));
} else {
    console.log("Module with this name already exists");
    process.exit(1);
}


console.log(`Module ${moduleName} created!`);