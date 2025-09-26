const { join } = require('path');

module.exports = {
  // Device Farm Configuration
  platform: process.env.PLATFORM || 'both', // 'android', 'ios', or 'both'
  
  // Server Configuration
  serverConfig: {
    port: 31337, // Device Farm default port
    host: '0.0.0.0',
    maxSessions: 10,
    sessionTimeout: 600000, // 10 minutes
  },

  // Hub Configuration for Appium
  hubConfig: {
    port: 4723,
    host: '127.0.0.1',
  },

  // Android Device Configuration
  androidDevices: [
    {
      name: 'Android_Emulator_API_33',
      udid: 'emulator-5554',
      platformVersion: '13.0',
      deviceName: 'Android Emulator',
      platformName: 'Android',
      automationName: 'UiAutomator2',
      systemPort: 8200,
      chromeDriverPort: 8000,
      wdaLocalPort: null,
      mjpegServerPort: 7100,
      appiumPort: 4723,
      maxInstances: 1,
      busy: false,
      realDevice: false,
      deviceType: 'emulator',
      host: '127.0.0.1',
      adbExecTimeout: 20000,
      uiautomator2ServerInstallTimeout: 20000,
      capabilities: {
        'appium:deviceName': 'Android Emulator',
        'appium:platformName': 'Android',
        'appium:platformVersion': '13.0',
        'appium:automationName': 'UiAutomator2',
        'appium:udid': 'emulator-5554',
        'appium:systemPort': 8200,
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:newCommandTimeout': 300,
        'appium:autoGrantPermissions': true,
      }
    }
  ],

  // iOS Device Configuration
  iosDevices: [
    {
      name: 'iPhone_14_Simulator',
      udid: 'auto',
      platformVersion: '16.0',
      deviceName: 'iPhone 14',
      platformName: 'iOS',
      automationName: 'XCUITest',
      systemPort: null,
      chromeDriverPort: null,
      wdaLocalPort: 8100,
      mjpegServerPort: 7200,
      appiumPort: 4724,
      maxInstances: 1,
      busy: false,
      realDevice: false,
      deviceType: 'simulator',
      host: '127.0.0.1',
      wdaLaunchTimeout: 60000,
      wdaConnectionTimeout: 60000,
      capabilities: {
        'appium:deviceName': 'iPhone 14',
        'appium:platformName': 'iOS',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'XCUITest',
        'appium:udid': 'auto',
        'appium:wdaLocalPort': 8100,
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:newCommandTimeout': 300,
        'appium:autoAcceptAlerts': false,
        'appium:autoDismissAlerts': false,
      }
    }
  ],

  // Plugin Configuration
  plugins: {
    'device-farm': {
      platform: process.env.PLATFORM || 'both',
      androidDeviceTimeout: 600000,
      iosDeviceTimeout: 600000,
      includeSimulators: true,
      skipChromeDownload: false,
      derivedDataPath: join(process.cwd(), 'DerivedData'),
      mjpegServerFramerate: 10,
      mjpegScaleFactor: 0.5,
    }
  },

  // Dashboard Configuration
  dashboard: {
    enabled: true,
    port: 3000,
    hostname: '0.0.0.0',
  },

  // Logging Configuration
  logging: {
    level: 'info',
    logFile: join(process.cwd(), 'device-farm.log'),
  },

  // Cloud Integration (optional)
  cloud: {
    enabled: false,
    provider: null, // 'browserstack', 'saucelabs', 'lambdatest'
    credentials: {
      username: process.env.CLOUD_USERNAME,
      accessKey: process.env.CLOUD_ACCESS_KEY,
    }
  }
};