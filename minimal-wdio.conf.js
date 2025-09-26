// Enhanced WebDriverIO Configuration with Improved Logging
const path = require('path');
const fs = require('fs');

// Function to load device configuration based on platform
function loadDeviceConfig(platform) {
    const configPath = `./Config/${platform.toLowerCase()}-device.json`;
    if (fs.existsSync(configPath)) {
        return require(configPath);
    }
    return require('./Config/test-device.json');
}

const platform = process.env.PLATFORM || 'android';
const configData = loadDeviceConfig(platform);

exports.config = {
    port: 4723,
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: 1,
    
    capabilities: [
        ...(platform.toLowerCase() === 'android' ? [{
            platformName: "Android",
            "appium:platformVersion": configData.platformVersion || "12",
            "appium:deviceName": configData.deviceName || "Android Emulator",
            "appium:automationName": "UIAutomator2",
            "appium:udid": configData.udid,
            "appium:appPackage": configData.appPackage,
            "appium:appActivity": configData.appActivity,
            "appium:noReset": configData.noReset || false,
            "appium:fullReset": configData.fullReset || false,
            "appium:newCommandTimeout": 300,
            "appium:autoGrantPermissions": true,
            "appium:uiautomator2ServerInstallTimeout": 60000,
            "appium:adbExecTimeout": 20000
        }] : [{
            platformName: "iOS",
            "appium:platformVersion": configData.platformVersion || "16.0",
            "appium:deviceName": configData.deviceName || "iPhone 14",
            "appium:automationName": "XCUITest",
            "appium:udid": configData.udid,
            "appium:bundleId": configData.bundleId,
            "appium:app": configData.app,
            "appium:noReset": configData.noReset || false,
            "appium:fullReset": configData.fullReset || false,
            "appium:newCommandTimeout": 300,
            "appium:autoAcceptAlerts": configData.autoAcceptAlerts || false,
            "appium:autoDismissAlerts": configData.autoDismissAlerts || false,
            "appium:wdaLaunchTimeout": 60000,
            "appium:wdaConnectionTimeout": 60000
        }])
    ],

    // MINIMAL LOGGING CONFIGURATION
    logLevel: 'info',  // Changed back to info for minimal logging
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },

    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // MINIMAL SERVICES CONFIGURATION
    services: [
        ['appium', {
            logPath: './logs/',
            command: 'appium'
        }]
    ],

    framework: 'mocha',
    
    // MINIMAL REPORTERS CONFIGURATION
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // ENHANCED HOOKS FOR LOGGING
    onPrepare: function (config, capabilities) {
        // Create logs directory if it doesn't exist
        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }
        console.log('Test execution started at:', new Date().toISOString());
    },

    beforeSession: function (config, capabilities, specs) {
        console.log('Starting session for:', capabilities.platformName);
    },
    
    afterSession: function (config, capabilities, specs) {
        console.log('Session ended for:', capabilities.platformName);
    },

    after: function (result, capabilities, specs) {
        console.log('Test suite completed. Result:', result === 0 ? 'PASSED' : 'FAILED');
    },

    onComplete: function(exitCode, config, capabilities, results) {
        console.log('All tests completed at:', new Date().toISOString());
        console.log('Exit code:', exitCode);
    },

    featureFlags: {
        specFiltering: true
    }
};