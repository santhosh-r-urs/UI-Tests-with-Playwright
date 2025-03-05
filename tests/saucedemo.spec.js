import { test, expect } from './fixtures/pageFixtures.js';
import { CheckoutCompletePage } from './pages/saucedemo/checkoutCompletePage.js';

const itemName = 'Sauce Labs Fleece Jacket';
let priceOfItem;

test.describe('Saucedemo - Each of the major end to end flow tests', () => {
  test.beforeEach('Go to products list page', async ({ productsListPage }) => {
    await productsListPage.goToProductListsPage();
  });

  test('Add an item to the cart and verify the cart counter is displayed correctly', async ({
    productsListPage
  }) => {
    await productsListPage.addItemToCart(itemName, productsListPage);
    expect(await productsListPage.cartIconBadge).toBeVisible();
    expect(await productsListPage.getCartIconBadgeCount()).toBe('1');
  });

  test('Add an item to the cart and verify the price of the item is same on the Your cart page', async ({
    productsListPage,
    yourCartPage
  }) => {
    priceOfItem = await productsListPage.capturePriceOfItem(itemName);
    await productsListPage.addItemToCart(itemName, productsListPage);
    await productsListPage.clickCartIcon();

    expect(await yourCartPage.pageTitle).toHaveText('Your Cart');
    expect(await yourCartPage.getPriceOnYourCartPage(itemName)).toBe(
      priceOfItem
    );
  });

  test('Item can be checkout from the Your cart page', async ({
    productsListPage,
    yourCartPage,
    yourInformationPage
  }) => {
    await productsListPage.addItemToCart(itemName);
    await productsListPage.clickCartIcon();
    await yourCartPage.clickCheckOutButton();
    expect(await yourInformationPage.pageTitle).toHaveText(
      'Checkout: Your Information'
    );
  });

  test('After checking out the item user can provide their information and proceed to checkout overview page', async ({
    productsListPage,
    yourCartPage,
    yourInformationPage,
    checkoutOverviewPage
  }) => {
    await productsListPage.addItemToCart(itemName);
    await productsListPage.clickCartIcon();

    await yourCartPage.clickCheckOutButton();
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();
    expect(await checkoutOverviewPage.pageTitle).toHaveText(
      'Checkout: Overview'
    );
  });

  test('Checkout overview page displays title, item name and prices correctly', async ({
    productsListPage,
    yourCartPage,
    yourInformationPage,
    checkoutOverviewPage
  }) => {
    await productsListPage.addItemToCart(itemName);
    await productsListPage.clickCartIcon();

    await yourCartPage.clickCheckOutButton();
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();

    expect(
      await checkoutOverviewPage.getPriceOnCheckOutOverviewPage(itemName)
    ).toBe(priceOfItem);
    expect(
      await checkoutOverviewPage.getSubTotalPriceOnCheckOutOverviewPage()
    ).toBe(`Item total: ${priceOfItem}`);
  });

  test('Checkout can be completed from the checkout overview page and Checkout complete page is displayed correctly', async ({
    page,
    productsListPage,
    yourCartPage,
    yourInformationPage,
    checkoutOverviewPage
  }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await productsListPage.addItemToCart(itemName);
    await productsListPage.clickCartIcon();

    await yourCartPage.clickCheckOutButton();
    await yourInformationPage.fillFirstName('Test');
    await yourInformationPage.fillLastName('User');
    await yourInformationPage.fillPostalCode('12345');
    await yourInformationPage.clickContinueButton();

    await checkoutOverviewPage.clickFinishButton();

    expect(await checkoutCompletePage.pageTitle).toHaveText(
      'Checkout: Complete!'
    );
    expect(await checkoutCompletePage.finishedIcon.isVisible()).toBeTruthy();
    expect(await checkoutCompletePage.completedText).toHaveText(
      'Thank you for your order!'
    );
    expect(
      await checkoutCompletePage.backToHomeButton.isVisible()
    ).toBeTruthy();
  });
});
