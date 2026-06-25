const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') && !file.includes('layout.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('floxr-app/app/(marketing)');
files.push('floxr-app/app/page.tsx');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const navRegex = /<nav\b[^>]*>[\s\S]*?<\/nav>/;
    if (navRegex.test(content) && !content.includes('<Navbar />')) {
        content = content.replace(navRegex, '<Navbar />');
        
        // Add import statement if not exists
        if (!content.includes("import Navbar")) {
            // Find the last import statement or 'use client'
            const importRegex = /(?:^|\n)(import\s+.*|'use client';|use client;)/g;
            let lastMatch = null;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                lastMatch = match;
            }
            
            if (lastMatch) {
                const index = lastMatch.index + lastMatch[0].length;
                content = content.slice(0, index) + "\nimport Navbar from '@/components/Navbar';" + content.slice(index);
            } else {
                content = "import Navbar from '@/components/Navbar';\n" + content;
            }
        }
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
