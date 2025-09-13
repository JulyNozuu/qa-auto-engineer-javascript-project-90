// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";
import { UserPage } from "./pages/userPge";

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

test("create user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await personalAccountPage.clickMenuUsers();
  await userPage.createUserButtonClick();
  await userPage.inputUserEmail(pageTexts.createUserEmail);
  await userPage.inputUserFirstName(pageTexts.createUserFirstName);
  await userPage.inputUserLastName(pageTexts.createUserLastName);
  await userPage.inputUserPassword(pageTexts.createUserPassword);
  await userPage.clickSaveButton();
  await userPage.checkCreateUserSuccess();
  await userPage.checkCreateUserShow();
  await userPage.checkCreateUserDeleteButton();
  await userPage.createUserShowClick();
  await expect(
    page.getByText(pageTexts.createUserEmail, { exact: true })
  ).toBeVisible();
  await expect(
    page.getByText(pageTexts.createUserFirstName, { exact: true })
  ).toBeVisible();
  await expect(page.getByText(pageTexts.createUserLastName)).toBeVisible();
  await userPage.checkCreateUserEditButton();
  await personalAccountPage.clickMenuUsers();
  await expect(page.getByText(pageTexts.createUserEmail)).toBeVisible();
  await expect(
    page.getByText(pageTexts.createUserFirstName, { exact: true })
  ).toBeVisible();
  await expect(page.getByText(pageTexts.createUserLastName)).toBeVisible();
});

test("user list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await personalAccountPage.clickMenuUsers();
  await userPage.checkUsers(page);
});

test("editing form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  const userPage = new UserPage(page);
  await personalAccountPage.clickMenuUsers();
  await userPage.openCardUser(page, "1");
  await userPage.checkUserEmail();
  await userPage.checkUserFirstName();
  await userPage.checkUserLastName();
  await userPage.checkUserPassword();
  await userPage.checkSaveDeleteButton();
});

test("edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  const userPage = new UserPage(page);
  await personalAccountPage.clickMenuUsers();
  await userPage.openCardUser(page, "1");
  await userPage.inputUserEmail(pageTexts.editUserEmail);
  await userPage.inputUserFirstName(pageTexts.editUserFirstName);
  await userPage.inputUserLastName(pageTexts.editUserLastName);
  await userPage.inputUserPassword(pageTexts.editUserPassword);
  await userPage.clickSaveButton();
  await userPage.checkFieldByText(pageTexts.editUserEmail, page);
  await userPage.checkFieldByText(pageTexts.editUserFirstName, page);
  await userPage.checkFieldByText(pageTexts.editUserLastName, page);
});

test("edit user from create form", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  const userPage = new UserPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  await personalAccountPage.clickMenuUsers();
  await userPage.createUserButtonClick();
  await userPage.inputUserEmail(pageTexts.createUserEmail);
  await userPage.inputUserFirstName(pageTexts.createUserFirstName);
  await userPage.inputUserLastName(pageTexts.createUserLastName);
  await userPage.inputUserPassword(pageTexts.createUserPassword);
  await userPage.clickSaveButton();
  await userPage.inputUserEmail(pageTexts.editUserEmail);
  await userPage.inputUserFirstName(pageTexts.editUserFirstName);
  await userPage.inputUserLastName(pageTexts.editUserLastName);
  await userPage.inputUserPassword(pageTexts.editUserPassword);
  await userPage.clickSaveButton();
  await userPage.checkFieldByText(pageTexts.editUserEmail, page);
  await userPage.checkFieldByText(pageTexts.editUserFirstName, page);
  await userPage.checkFieldByText(pageTexts.editUserLastName, page);
});

test("negotive - edit user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  const userPage = new UserPage(page);
  await personalAccountPage.clickMenuUsers();
  await userPage.openCardUser(page, "1");
  await userPage.inputUserEmail("");
  await userPage.inputUserFirstName("");
  await userPage.inputUserLastName("");
  await userPage.inputUserPassword("");
  await userPage.clickSaveButton();
});

test("delete user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  const userPage = new UserPage(page);
  await personalAccountPage.clickMenuUsers();
  await page
    .getByRole("row", { name: "Select this row 1 john@google" })
    .getByRole("checkbox")
    .check();
  await page.getByLabel("Delete").click();
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(
    page.getByRole("cell", { name: "1", exact: true })
  ).toBeVisible();
  await page
    .getByRole("row", { name: "Select this row 1 john@google" })
    .getByRole("checkbox")
    .check();
  await page.getByLabel("Delete").click();
  await expect(
    page.getByRole("cell", { name: "1", exact: true })
  ).not.toBeVisible();
  await page
    .getByRole("row", { name: "Select this row 2 jack@yahoo." })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("row", { name: "Select this row 3 jane@gmail." })
    .getByRole("checkbox")
    .check();
  await page.getByLabel("Delete").click();
  await expect(
    page.getByRole("cell", { name: "2", exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByRole("cell", { name: "3", exact: true })
  ).not.toBeVisible();
});

test("delete all user", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await loginPage.inputUserNameField(pageTexts.userName);
  await loginPage.inputPasswordField(pageTexts.password);
  await loginPage.clickSignInButton();
  const userPage = new UserPage(page);
  await personalAccountPage.clickMenuUsers();
  await page.getByLabel("Select all").getByRole("checkbox").check();
  await expect(
    page.getByRole("heading", { name: "items selected" })
  ).toBeVisible();
  await page.getByLabel("Delete").click();
  await expect(page.getByText("No User yet.")).toBeVisible();
});
