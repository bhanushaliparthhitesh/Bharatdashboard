const { execSync } = require('child_process');
const fs = require('fs');
const json = fs.readFileSync('temp.json', 'utf8');
execSync(`node .agents/gsd-core/bin/gsd-tools.cjs query config-new-project '${json}'`, { stdio: 'inherit' });
