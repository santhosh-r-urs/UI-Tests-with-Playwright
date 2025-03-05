import {expect} from '@playwright/test';

export class YourCartPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]')
        this.priceOnYourCartPage = page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');   
    }

    async getPriceOnYourCartPage(itemName) {
        const priceLocator = await this.page.locator(`//*[@data-test='inventory-item-name' and text()='${itemName}']/following::div[@class='inventory_item_price']`).first();
        const priceOnYourCartPage = await priceLocator.textContent();
        return priceOnYourCartPage;
    }

    async clickCheckOutButton() { 
        await this.checkoutButton.click();
    }

    async goToYourCartPage() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

}