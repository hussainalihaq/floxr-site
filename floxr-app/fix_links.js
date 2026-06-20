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
  if (content.includes('href="#"')) {
    content = content.replace(/href="#"/g, 'href="/"');
    fs.writeFileSync(file, content);
  }
});
console.log('Links fixed!');
