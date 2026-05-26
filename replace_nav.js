const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all page.tsx and page_*.tsx files in app directory
const files = execSync('find /home/raja/mas_logistics/mas/app -type f -name "*.tsx"').toString().split('\n').filter(Boolean);

let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // We are replacing hrefs inside NAV_LINKS. 
  // It looks like: { name: "Services", href: "/services" }
  // We want: { name: "Services", href: "/#section-services" }
  
  newContent = newContent.replace(/href:\s*"\/(services|network|industry|about|FAQ)"/g, 'href: "/#section-$1"');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
    changedFiles++;
  }
}

console.log(`Finished. Updated ${changedFiles} files.`);
