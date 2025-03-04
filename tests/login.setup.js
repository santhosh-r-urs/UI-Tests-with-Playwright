import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/saucedemo/loginPage';
import path from 'path';

const authFile = path.join(process.cwd(),'./playwright/.auth/standard_user.json');

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  loginPage.goToSaucedemoPage();
  loginPage.login();

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
   
  await page.context().storageState({ path: authFile });
});