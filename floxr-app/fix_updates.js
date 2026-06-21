const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./app');
files.push('./components/Navbar.tsx');
files.push('./components/marketing/Footer.tsx');

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // 1. Revert logo size
  if (content.includes('h-10 md:h-12')) {
    content = content.replace(/h-10 md:h-12/g, 'h-8 md:h-10');
    changed = true;
  }
  
  // 2. Add email to footer
  if (content.includes('© 2026 FLOXR built in house.')) {
    if (!content.includes('hello@floxr.co')) {
      content = content.replace(
        /<div className="font-body-sm text-sm text-\[#888888\]">© 2026 FLOXR built in house.<\/div>/,
        '<div className="font-body-sm text-sm text-[#888888] mb-1">hello@floxr.co</div>\n            <div className="font-body-sm text-sm text-[#888888]">© 2026 FLOXR built in house.</div>'
      );
      content = content.replace(
        /<div className="font-body-sm text-sm text-left text-\[#888888\]">© 2026 FLOXR built in house.<\/div>/,
        '<div className="font-body-sm text-sm text-left text-[#888888] mb-1">hello@floxr.co</div>\n            <div className="font-body-sm text-sm text-left text-[#888888]">© 2026 FLOXR built in house.</div>'
      );
      changed = true;
    }
  }

  // 3. Update AmeerGlobal on app/page.tsx
  if (file.includes('app/page.tsx')) {
    content = content.replace(/AmeerGlobal Immigration Platform/g, 'Ameer Global Trading & Imports');
    content = content.replace(/Fragmented student application tracking, complex immigration paperwork, and inefficient client communication causing severe delays./g, 'A premium international trading company based in Toronto, specializing in import and export partnerships across commodities and logistics.');
    content = content.replace(/Developed a comprehensive digital platform with unified document management and real-time application status tracking./g, 'Built a modern digital storefront and operational platform to streamline private-label supply and global commodity trading.');
    content = content.replace(/Result: Reduced application processing time by 40% and increased successful student placements by 2.5x./g, 'Result: Elevated brand positioning and enabled seamless sourcing of premium goods globally.');
    
    // Make links clickable
    content = content.replace(
      /<div className="w-full h-full bg-surface-container-lowest flex items-center justify-center font-display-lg text-primary text-\[24px\]">/g,
      '<a href="https://ameerglobal.ca" target="_blank" rel="noopener noreferrer" className="w-full h-full bg-surface-container-lowest flex items-center justify-center font-display-lg text-primary text-[24px] hover:opacity-80 transition-opacity">'
    );
    content = content.replace(
      /ameerglobal\.ca\n\s*<\/div>/g,
      'ameerglobal.ca\n                      </a>'
    );
    
    content = content.replace(
      /<div className="w-full h-full bg-\[#000000\] flex items-center justify-center font-display-lg text-white text-\[24px\]">/g,
      '<a href="https://juriq.app" target="_blank" rel="noopener noreferrer" className="w-full h-full bg-[#000000] flex items-center justify-center font-display-lg text-white text-[24px] hover:opacity-80 transition-opacity">'
    );
    content = content.replace(
      /juriq\.app\n\s*<\/div>/g,
      'juriq.app\n                      </a>'
    );
    
    changed = true;
  }

  // 4. Update AmeerGlobal on app/(marketing)/work/page.tsx
  if (file.includes('app/(marketing)/work/page.tsx')) {
    content = content.replace(/Immigration Platform/g, 'Trading & Imports');
    content = content.replace(/End-to-end immigration services platform with automated workflows and client portal./g, 'Premium international trading company delivering reliable import and export partnerships across commodities, logistics, and private-label supply.');
    
    // Ensure links are clickable there too (if not already)
    content = content.replace(
      /<div className="absolute inset-0 bg-gradient-to-tr from-\[#0f172a\] to-\[#1e293b\] flex items-center justify-center overflow-hidden">/g,
      '<a href="https://ameerglobal.ca" target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] to-[#1e293b] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">'
    );
    content = content.replace(
      /ameerglobal\.ca\n\s*<\/div>/g,
      'ameerglobal.ca\n                </a>'
    );
    
    content = content.replace(
      /<div className="absolute inset-0 bg-gradient-to-br from-\[#000000\] to-\[#111111\] flex items-center justify-center overflow-hidden">/g,
      '<a href="https://juriq.app" target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#111111] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity">'
    );
    content = content.replace(
      /juriq\.app\n\s*<\/div>/g,
      'juriq.app\n                </a>'
    );

    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
});
console.log('Done!');
