const {globSync} = require("glob");
const {execSync} = require('child_process');
const fs = require('fs')

const curPathLocals = process.argv[1].split("/")
curPathLocals.pop()

const curPath = curPathLocals.join("/")

const dirPath = `${curPath}/${process.argv[2]}`

const txtFiles = globSync(`${dirPath}/**/*.txt`, {})

let diagramStr = ""
for (let i=0; i<txtFiles.length; i++){
    const diaComponent = fs.readFileSync(txtFiles[i]);
    diagramStr = diagramStr + diaComponent
}

const diaSpcSplit = diagramStr.split("\n")
const diaSpcJoin = diaSpcSplit.join("\\n")

const diaCommaSplit = diaSpcJoin.split("\"")
const diaCommaJoin = diaCommaSplit.join("\\\"")

const htmlFiles = globSync(`${dirPath}/*.html`, {})
const firstHTML = htmlFiles[0]

execSync(`awk -i inplace \
    'BEGIN {toPrint = 0};\
    /^\\s*<\\/pre>.*$/ {toPrint = 0};\
    {if (toPrint == 0) print};\
    /^\\s*flowchart.*$/ {print "${diaCommaJoin}";toPrint = 1};' \
    ${firstHTML}`,
    { encoding: 'utf-8' }
)
