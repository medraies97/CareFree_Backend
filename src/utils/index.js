const fs = require('fs');

module.exports = {
  loadFirebaseConfig() {
    let config = fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    return JSON.parse(config)
  },
};
