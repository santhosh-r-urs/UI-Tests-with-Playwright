import { test, expect } from './fixtures/pageFixtures';
import { LoginPage } from './pages/saucedemo/loginPage';
import { CheckoutCompletePage } from './pages/saucedemo/checkoutCompletePage';

const itemName = 'Sauce Labs Fleece Jacket';
let priceOfItem;

// Not using storage state in this test, completing one full end to end flow from login to checkout complete
test.use({ storageState: { cookies: [], origins: [] } });

test('Login to Saucedemo and complete checkout', async ({
  page,
  productsListPage,
  yourCartPage,
  yourInformationPage,
  checkoutOverviewPage
}) => {
  const loginPage = new LoginPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  const firstName = 'Test';
  const lastName = 'User';
  const postalCode = '12345';

  await loginPage.goToSaucedemoPage();
  await loginPage.pageHeaderIsVisible();
  await loginPage.login();

  priceOfItem = await productsListPage.capturePriceOfItem(itemName);

  await productsListPage.addItemToCart(itemName);
  expect(await productsListPage.cartIconBadge).toBeVisible();
  expect(await productsListPage.getCartIconBadgeCount()).toBe('1');
  await productsListPage.clickCartIcon();
  expect(await yourCartPage.pageTitle).toHaveText('Your Cart');

  expect(await yourCartPage.getPriceOnYourCartPage(itemName)).toBe(priceOfItem);

  await yourCartPage.clickCheckOutButton();

  expect(await yourInformationPage.pageTitle).toHaveText(
    'Checkout: Your Information'
  );
  await yourInformationPage.fillFirstName(firstName);
  await yourInformationPage.fillLastName(lastName);
  await yourInformationPage.fillPostalCode(postalCode);
  await yourInformationPage.clickContinueButton();

  expect(await checkoutOverviewPage.pageTitle).toHaveText('Checkout: Overview');
  expect(
    await checkoutOverviewPage.getPriceOnCheckOutOverviewPage(itemName)
  ).toBe(priceOfItem);
  expect(
    await checkoutOverviewPage.getSubTotalPriceOnCheckOutOverviewPage()
  ).toBe(`Item total: ${priceOfItem}`);

  await checkoutOverviewPage.clickFinishButton();

  expect(await checkoutCompletePage.pageTitle).toHaveText(
    'Checkout: Complete!'
  );
  expect(await checkoutCompletePage.finishedIcon.isVisible()).toBeTruthy();
  expect(await checkoutCompletePage.completedText).toHaveText(
    'Thank you for your order!'
  );
  expect(await checkoutCompletePage.backToHomeButton.isVisible()).toBeTruthy();
});
