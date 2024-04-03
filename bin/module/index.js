switch (process.argv[3]) {
    case "--watch": {
        require("./watch/index.js");
        break;
    }
    case "--build": {
        require("./build/index.js");
        break;
    }
    default: {
        if (process.argv[3]) {
            console.log("Unknown command: " + process.argv[3]);
        }
        console.log("Usage:");
        console.log("  merapipanel module --watch");
        console.log("  merapipanel module --build");
        break;
    }
}