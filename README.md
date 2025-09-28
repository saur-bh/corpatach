# ScopeX Mobile App Testing Framework

This project provides automated testing for the **ScopeX** mobile application using WebdriverIO and Appium. Simple setup with optional Device Farm for team collaboration.

## 🚀 Quick Start for New Team Members

### 1. Prerequisites
- **Node.js**: v18.20.8 LTS (required)
- **Android Studio**: For Android testing
- **Xcode**: For iOS testing (macOS only)

### 2. Setup (5 minutes)
```bash
# Clone and install
git clone <repository-url>
cd scopex
npm install


# Install Appium drivers
npx appium driver install uiautomator2@2.34.2
npx appium driver install xcuitest@4.35.0

# Optional: Install Device Farm (for team collaboration)
npx appium plugin install device-farm@10.2.0
```

### 3. Run Tests
```bash
# Simple test run (no device farm)
npm run test:android

# With Device Farm (team collaboration)
npx appium --config device-farm-config.json  # Terminal 1
npm run test:android                          # Terminal 2
```

## Application Details

- **App Name**: ScopeX
- **Package Name**: `com.scopex.scopexmobile`
- **Main Activity**: `com.scopex.scopexmobile.MainActivity`
- **Test Device**: Scopex-Test emulator (Android)

## Configuration Options

### Two Ways to Run Tests

#### Option 1: Simple Mode (Recommended for beginners)
- Uses `wdio.conf.js` 
- Direct Appium connection
- Perfect for individual development

#### Option 2: Device Farm Mode (Team collaboration)
- Uses `minimal-wdio.conf.js` with Device Farm
- Web dashboard at `http://localhost:4723`
- Better for team environments and CI/CD

### Device Configuration

Edit `Config/android-device.json` for your setup:
```json
{
    "platformName": "Android",
    "platformVersion": "15",
    "deviceName": "Scopex-Test",
    "udid": "emulator-5554",
    "appPackage": "com.scopex.scopexmobile",
    "appActivity": "com.scopex.scopexmobile.MainActivity",
    "noReset": false,
    "fullReset": false
}
```

### Real Device Setup
For real devices, update the `udid` field:
- **Android**: Get UDID with `adb devices`
- **iOS**: Get UDID from Xcode → Window → Devices and Simulators
    "appPackage": "com.scopex.scopexmobile",
    "appActivity": "com.scopex.scopexmobile.MainActivity",
## Running Tests

### Simple Commands
```bash
# Android tests (default)
npm run test:android

# iOS tests  
npm run test:ios

# With Device Farm (optional)
npx appium --config device-farm-config.json  # Terminal 1
npm run test:android                          # Terminal 2

# Clear app cache/data before launch
npm run test:android:clear
npm run test:ios:clear

# Run specific test suites (e.g., smoke)
npm run test:smoke
wdio wdio.conf.js --suite smoke

# Repeat a suite multiple times (flakiness check)
npm run test:smoke:repeat
PLATFORM=android npm run test:android:smoke:repeat
PLATFORM=ios npm run test:ios:smoke:repeat
```

### Reset Behavior
- The framework now defaults to launching the installed app and clearing cache/data when `noReset=false` and `fullReset=false`.
- You can enforce reset behavior via `RESET_MODE` without editing config files:
  - `RESET_MODE=cache`: clears app data, does not reinstall (uses `noReset=false`, `fullReset=false`).
  - `RESET_MODE=keep`: keeps existing app data (uses `noReset=true`, `fullReset=false`).
  - `RESET_MODE=full`: performs a full reinstall. Ensure `appium:app` (Android/iOS) is set.
- Convenience scripts:
  - Android: `npm run test:android:clear` (equivalent to `RESET_MODE=cache`)
  - iOS: `npm run test:ios:clear` (equivalent to `RESET_MODE=cache`)

Note: For a full reset, you must provide an `appium:app` capability pointing to the app binary (APK/IPA/.app). Without it, Appium will error with “Full reset requires an app capability…”.

### Selectors Organization
- Platform-specific locators are organized under `selectors/`:
  - Android: `selectors/android/auth.js`
  - iOS: `selectors/ios/auth.js`
- In tests, import and use them via the unified entrypoint:
```javascript
// test/specs/smoke.js
const { getSelectors } = require('../../selectors');

it('Should able to see welcome screen', async () => {
  const s = getSelectors();
  const el1 = await driver.$(s.onboarding.signinButton);
  await el1.click();
  const email = await driver.$(s.signup.email);
  await email.setValue('user@example.com');
  // ...
});
```

This keeps iOS and Android locators in separate files while allowing tests to stay identical across platforms.

## Troubleshooting

### Common Issues
1. **"Device not found"**: Check `adb devices` or restart emulator
2. **"App not installed"**: Install ScopeX APK on device/emulator
3. **"Connection refused"**: Ensure Appium server is running
4. **"Element not found"**: App might be on different screen than expected

### Getting Help
- Check Appium logs in `wdio-appium.log` (git-ignored)
- Device Farm dashboard: `http://localhost:4723` (if using Device Farm)
- Verify device configuration in `Config/android-device.json`

## Project Structure
```
├── Config/                 # Device configurations
│   ├── android-device.json # Android setup
│   └── ios-device.json     # iOS setup
├── test/specs/            # Test files
├── wdio.conf.js          # Main WebDriverIO config
├── minimal-wdio.conf.js  # Config with enhanced logging
└── device-farm-config.json # Device Farm settings
```
---

## For Developers

### Parameterize & Retry
- Parameterize tests using data arrays or dynamic functions. Example:
  - In `test/specs/smoke.js`, a loop runs signup with multiple passwords.
  - Use environment variables for secrets, e.g. `process.env.USERNAME` and `process.env.PASSWORD`.
- Mocha retries:
  - Use `describe(function () { this.retries(2) })` (unbound function required).
  - Per test: `it('...', async function () { this.retries(1); /* ... */ })`.
- Global retries configured in `wdio.conf.js` and `minimal-wdio.conf.js`:
  - `specFileRetries: 1` and `mochaOpts.retries: 1`.
- Repeat a suite N times to catch flakiness:
  - `wdio wdio.conf.js --suite smoke --repeat 5`.
  - See scripts: `test:smoke:repeat`, `test:android:smoke:repeat`, `test:ios:smoke:repeat`.

### Adding New Tests
1. Create test files in `test/specs/`
2. Use cross-platform selectors:
```javascript
// Platform-specific element selection
const getElementSelector = (androidSelector, iosSelector) => {
    return isAndroid() ? androidSelector : iosSelector;
};

// Usage in tests
const signinButton = getElementSelector(
    "id:onboarding_welcome_signin_button",  // Android
    "~onboarding_welcome_signin_button"     // iOS
);
```

### Element Selector Strategy
- **Android**: Use resource-id (`id:element_id`)
- **iOS**: Use accessibility-id (`~accessibility_id`)

---

**Questions?** Check the logs in `wdio-appium.log` or ask the team!
