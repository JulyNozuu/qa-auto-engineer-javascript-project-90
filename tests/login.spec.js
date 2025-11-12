import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
});

test("application display", async () => {
  await loginPage.navigateToLoginPage()
  await loginPage.checkLoginForm();
});

test("login", async ({ page }) => {
  await loginPage.navigateToLoginPage()
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await loginPage.checkWelcomeText(page);
});

test("negotive - login", async ({ page }) => {
  await loginPage.navigateToLoginPage()
  await loginPage.authorization("", "");
  await loginPage.checkErrorText(page);
  await loginPage.authorization("", pageTexts.password);
  await loginPage.checkErrorText(page);
  await loginPage.authorization(pageTexts.userName, "");
  await loginPage.checkErrorText(page);
});
