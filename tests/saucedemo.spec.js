import { test, expect } from '@playwright/test';
import {LoginPage} from './pages/saucedemo/loginPage.js';
import {ProductsListPage} from './pages/saucedemo/productsListPage.js';
import { YourCartPage } from './pages/saucedemo/yourCartPage.js';
import { YourInformationPage } from './pages/saucedemo/yourInformationPage.js';
import { CheckoutOverviewPage } from './pages/saucedemo/checkoutOverviewPage.js';
import { CheckoutCompletePage } from './pages/saucedemo/checkoutCompletePage.js';


//const saucedemoUrl = 'https://www.saucedemo.com/';
const itemName = 'Sauce Labs Fleece Jacket';
let priceOfItem;

console.log(process.env.SAUCEDEMO_USERNAME);
console.log (process.env.SAUCEDEMO_PASSWORD);   

test('Login to Saucedemo', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToSaucedemoPage();
    await loginPage.pageHeaderIsVisible();
    await loginPage.login();
});

test.only('Login to Saucedemo and complete checkout', async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsListPage = new ProductsListPage(page);
    const yourCartPage = new YourCartPage(page);
    const yourInformationPage = new YourInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    const firstName = 'Test';
    const lastName = 'User';
    const postalCode = '12345';

    await loginPage.goToSaucedemoPage();
    await loginPage.pageHeaderIsVisible();
    await loginPage.login();

    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    console.log(`The price of ${itemName} is ${priceOfItem}`);

    await productsListPage.addItemToCart(itemName, page);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    expect(await productsListPage.getCartIconBadgeCount()).toBe('1');
    await productsListPage.clickCartIcon();
    expect(await yourCartPage.pageTitle).toHaveText('Your Cart');

    expect(await yourCartPage.getPriceOnYourCartPage(itemName, page)).toBe(priceOfItem);

    await yourCartPage.clickCheckOutButton();

    expect(await yourInformationPage.pageTitle).toHaveText('Checkout: Your Information');
    await yourInformationPage.fillFirstName(firstName);
    await yourInformationPage.fillLastName(lastName);
    await yourInformationPage.fillPostalCode(postalCode);
    await yourInformationPage.clickContinueButton();

    expect(await checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
    expect( await checkoutOverviewPage.getPriceOnCheckOutOverviewPage(itemName, page)).toBe(priceOfItem);
    expect(await checkoutOverviewPage.getSubTotalPriceOnCheckOutOverviewPage(page)).toBe(`Item total: ${priceOfItem}`);

    await checkoutOverviewPage.clickFinishButton();

    expect (await checkoutCompletePage.pageTitle).toHaveText('Checkout: Complete!');
    expect (await checkoutCompletePage.finishedIcon.isVisible()).toBeTruthy();
    expect (await checkoutCompletePage.completedText).toHaveText('Thank you for your order!');
    expect (await checkoutCompletePage.backToHomeButton.isVisible()).toBeTruthy();




    

});