const path = require('path');
const fs = require('fs');

const FILES = [
  './src/constants/constants.ts'
]

function fixFile(filePath) {
  console.log('[PRE-PROD BUILD HOOK]', 'Fix file: ', filePath)
  const fullPath = path.resolve(__dirname, filePath);

  const file = fs.readFileSync(fullPath, 'UTF8');
  const fixedFile = file.replace('env.local', 'env.prod')

  fs.writeFileSync(fullPath, fixedFile, 'UTF8')
}

function run() {
  FILES.forEach(fixFile);

  console.log('[PRE-PROD BUILD HOOK]', 'Files fixes successfully')
}


run();