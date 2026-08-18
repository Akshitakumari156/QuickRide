const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./', function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/blue-50\b/g, 'slate-100')
      .replace(/blue-100\b/g, 'slate-200')
      .replace(/blue-200\b/g, 'slate-300')
      .replace(/blue-300\b/g, 'slate-400')
      .replace(/blue-400\b/g, 'slate-400')
      .replace(/blue-500\b/g, 'slate-800')
      .replace(/blue-600\b/g, 'slate-900')
      .replace(/blue-700\b/g, 'slate-800')
      .replace(/blue-900\b/g, 'slate-950')
      .replace(/indigo-500\b/g, 'slate-800')
      .replace(/indigo-600\b/g, 'slate-900')
      .replace(/indigo-700\b/g, 'slate-800');
    
    // Also change custom hex colors used in Button components
    newContent = newContent.replace(/bg="#2563eb"/g, 'bg="#0f172a"'); // slate-900
    newContent = newContent.replace(/hoverbg="#1d4ed8"/g, 'hoverbg="#1e293b"'); // slate-800

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
