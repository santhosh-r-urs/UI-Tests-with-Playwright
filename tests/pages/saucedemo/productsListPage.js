export class ProductsListPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartIconBadge = page.locator('[data-test="shopping-cart-badge"]');   
    }

    async addItemToCart(itemName, page) {
        await page.locator(`//*[@data-test='inventory-item-name' and text() = '${itemName}']/following::button[text() = 'Add to cart']`).first().click();
    }

    async capturePriceOfItem(itemName, page) {
        const priceLocator = await page.locator(`//*[@data-test='inventory-item-name' and text()='${itemName}']/following::div[@class='inventory_item_price']`).first();
        const price = await priceLocator.textContent();
        console.log(price);
        return price;
    }

    async clickCartIcon() { 
        await this.cartIcon.click();
    }

    async getCartIconBadgeCount() {
        this.cartIconBadgeCount = await this.cartIconBadge.textContent();
        return this.cartIconBadgeCount;
    }
}