const fs = require('fs');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('floxr-app/app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace padding top in main tags to fix the gap globally
    const ptRegex = /pt-\[?\d+px\]?|pt-32/g;
    
    // We only want to replace it inside <main className="...">
    const mainRegex = /<main className="([^"]+)"/g;
    content = content.replace(mainRegex, (match, classes) => {
        const newClasses = classes.replace(ptRegex, '').replace(/\s+/g, ' ').trim() + ' pt-[80px] md:pt-[100px]';
        changed = true;
        return `<main className="${newClasses}"`;
    });

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated gap in ${file}`);
    }
});
