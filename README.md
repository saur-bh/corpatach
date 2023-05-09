# corpatch mobile application testing using appium and webdriverio

The framework is based on real device for andoird 12.0 and is configurable for other version too. 

## Pre-Condition 
* Android SDK is installed on machine and there should be one working emulator with version 12. Here is link to android SDK installation: https://developer.android.com/studio?gclid=Cj0KCQjw-pCVBhCFARIsAGMxhAf1x03LhY434R4mONjHXbZeurqMdZkCYTMAkBb5Tcxuup3MKdmQtJsaAlpcEALw_wcB&gclsrc=aw.ds
* Creating virtual device for android https://developer.android.com/studio/run/managing-avds

## Tech Stack 
- Andorid SDK to work in emulators 
- javaScript 
- mocha framework 
- webdriverio
- vsCode

## UseCase which is automated 
1. User get confirmation dialog with ETH value.

## Demo 
https://youtu.be/bTdHXDjxMps

## Setup

* Must have NodeJS and NPM installed (https://nodejs.org/en/)
* Launch vsCode editor 
* Goto command prompt and clone the current repository via command : git clone https://github.com/saur-bh/QA-Challenge-Mobile.git
* Install dependencies by running `npm install` from the command prompt.

## Running Tests

* To run the tests, run `npx wdio`


## Enhancement
  * allure-results integration 
  * Integration with CI tool i.e. Jenkins
  * Convert to pageObject desgin pattern or gerkins 
  * API call for setup and tearDown 

## Automation TestPlan
https://docs.google.com/document/d/1N4e6vgiLFqpKwjEb5j20IJFxXynsH4jzpiYGjdAc6Ks/edit?usp=sharing

## Troubleshooting 
adb uninstall io.appium.uiautomator2.server
adb uninstall io.appium.uiautomator2.server.test
