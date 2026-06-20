const fs = require('fs');
let code = fs.readFileSync('floxr-app/app/page.tsx', 'utf8');

// Replace standard links
code = code.replace(/>Contact<\/a>/g, ' href="/contact">Contact</Link>').replace(/<a /g, '<Link ').replace(/<\/a>/g, '</Link>');
code = code.replace(/href="#"/g, 'href="/"');

// Manually fix Contact links that got partially replaced
code = code.replace(/href="\/" href="\/contact">Contact<\/Link>/g, 'href="/contact">Contact</Link>');

// Wrap "Get Started" and "Request an Audit" in Link
code = code.replace(/<button class="bg-primary(.*?)>\s*Get Started\s*<\/button>/, '<Link href="/contact"><button class="bg-primary$1>Get Started</button></Link>');
code = code.replace(/<button class="bg-on-primary(.*?)>\s*Request an Audit\s*<\/button>/, '<Link href="/contact"><button class="bg-on-primary$1>Request an Audit</button></Link>');

// Replace class= with className= again just in case the buttons above used class=
code = code.replace(/class=/g, 'className=');

fs.writeFileSync('floxr-app/app/page.tsx', code);
