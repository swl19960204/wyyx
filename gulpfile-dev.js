
let {task,src,dest,watch,sass,series,parallel}=require("gulp")

let load=require("gulp-load-plugins")()
let del=require("del")

task("deldist",async()=>{
    await del("./dist")
})

task("img",async()=>{
    src("./img/*.*")
    .pipe(dest("./dist/img"))
    .pipe(load.connect.reload())
})

task("js",async()=>{
    src("./js/*.js")
    .pipe(load.babel({presets:['@babel/env']}))
    .pipe(dest("./dist/js"))
    .pipe(load.connect.reload())
})
task("php",async()=>{
    src("./php/*.php")
    .pipe(dest('./dist/php'))
    .pipe(load.connect.reload())
})
task("html",async()=>{
    src("./html/*.html")
    .pipe(dest('./dist/pages'))
    .pipe(load.connect.reload())
})

task("sass",async()=>{
    src("./sass/*.scss")
    .pipe(load.sass())
    .pipe(dest("./dist/css"))
    .pipe(load.connect.reload())
})

task("watch",async()=>{
    watch("./html/*.html",series("html"))
    watch("./sass/*.scss",series('sass'))
    watch('./img/*.*',series('img'))
    watch('.js/*.js',series('js'))
    watch('.php/*.php',series('php'))
})

task('connect',async()=>{
    load.connect.server({
        root:'./dist',
        livereload:true,
        port:3000
    })
})

task('dev',series('deldist','img','html','js','sass',"php",'connect','watch'))