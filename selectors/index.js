const androidAuth = require('./android/auth');
const iosAuth = require('./ios/auth');

function getSelectors() {
  // driver is available in test context; fall back to env if needed
  const isAndroid = (global.driver && global.driver.isAndroid) || (process.env.PLATFORM || '').toLowerCase() === 'android';
  return isAndroid ? androidAuth : iosAuth;
}

module.exports = { getSelectors };