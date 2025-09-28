import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";
import { UserPage } from "./pages/userPage";
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  openCard,
  checkFieldByTextNotVisible,
} from "./func.js";

test("application display", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await checkField(loginPage.userName);
  await checkField(loginPage.password);
  await checkField(loginPage.signIn);
});

test("login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await checkFieldByText(pageTexts.welcomeTextPersonalAccountPage, page);
});

test("negotive - login", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  await inputField(loginPage.userName, "");
  await inputField(loginPage.password, "");
  await click(loginPage.signIn);
  await checkFieldByText(pageTexts.errorTextLoginPage, page);
  await inputField(loginPage.userName, "");
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await checkFieldByText(pageTexts.errorTextLoginPage, page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, "");
  await click(loginPage.signIn);
  await checkFieldByText(pageTexts.errorTextLoginPage, page);
});

test("logout", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await checkFieldByText(pageTexts.welcomeTextPersonalAccountPage, page);
  await click(personalAccountPage.profile);
  await click(personalAccountPage.logout);
  await checkField(loginPage.userName);
  await checkField(loginPage.password);
  await checkField(loginPage.signIn);
});

test("create user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuUsers);
  await click(userPage.createUserButton);
  await inputField(userPage.userEmail, pageTexts.createUserEmail);
  await inputField(userPage.userFirstName, pageTexts.createUserFirstName);
  await inputField(userPage.userLastName, pageTexts.createUserLastName);
  await inputField(userPage.userPassword, pageTexts.createUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(pageTexts.createUserTextSuccess, page);
  await checkFieldByText(pageTexts.createUserShow, page);
  await checkField(userPage.createUserDeleteButton);
  await click(userPage.createUserShow);
  await checkFieldByText(pageTexts.createUserEmail, page);
  await checkFieldByText(pageTexts.createUserFirstName, page);
  await checkFieldByText(pageTexts.createUserLastName, page);
  await checkField(userPage.createUserEditButton);
  await click(personalAccountPage.menuUsers);
  await checkFieldByText(pageTexts.createUserEmail, page);
  await checkFieldByText(pageTexts.createUserFirstName, page);
  await checkFieldByText(pageTexts.createUserLastName, page);
});

test("user list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuUsers);
  await userPage.checkUsers(page);
});

test("editing form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personalAccountPage.menuUsers);
  await openCard(page, "1");
  await checkField(userPage.userEmail);
  await checkField(userPage.userFirstName);
  await checkField(userPage.userLastName);
  await checkField(userPage.userPassword);
  await checkField(userPage.saveDeleteButton);
});

test("edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personalAccountPage.menuUsers);
  await openCard(page, "1");
  await inputField(userPage.userEmail, pageTexts.editUserEmail);
  await inputField(userPage.userFirstName, pageTexts.editUserFirstName);
  await inputField(userPage.userLastName, pageTexts.editUserLastName);
  await inputField(userPage.userPassword, pageTexts.editUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(pageTexts.editUserEmail, page);
  await checkFieldByText(pageTexts.editUserFirstName, page);
  await checkFieldByText(pageTexts.editUserLastName, page);
});

test("edit user from create form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuUsers);
  await click(userPage.createUserButton);
  await inputField(userPage.userEmail, pageTexts.createUserEmail);
  await inputField(userPage.userFirstName, pageTexts.createUserFirstName);
  await inputField(userPage.userLastName, pageTexts.createUserLastName);
  await inputField(userPage.userPassword, pageTexts.createUserPassword);
  await click(userPage.saveButton);
  await click(userPage.createUserShow);
  await click(userPage.createUserEditButton);
  await inputField(userPage.userEmail, pageTexts.editUserEmail);
  await inputField(userPage.userFirstName, pageTexts.editUserFirstName);
  await inputField(userPage.userLastName, pageTexts.editUserLastName);
  await inputField(userPage.userPassword, pageTexts.editUserPassword);
  await click(userPage.saveButton);
  await checkFieldByText(pageTexts.editUserEmail, page);
  await checkFieldByText(pageTexts.editUserFirstName, page);
  await checkFieldByText(pageTexts.editUserLastName, page);
});

test("negotive - edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personalAccountPage.menuUsers);
  await openCard(page, "1");
  await inputField(userPage.userEmail, "");
  await inputField(userPage.userFirstName, "");
  await inputField(userPage.userLastName, "");
  await inputField(userPage.userPassword, "");
  await click(userPage.saveButton);
});

test("delete user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personalAccountPage.menuUsers);
  await checkCheckbox(userPage.checkUser1);
  await click(userPage.createUserDeleteButton);
  await click(userPage.undoButtonUser);
  await checkFieldByText(pageTexts.userForDelete1[0], page);
  await checkCheckbox(userPage.checkUser1);
  await click(userPage.createUserDeleteButton);
  await checkFieldByTextNotVisible(pageTexts.userForDelete1[0], page);
  await checkCheckbox(userPage.checkUser2);
  await checkCheckbox(userPage.checkUser3);
  await click(userPage.createUserDeleteButton);
  await checkFieldByTextNotVisible(pageTexts.userForDelete2[0], page);
  await checkFieldByTextNotVisible(pageTexts.userForDelete3[0], page);
});

test("delete all user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  const userPage = new UserPage(page);
  await click(personalAccountPage.menuUsers);
  await checkCheckbox(userPage.checkAll);
  await checkField(userPage.itemSelected);
  await click(userPage.createUserDeleteButton);
  await checkField(userPage.noUser);
});
