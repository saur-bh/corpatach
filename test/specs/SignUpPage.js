
describe("Signup Feature",()=>{

    it("should not able to  perform signup with already used email ",async()=>{

        const el1=await driver.$("id:onboarding_welcome_signin_button");
        await el1.click();
        let el2 = await driver.$("id:signup_email_text");
        await el2.setValue("saurabh@dipostable.com");
        let el3 = await driver.$("id:signup_password_text");
        await el3.setValue("Welcome@8");
        let el4 = await driver.$("id:signup_password_confirm_text");
        await el4.click();
        await el4.setValue("Welcome@8");
        let el5 = await driver.$("id:signup_button");
        await el5.click();
        const expectedText = await $("id:signup_error_text");
        await expectedText.getText();
        console.log(expectedText);
        await expect(expectedText).toHaveTextContaining("Email is already in use.");
        await driver.pause(10000)

    });
    
    it("should not able to  perform signup with wrong password ",async()=>{

        let el2 = await driver.$("id:signup_email_text");
        await el2.setValue("saurabh@dipostable.com");
        let el3 = await driver.$("id:signup_password_text");
        await el3.setValue("Welcome@8");
        let el4 = await driver.$("id:signup_password_confirm_text");
        await el4.click();
        await el4.setValue("Welcome@sss8");
        let el5 = await driver.$("id:signup_button");
        await el5.click();
        const expectedText = await $("id:textinput_error");
        await expectedText.getText();
        console.log(expectedText);
        await expect(expectedText).toHaveTextContaining("Those passwords didn’t match. Try again.");
        await driver.pause(10000)

    });

    it("should not able to  perform signup with invalid email ",async()=>{

      
        let el2 = await driver.$("id:signup_email_text");
        await el2.setValue("saurabh");
        let el3 = await driver.$("id:signup_password_text");
        await el3.setValue("Welcome@8");
        let el4 = await driver.$("id:signup_password_confirm_text");
        await el4.click();
        await el4.setValue("Welcome@8");
        let el5 = await driver.$("id:signup_button");
        await el5.click();
        const expectedText = await $("id:textinput_error");
        await expectedText.getText();
        console.log(expectedText);
        await expect(expectedText).toHaveTextContaining("Please enter a valid email address!");
        await driver.pause(10000)

    });
  

});