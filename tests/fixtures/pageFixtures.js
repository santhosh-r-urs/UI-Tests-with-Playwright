import { test as base } from '@playwright/test';
import { ProductsListPage } from '../pages/saucedemo/productsListPage';
import { YourCartPage } from '../pages/saucedemo/yourCartPage';
import { YourInformationPage } from '../pages/saucedemo/yourInformationPage';
import { CheckoutOverviewPage } from '../pages/saucedemo/checkoutOverviewPage';

export const test = base.extend({
    productsListPage: async ({ page }, use) => {
        const productsListPage = new ProductsListPage(page);
        await use(productsListPage);
    },
    yourCartPage: async ({ page }, use) => {
        const yourCartPage = new YourCartPage(page);
        await use(yourCartPage);
    },
    yourInformationPage: async ({ page }, use) => {
        const yourInformationPage = new YourInformationPage(page);
        await use(yourInformationPage);
    },
    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    }
});

export { expect } from '@playwright/test';