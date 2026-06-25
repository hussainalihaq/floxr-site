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

    // Fix copyright year
    const copyrightRegex = /© 2024 FLOXR\. Digital Architecture Firm\./g;
    if (copyrightRegex.test(content)) {
        content = content.replace(copyrightRegex, '© 2026 FLOXR built in house.');
        changed = true;
    }
    
    // Fix footer logo size (make it h-6 md:h-8 which is smaller)
    const footerLogoRegex = /<img src="\/floxr-logo\.svg" alt="FLOXR" className="h-10 md:h-12/g;
    if (footerLogoRegex.test(content)) {
        content = content.replace(footerLogoRegex, '<img src="/floxr-logo.svg" alt="FLOXR" className="h-6 md:h-8');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
