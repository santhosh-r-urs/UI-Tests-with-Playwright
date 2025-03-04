import { test, expect } from './fixtures/pageFixtures.js';

const itemName = 'Sauce Labs Fleece Jacket';
let priceOfItem;


test('Add an item to the cart and verify the cart counter is displayed correctly', async ({productsListPage}) => {
    await productsListPage.goToProductListsPage();
    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    await productsListPage.addItemToCart(itemName, page);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    expect(await productsListPage.getCartIconBadgeCount()).toBe('1');
});

test('Add an item to the cart and verify the price of the item is same on the Your cart page', async ({productsListPage,yourCartPage }) => {

    await productsListPage.goToProductListsPage();
    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    await productsListPage.addItemToCart(itemName, page);
    await productsListPage.clickCartIcon();
    expect(await yourCartPage.pageTitle).toHaveText('Your Cart');

    expect(await yourCartPage.getPriceOnYourCartPage(itemName, page)).toBe(priceOfItem);
    
});

test('Item can be checkout from the Your cart page', async ({productsListPage,yourCartPage}) => {
    await productsListPage.goToProductListsPage();
    await productsListPage.addItemToCart(itemName, page);
    await productsListPage.clickCartIcon();
    
    await yourCartPage.clickCheckOutButton();
});

test('After checking out the item user can provide their information and proceed to checkout overview page', async ({productsListPage,yourCartPage, yourInformationPage}) => {

    await productsListPage.goToProductListsPage();
    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    await productsListPage.addItemToCart(itemName, page);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    await productsListPage.clickCartIcon();
    
    await yourCartPage.clickCheckOutButton();
    expect(await yourInformationPage.pageTitle).toHaveText('Checkout: Your Information');
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();

});

test('Checkout overview page displays title, item name and prices correctly', async ({productsListPage,yourCartPage, yourInformationPage, checkoutOverviewPage}) => {
    await productsListPage.goToProductListsPage();
    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    await productsListPage.addItemToCart(itemName, page);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    await productsListPage.clickCartIcon();
    
    await yourCartPage.clickCheckOutButton();
    expect(await yourInformationPage.pageTitle).toHaveText('Checkout: Your Information');
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();

    expect(await checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
    expect(await checkoutOverviewPage.getPriceOnCheckOutOverviewPage(itemName, page)).toBe(priceOfItem);
    expect(await checkoutOverviewPage.getSubTotalPriceOnCheckOutOverviewPage(page)).toBe(`Item total: ${priceOfItem}`);
});

test('Checkout can be completed from the checkout overview page and Checkout complete page is displayed correctly', async ({productsListPage,yourCartPage, yourInformationPage, checkoutOverviewPage}) => {
    
    await productsListPage.goToProductListsPage();
    
    priceOfItem = await productsListPage.capturePriceOfItem(itemName, page);
    await productsListPage.addItemToCart(itemName, page);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    await productsListPage.clickCartIcon();
    
    await yourCartPage.clickCheckOutButton();
    expect(await yourInformationPage.pageTitle).toHaveText('Checkout: Your Information');
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();

    expect(await checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
    expect(await checkoutOverviewPage.getPriceOnCheckOutOverviewPage(itemName, page)).toBe(priceOfItem);
    expect(await checkoutOverviewPage.getSubTotalPriceOnCheckOutOverviewPage(page)).toBe(`Item total: ${priceOfItem}`);
    await checkoutOverviewPage.clickFinishButton();

    const checkoutCompletePage = new CheckoutCompletePage(page);
    expect(await checkoutCompletePage.pageTitle).toHaveText('Checkout: Complete!');
    expect(await checkoutCompletePage.finishedIcon.isVisible()).toBeTruthy();
    expect(await checkoutCompletePage.completedText).toHaveText('Thank you for your order!');
    expect(await checkoutCompletePage.backToHomeButton.isVisible()).toBeTruthy();
    
});


test.skip('Login to Saucedemo and complete checkout', async ({page}) => {
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