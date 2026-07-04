const fs = require('fs');
const path = require('path');

const sidebars = [
  'components/sidebar/admin-sidebar.tsx',
  'components/attendee/attendee-sidebar.tsx',
  'components/sidebar-new.tsx'
];

const rules = [
  { search: /bg-\[#F3F4EF\]/g, replace: 'bg-[#65735A]' },
  { search: /text-\[#1F2933\]/g, replace: 'text-[#F8F8F5]' },
  { search: /text-\[#6B7280\]/g, replace: 'text-[#D8DDD6]' },
  { search: /hover:bg-\[rgba\(37,99,235,0\.08\)\]/g, replace: 'hover:bg-[#78866B]' },
  { search: /hover:text-\[#1F2933\]/g, replace: 'hover:text-white' },
  { search: /hover:text-\[#F8F8F5\]/g, replace: 'hover:text-white' }, // In case previous replacement made it hover:text-[#F8F8F5]
  { search: /bg-\[rgba\(37,99,235,0\.12\)\]/g, replace: 'bg-[#78866B]' },
  { search: /bg-white\/\[0\.04\]/g, replace: 'bg-[#78866B]/20' },
  { search: /hover:text-\[#FFFFFF\]/g, replace: 'hover:text-white' }
];

for (const relPath of sidebars) {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = content;
    
    for (const rule of rules) {
      modified = modified.replace(rule.search, rule.replace);
    }
    
    if (content !== modified) {
      fs.writeFileSync(fullPath, modified, 'utf8');
      console.log(`Updated ${relPath}`);
    }
  } else {
    console.log(`File not found: ${relPath}`);
  }
}
