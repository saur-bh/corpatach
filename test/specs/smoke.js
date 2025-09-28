
const { getSelectors } = require('../../selectors');

// Parameterized and retry-enabled smoke tests
describe("Smoke Test", function () {
    // Enable suite-level retries via Mocha (see WebdriverIO docs)
    this.retries(2);

    const s = getSelectors();
    const email = process.env.USERNAME || "saurabh@dipostable.com";
    const passwordCases = ["Welcome@8", "Welcome@9", "Password123!"];

    for (const pwd of passwordCases) {
        it(`Signup shows existing-email error (pwd: ${pwd})`, async function () {
            // Allow test-level retry override if needed
            this.retries(1);

            // Go to sign-in from onboarding
            const signinBtn = await driver.$(s.onboarding.signinButton);
            await signinBtn.click();

            const emailField = await driver.$(s.signup.email);
            await emailField.clearValue();
            await emailField.setValue(email);

            const passwordField = await driver.$(s.signup.password);
            await passwordField.clearValue();
            await passwordField.setValue(pwd);

            const confirmPasswordField = await driver.$(s.signup.confirmPassword);
            await confirmPasswordField.clearValue();
            await confirmPasswordField.setValue(pwd);

            const submitBtn = await driver.$(s.signup.submit);
            await submitBtn.click();

            const errorTextEl = await $(s.signup.errorText);
            await expect(errorTextEl).toHaveTextContaining("Email is already in use.");
        });
    }
});