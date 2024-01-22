const glob = require("glob");
const execSync = require('child_process').execSync;

const htmlNames = []
glob("**/*.html", function(err,fileNames) {
    htmlNames = [htmlNames, ...fileNames]
})

for (let i=0; i<htmlNames.length; i++) {
    execSync(`./html_to_svg.sh ${htmlNames[i]}`, { encoding: 'utf-8' });
}

execSync('awk -i inplace -f ./delete_infrastructure_diagrams.awk ../../README.md', { encoding: 'utf-8' });
for (let i=0; i<htmlNames.length; i++) {
    execSync(`./html_to_svg.sh ${htmlNames[i]}`, { encoding: 'utf-8' });
}

const mdNames = []
glob("**/*.md", function(err,fileNames) {
    mdNames = [mdNames, ...fileNames]
})

for (let i=0; i<mdNames.length; i++) {
    const mdContent = execSync(`cat ${mdNames[i]}`, { encoding: 'utf-8' });
    execSync(`awk -i inplace -v infraDiagram="${mdContent}" -f ./add_infra_diagram.awk ../../README.md`, { encoding: 'utf-8' });
}
