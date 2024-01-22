const {globSync} = require("glob");
const {execSync} = require('child_process');

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

for (let i=0; i<mdNames.length; i++) {
    const mdStr = execSync(`awk 'BEGIN {ORS="\\\\n"};!/^\s?\`\`\`/ {print}' ${mdNames[i]}`, { encoding: 'utf-8' })

    execSync(`awk -i inplace \
        '{print};\
        /^## Infrastructure Diagrams.?$/ {print "\`\`\`mermaid"}'\
        ../../README.md`,
        { encoding: 'utf-8' }
    )

    execSync(`awk -i inplace \
        'BEGIN {toAdd=1};\
        {print};\
        /\`\`\`mermaid/ {if (toAdd == 1) print "\`\`\`";toAdd=0}' \
        ../../README.md`,
        { encoding: 'utf-8' }
    )

    execSync(`awk -i inplace \
        'BEGIN {toAdd=1};\
        {print};\
        /\`\`\`mermaid/ {if (toAdd == 1) print "${mdStr}";toAdd=0}' \
        ../../README.md`,
        { encoding: 'utf-8' }
    )
}
