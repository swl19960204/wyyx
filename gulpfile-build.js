let {task,sass,src,dest,watch,series,parallel}=require("gulp")

let load=require("gulp-load-plugins")()
let del=require("del")
/* const { resolve } = require("path")
const { rejects } = require("assert")
const { setFlagsFromString } = require("v8") */

async function deldist(){
    await del("./dist")
}

async function img(){
    src("./img/*.*")
    .pipe(dest('./dist/img'))
}

async function js(){
    src('./js/*.js')
    .pipe(load.babel({presets:['@babel/env']}))
    .pipe(load.uglify())
    .pipe(load.rev())
    .pipe(dest('./dist/js'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/js'))
}

/* async function sass(){
    src('./sass/*.scss')
    .pipe(load.sass())
    .pipe(load.minifyCss())
    .pipe(load.rev())
    .pipe(dest('./dist/css'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/css'))
} */
task('sass',async()=>{
    src('./sass/*.scss')
    .pipe(load.sass())
    .pipe(load.minifyCss())
    .pipe(load.rev())
    .pipe(dest('./dist/css'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/css'))
})

async function html(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
            src(['./rev/**/*.json','./dist/*.html'])
            .pipe(load.revCollector({
                replaceReved:true
            }))
            .pipe(load.minifyHtml())
            .pipe(dest('./dist'))
        },2000)
    })
}
//task('build',series('sass'))
task('build',async()=>{
    await deldist()
    await img()
    await js()
    /* await sass() */
    await html()
})
task('build',series('sass'))
