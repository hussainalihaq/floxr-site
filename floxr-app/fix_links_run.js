const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const r of replacements) {
    content = content.replace(r.search, r.replace);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

// 1. about/page.tsx
replaceInFile('./app/(marketing)/about/page.tsx', [
  { search: 'href="/">LinkedIn', replace: 'href="https://linkedin.com/company/floxr">LinkedIn' },
  { search: 'href="/">Instagram', replace: 'href="https://instagram.com/floxr.co">Instagram' }
]);

// 2. audit/page.tsx
replaceInFile('./app/(marketing)/audit/page.tsx', [
  { search: /href="\/"([\s\S]*?)>(\s*)LinkedIn/g, replace: 'href="https://linkedin.com/company/floxr"$1>$2LinkedIn' },
  { search: /href="\/"([\s\S]*?)>(\s*)Instagram/g, replace: 'href="https://instagram.com/floxr.co"$1>$2Instagram' }
]);

// 3. careers/page.tsx
replaceInFile('./app/(marketing)/careers/page.tsx', [
  { search: 'href="/" className="text-[#86868b] text-[13px] hover:text-white transition-colors">LinkedIn', replace: 'href="https://linkedin.com/company/floxr" className="text-[#86868b] text-[13px] hover:text-white transition-colors">LinkedIn' },
  { search: 'href="/" className="text-[#86868b] text-[13px] hover:text-white transition-colors">Instagram', replace: 'href="https://instagram.com/floxr.co" className="text-[#86868b] text-[13px] hover:text-white transition-colors">Instagram' }
]);

// 4. contact/page.tsx
replaceInFile('./app/(marketing)/contact/page.tsx', [
  { search: /href="#"([\s\S]*?)>(\s*)LinkedIn/g, replace: 'href="https://linkedin.com/company/floxr"$1>$2LinkedIn' },
  { search: /href="#"([\s\S]*?)>(\s*)Instagram/g, replace: 'href="https://instagram.com/floxr.co"$1>$2Instagram' }
]);

// 5. lab/page.tsx
replaceInFile('./app/(marketing)/lab/page.tsx', [
  { 
    search: /href="#"/g, 
    replace: `href={
                        item === 'LinkedIn'
                          ? 'https://linkedin.com/company/floxr'
                          : item === 'Instagram'
                          ? 'https://instagram.com/floxr.co'
                          : 'https://github.com/floxr'
                      }` 
  }
]);

// 6. lab/[slug]/page.tsx
replaceInFile('./app/(marketing)/lab/[slug]/page.tsx', [
  { search: 'href="/">LinkedIn', replace: 'href="https://linkedin.com/company/floxr">LinkedIn' },
  { search: 'href="/">Privacy', replace: 'href="/privacy">Privacy' },
  { search: 'href="/">Instagram', replace: 'href="https://instagram.com/floxr.co">Instagram' }
]);

// 7. work/page.tsx
replaceInFile('./app/(marketing)/work/page.tsx', [
  { search: /href="\/"([\s\S]*?)>(\s*)Privacy/g, replace: 'href="/privacy"$1>$2Privacy' }
]);

// 8. page.tsx (Home)
replaceInFile('./app/page.tsx', [
  { search: 'href="https://linkedin.com"', replace: 'href="https://linkedin.com/company/floxr"' },
  { search: 'href="https://instagram.com"', replace: 'href="https://instagram.com/floxr.co"' },
  { search: /href="\/"([\s\S]*?)>(\s*)Privacy/g, replace: 'href="/privacy"$1>$2Privacy' }
]);

console.log('All links processed.');
