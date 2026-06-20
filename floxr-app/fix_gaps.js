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
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Set main padding exactly to 72px mobile and 80px desktop
  content = content.replace(/pt-\[80px\] md:pt-\[100px\]/g, 'pt-[72px] md:pt-[80px]');
  content = content.replace(/pt-\[100px\] md:pt-\[140px\]/g, 'pt-[72px] md:pt-[80px]');
  content = content.replace(/pt-\[140px\] md:pt-\[160px\]/g, 'pt-[72px] md:pt-[80px]');
  content = content.replace(/pt-\[140px\]/g, 'pt-[72px] md:pt-[80px]');
  
  // 2. Remove pt- on the first section of the page if it exists
  if (file.includes('app/page.tsx')) {
    content = content.replace(/pt-\[100px\] pb-12/g, 'pt-0 pb-12');
  } else if (file.includes('app/(marketing)/work/page.tsx')) {
    content = content.replace(/pt-\[10rem\] pb-section-gap/g, 'pt-12 pb-section-gap');
  } else if (file.includes('app/(marketing)/capabilities/page.tsx')) {
    content = content.replace(/pt-\[100px\] pb-16/g, 'pt-12 pb-16');
  } else if (file.includes('app/(marketing)/audit/page.tsx')) {
    content = content.replace(/className="py-section-gap"/g, 'className="pt-12 pb-section-gap"');
  }
  
  // 3. Enlarge logo in footers
  content = content.replace(/className="h-8 brightness-0 invert mb-4"/g, 'className="h-10 md:h-12 brightness-0 invert mb-4"');
  content = content.replace(/className="h-6 md:h-8 w-auto object-contain object-left mb-2 brightness-0 invert"/g, 'className="h-8 md:h-12 w-auto object-contain object-left mb-2 brightness-0 invert"');
  content = content.replace(/className="h-6 md:h-8 w-auto object-contain object-left mb-stack-sm brightness-0 invert"/g, 'className="h-8 md:h-12 w-auto object-contain object-left mb-stack-sm brightness-0 invert"');
  
  fs.writeFileSync(file, content);
});
console.log('Done!');
