import {expect} from '@playwright/test';

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]')
        this.finishButton = page.locator('[data-test="finish"]');   
    }

    async getPriceOnCheckOutOverviewPage(itemName) {
        const priceLocator = await this.page.locator(`//*[@data-test='inventory-item-name' and text()='${itemName}']/following::div[@class='inventory_item_price']`).first();
        const priceOnYourCartPage = await priceLocator.textContent();
        return priceOnYourCartPage;
    }
    
    async getSubTotalPriceOnCheckOutOverviewPage() {
        const subTotalLocator = await this.page.locator('[data-test="subtotal-label"]');
        const subTotalPrice = await subTotalLocator.textContent();
        return subTotalPrice;
    }  

    async clickFinishButton() { 
        await this.finishButton.click();
    }

}