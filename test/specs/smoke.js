
// Cross-platform helper functions
const isAndroid = () => driver.isAndroid;
const isIOS = () => driver.isIOS;

// Platform-specific element selectors
const getElementSelector = (androidSelector, iosSelector) => {
    return isAndroid() ? androidSelector : iosSelector;
};

describe("Smoke Test", () => {

    it("Signup Feature: should not able to perform signup with already used email", async () => {

        const signinButtonSelector = getElementSelector(
            "id:onboarding_welcome_signin_button",
            "~onboarding_welcome_signin_button" // iOS accessibility id
        );
        const el1 = await driver.$(signinButtonSelector);
        await el1.click();

        const emailFieldSelector = getElementSelector(
            "id:signup_email_text",
            "~signup_email_text"
        );
        let el2 = await driver.$(emailFieldSelector);
        await el2.setValue("saurabh@dipostable.com");

        const passwordFieldSelector = getElementSelector(
            "id:signup_password_text",
            "~signup_password_text"
        );
        let el3 = await driver.$(passwordFieldSelector);
        await el3.setValue("Welcome@8");

        const confirmPasswordFieldSelector = getElementSelector(
            "id:signup_password_confirm_text",
            "~signup_password_confirm_text"
        );
        let el4 = await driver.$(confirmPasswordFieldSelector);
        await el4.click();
        await el4.setValue("Welcome@8");

        const signupButtonSelector = getElementSelector(
            "id:signup_button",
            "~signup_button"
        );
        let el5 = await driver.$(signupButtonSelector);
        await el5.click();

        const errorTextSelector = getElementSelector(
            "id:signup_error_text",
            "~signup_error_text"
        );
        const expectedText = await $(errorTextSelector);
        await expectedText.getText();
        console.log(expectedText);
        await expect(expectedText).toHaveTextContaining("Email is already in use.");
        await driver.pause(10000);

    });


});