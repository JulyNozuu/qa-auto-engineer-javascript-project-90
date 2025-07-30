// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";

test.only("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/#/login");
  const loginPage = new LoginPage(page);
  await loginPage.checkUserNameField();
  await loginPage.checkPasswordField();
  await loginPage.checkSignIn();
});
