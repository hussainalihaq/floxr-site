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

    // Add dark:invert to the header logos
    const headerLogoRegex = /<img src="\/floxr-logo\.svg" alt="FLOXR" className="h-10 md:h-12 w-auto" \/>/g;
    if (headerLogoRegex.test(content)) {
        content = content.replace(headerLogoRegex, '<img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto dark:invert" />');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
