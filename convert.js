const fs = require('fs');

const html = fs.readFileSync('stitch_floxr_brand_evolution/floxr_homepage_digital_architecture_firm/code.html', 'utf8');

// Extract the body content
const bodyStart = html.indexOf('<body');
const bodyContentStart = html.indexOf('>', bodyStart) + 1;
const bodyEnd = html.indexOf('</body>');
let content = html.substring(bodyContentStart, bodyEnd);

// Convert HTML to JSX
content = content.replace(/class=/g, 'className=');
content = content.replace(/<!--/g, '{/*');
content = content.replace(/-->/g, '*/}');
content = content.replace(/<img([^>]+)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
});

// Create the page.tsx file
const jsx = `
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      ${content}
    </>
  );
}
`;

fs.writeFileSync('floxr-app/app/page.tsx', jsx);
console.log('Conversion complete!');
