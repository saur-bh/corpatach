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
cd corpatach
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
    "fullReset": false,
    "noReset": true
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
```

## Troubleshooting

### Common Issues
1. **"Device not found"**: Check `adb devices` or restart emulator
2. **"App not installed"**: Install ScopeX APK on device/emulator
3. **"Connection refused"**: Ensure Appium server is running
4. **"Element not found"**: App might be on different screen than expected

### Getting Help
- Check logs in `wdio-appium.log`
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
