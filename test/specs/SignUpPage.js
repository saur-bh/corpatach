
const configData = require('../../helper/test-data')
describe("Signup Feature",()=>{

    it("Should launch SIGN-up Page ",async()=>{

        //1. Click on Pro button 
        const proBtn= await $("//*[@text='Pro']");
        await proBtn.click();



        //2. Exist Tutorial 
        const existbtn = await $("~close_icon");
        await existbtn.click();
        const loginBtn = await $("~Login-Navigation-Button");
        await loginBtn.click();
        

        //3. Login to application via api key 
            
            const linkAPI = await $("//*[@text='Log In with API Key']");
            await linkAPI.click();
            const androidbtn= await $("//*[@text='While using the app']");
            await androidbtn.click();
            const APILoginBtn = await $("~input");
            
            await APILoginBtn.click();
            

        //4. Enter Login credential 
        
            const APIKeyTextField = await $("//*[@content-desc='Login-Public-Key-Input']");
            await expect(APIKeyTextField).toBeDisplayed();
          
            await APIKeyTextField.setValue(configData.APIKey);
            

            // const APISecretTecxtField = await $("//*[@content-desc='Login-Secret-Key-Input']");
            // await expect(APIKeyTextField).toBeDisplayed();
            // await APISecretTecxtField.click();
            // await APIKeyTextField.setValue(configData.APISecret);

            const APISecretTecxtFields = await $$('android.widget.EditText');
            const nextElement = await APISecretTecxtFields[1]; 
            await nextElement.setValue(configData.APISecret);

            const loginAPKbtn = await $("~Login-Button");
            await expect(APIKeyTextField).toBeEnabled();
            await loginAPKbtn.click();
           
        //5. Create pin and confirm pin
       
        for(let i=0;i<4;i++){
            await $("~create_pin_input_"+i).setValue(i);
        }
        for(let i=0;i<4;i++){
            await $("~create_pin_input_"+i).setValue(i);
        }

        //6. select Eth 

        const ETHListItem = await $("~tickers_table_tETHUSD");
        await ETHListItem.click();

        // Select <market for order form 
        const orderFormPicker = await $("~order_form_type_picker");
        await orderFormPicker.click()
        const selectMarket = await $("//*[@text='Market']");
        await selectMarket.click();
    
        //Enter price 
        const bottomElementSelector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Amount ETH"))`
        await $(`android=${bottomElementSelector}`)
        const amoutTextFiedl = await $("~order_form_amount_input");
        await amoutTextFiedl.setValue(configData.amount);
        
        //click order Buy button 
        const orderBuybtn = await $("~order_buy_button");
        await orderBuybtn.click();

        //Validate 
        const confirmOrder = await $("//android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]");
        await confirmOrder.getText();
        console.log(confirmOrder);
       
        await expect(confirmOrder).toHaveTextContaining("Market");
        await expect(confirmOrder).toHaveTextContaining("Buy");
        await expect(confirmOrder).toHaveTextContaining("1.23");
        await expect(confirmOrder).toHaveTextContaining("ETH");
        



        
        


      





        

    });
    
  

})