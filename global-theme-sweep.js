const fs = require('fs');
const path = require('path');

const rules = [
  { regex: /#F7F7F4/gi, replacement: '#F8F8F5' },
  { regex: /#FBFAF7/gi, replacement: '#F3F4EF' },
  { regex: /#9AA59E/gi, replacement: '#78866B' },
  { regex: /#7F8F84/gi, replacement: '#65735A' },
  { regex: /#E8E2CC/gi, replacement: '#E8E3D3' },
  { regex: /#A38A63/gi, replacement: '#B88A5A' },
  { regex: /#232323/gi, replacement: '#1F2933' },
  { regex: /#666666/gi, replacement: '#6B7280' },
  { regex: /#ECE8DF/gi, replacement: '#E4E6DE' },
  { regex: /#FBFAF8/gi, replacement: '#FFFFFF' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  for (const rule of rules) {
    newContent = newContent.replace(rule.regex, rule.replacement);
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

const dirsToProcess = ['app', 'components'];
for (const dir of dirsToProcess) {
  const fullDirPath = path.join(__dirname, dir);
  if (fs.existsSync(fullDirPath)) {
    console.log(`Processing directory: ${fullDirPath}`);
    processDirectory(fullDirPath);
  }
}

console.log('Theme sweep complete.');
