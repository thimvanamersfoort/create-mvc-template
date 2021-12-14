const fs = require('fs');
const path = require('path');

(async () => {

  const gitattr = fs.readFileSync(__dirname + '/config/.gitattributes', 'utf-8');

  console.log(gitattr);

})();