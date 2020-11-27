//console.log("gulpfile配置文件执行");

//console.log(process.argv);

let mode=process.argv[2]

switch(mode){
    case "dev":
        require("./gulpfile-dev.js")
        break;
    case "build":
        require("./gulpfile-build.js")
        break
}