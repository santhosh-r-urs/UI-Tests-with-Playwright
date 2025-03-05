export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.finishedIcon = page.locator('[data-test="pony-express"]');
    this.completedText = page.locator('[data-test="complete-header"]');
    this.backToHomeButton = page.locator('[data-test="back-to-products"]');
  }
}
