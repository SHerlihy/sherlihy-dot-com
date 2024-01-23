const {globSync} = require("glob");
const {execSync} = require('child_process');
const fs = require('fs')

const htmlNames = globSync("**/*.html", {})
const fileNames = []

for (let i=0; i<htmlNames.length; i++) {
    fileNames[i] = htmlNames[i].replace(".html", "")
}

for (let i=0; i<fileNames.length; i++) {
    execSync(`./html_to_svg.sh ${fileNames[i]}`, { encoding: 'utf-8' });
}

execSync('awk -i inplace -f ./delete_infrastructure_diagrams.awk ../../README.md', { encoding: 'utf-8' });

const mdNames = globSync("**/*.md", {})

const diagramsStr = []
for (let i=0; i<mdNames.length; i++) {
    const diaMD = fs.readFileSync(mdNames[i]).toString().trim();
    const diaSpcSplit = diaMD.split("\n")
    diaSpcSplit.shift()
    diaSpcSplit.pop()

    const diaSpcJoin = diaSpcSplit.join("\\n")

    const diaCommaSplit = diaSpcJoin.split("\"")
    const diaCommaJoin = diaCommaSplit.join("\\\"")

    diagramsStr.push(diaCommaJoin)
}

execSync(`awk -i inplace \
    'BEGIN {toPrint = 0};\
    /^\\s*---/ {toPrint = 0};\
    {if (toPrint == 0) print};\
    /^## Infrastructure Diagrams.?$/ {toPrint = 1}' \
    ../../README.md`,
    { encoding: 'utf-8' }
)

for (let i=0; i<diagramsStr.length; i++) {
    execSync(`awk -i inplace \
        'BEGIN {toAdd=0};\
        {print};\
        /^## Infrastructure Diagrams.?$/ {if (toAdd == 0) print "\`\`\`mermaid";toAdd=1}' \
        ../../README.md`,
        { encoding: 'utf-8' }
    )
    
    execSync(`awk -i inplace \
        'BEGIN {toAdd=0};\
        {print};\
/\`\`\`mermaid/ {if (toAdd == 0) print "${diagramsStr[i]}"; print "\`\`\`"; toAdd=1}' \
        ../../README.md`,
        { encoding: 'utf-8' }
    )
}
