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

    const footerDivRegex = /<div className="font-headline-lg text-headline-lg font-bold text-on-primary[^>]*>FLOXR<\/div>/g;
    if (footerDivRegex.test(content)) {
        content = content.replace(footerDivRegex, '<img src="/floxr-logo-dark.svg" alt="FLOXR" className="h-10 w-auto object-contain object-left mb-stack-sm" />');
        changed = true;
    }
    
    const oldFooterImg = /<img src="\/floxr-logo\.svg"[^>]*className="[^"]*brightness-0 invert[^"]*"[^>]*\/>/g;
    if (oldFooterImg.test(content)) {
        content = content.replace(oldFooterImg, '<img src="/floxr-logo-dark.svg" alt="FLOXR" className="h-10 w-auto object-contain object-left mb-stack-sm" />');
        changed = true;
    }

    if (content.includes('Immigration Platform')) {
        content = content.replace(/Immigration Platform/g, 'Study Abroad & Immigration Consultancy');
        changed = true;
    }

    if (content.includes('href="/#audit"')) {
        content = content.replace(/href="\/#audit"/g, 'href="/audit"');
        changed = true;
    }
    if (content.includes('href="/#capabilities"')) {
        content = content.replace(/href="\/#capabilities"/g, 'href="/capabilities"');
        changed = true;
    }
    if (content.includes('href="/#lab"')) {
        content = content.replace(/href="\/#lab"/g, 'href="/lab"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
