import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage.js";
import pageTexts from "./__fixtures__/pageTexts";
import { MainPage } from "./pages/mainPage.js";

let loginPage;
let mainPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  mainPage = new MainPage(page);
});

test("logout", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await loginPage.checkWelcomeText(page);
  await mainPage.goToProfile();
  await mainPage.logout();
  await loginPage.checkLoginForm();
});
