class Home {
    /**
     * Define Elements
     */
    get appBtn() {return $("~Open navigation drawer");}
    get profileBtn() {return $('//android.widget.FrameLayout[@content-desc="Profile"]/android.widget.ImageView');}
    get textEntryhomeBtn() {return $('//android.widget.Button[@content-desc="Text Entry home"]');}
    get userNameField() {return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');}
    get passwordField() {return $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]');}
  
    get homeOkBtn() {return $('//android.widget.Button[@resource-id="android:id/button1"]');}
    get homeCancelBtn() {return $('//android.widget.Button[@resource-id="android:id/button2"]');}
  
    get viewBtn() {return $('//android.widget.TextView[@content-desc="Views"]')};
    get tabsBtn() {return $('//android.widget.TextView[@content-desc="Tabs"]')};
    get contentByIdBtn() {return $('//android.widget.TextView[@content-desc="1. Content By Id"]')};
  
    get tabs() {return $$('android.widget.LinearLayout')};
    get tab1Details() {return $('~tab1')};
    get tab2Details() {return $('~tab2')};
    get tab3Details() {return $('~tab3')};
  
    get repeatAlarmBtn() {return $('//android.widget.Button[@content-desc="Repeat alarm"]')};
  
    // #region Activity
      get cancelhomeMsgBtn() { return $('//android.widget.Button[@content-desc="OK Cancel home with a message"]'); }
      get cancelLonghomeMsgBtn() { return $('//android.widget.Button[@content-desc="OK Cancel home with a long message"]'); }
      get cancelUltraLonghomeMsgBtn() { return $('//android.widget.Button[@content-desc="OK Cancel home with ultra long message"]'); }
      get homeModalTitle() { return $('//android.widget.TextView[@resource-id="android:id/alertTitle"]'); }
      get homeModalMsg() { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }
    // #endregion
    
  
    _weekdayCheckbox(index){
      return $(`//android.widget.CheckedTextView[@index="${index}"]`);
    }
  
    // #region Activity
    gethomeModalTitle() {
      let title = this.homeModalTitle.getText();
      return title;
    }
  
    gethomeModalMsg() {
      let msg = this.homeModalMsg.getText();
      return msg;
    }
    // #endregion
  }
  module.exports = new Home();
  