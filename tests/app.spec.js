// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";

test("application display", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await loginPage.checkUserNameField();
  await loginPage.checkPasswordField();
  await loginPage.checkSignIn();
});

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await personalAccountPage.checkWelcomText();
});

test("negotive - login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await loginPage.checkErrorText();
  await loginPage.inputPasswordField("");
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await loginPage.checkErrorText();
  await loginPage.inputPasswordField("");
  await loginPage.clickSignInButton();
  await loginPage.checkErrorText();
});

test("logout", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await personalAccountPage.checkWelcomText();
  await personalAccountPage.clickProfile();
  await personalAccountPage.clickLogout();
  await loginPage.checkUserNameField();
  await loginPage.checkPasswordField();
  await loginPage.checkSignIn();
});
