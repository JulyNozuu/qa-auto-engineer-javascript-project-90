import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";
import { MainPage } from "./pages/mainPage";
import { UserPage } from "./pages/userPage";

let loginPage;
let mainPage;
let userPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  mainPage = new MainPage(page);
  userPage = new UserPage(page);
});

test("application display", async () => {
  await loginPage.checkLoginForm();
});

test("login", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await loginPage.checkWelcomeText(page);
});

test("negotive - login", async ({ page }) => {
  await loginPage.authorization("", "");
  await loginPage.checkErrorText(page);
  await loginPage.authorization("", pageTexts.password);
  await loginPage.checkErrorText(page);
  await loginPage.authorization(pageTexts.userName, "");
  await loginPage.checkErrorText(page);
});

test("logout", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await loginPage.checkWelcomeText(page);
  await mainPage.goToProfile();
  await mainPage.logout();
  await loginPage.checkLoginForm();
});

test("create user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await userPage.createUser(
    pageTexts.createUserEmail,
    pageTexts.createUserFirstName,
    pageTexts.createUserLastName,
    pageTexts.createUserPassword,
    page
  );
  await userPage.checkCreateUser(page);
  await userPage.clickShowButton();
  await userPage.checkUser(
    pageTexts.createUserEmail,
    pageTexts.createUserFirstName,
    pageTexts.createUserLastName,
    page
  );
  await userPage.checkEditButton();
  await mainPage.goToMenuUsers();
  await userPage.checkUser(
    pageTexts.createUserEmail,
    pageTexts.createUserFirstName,
    pageTexts.createUserLastName,
    page
  );
});

test("user list", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await userPage.checkUsers(page);
});

test("editing form", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await userPage.checkUserCreateForm();
  await userPage.checkSaveDeleteButton();
});

test("edit user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await userPage.editUser(
    pageTexts.editUserEmail,
    pageTexts.editUserFirstName,
    pageTexts.editUserLastName,
    pageTexts.editUserPassword
  );
  await userPage.checkUser(
    pageTexts.editUserEmail,
    pageTexts.editUserFirstName,
    pageTexts.editUserLastName,
    page
  );
});

test("edit user from create form", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await userPage.createUser(
    pageTexts.createUserEmail,
    pageTexts.createUserFirstName,
    pageTexts.createUserLastName,
    pageTexts.createUserPassword,
    page
  );
  await userPage.clickShowButton();
  await userPage.clickEditButton();
  await userPage.editUser(
    pageTexts.editUserEmail,
    pageTexts.editUserFirstName,
    pageTexts.editUserLastName,
    pageTexts.editUserPassword
  );
  await userPage.checkUser(
    pageTexts.editUserEmail,
    pageTexts.editUserFirstName,
    pageTexts.editUserLastName,
    page
  );
});

test("negotive - edit user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await userPage.editUser("", "", "", "");
});

test("delete user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await userPage.deleteUser(userPage.checkUser1);
  await userPage.cancelDeletUser();
  await expect(
    page.getByText(pageTexts.userForDelete1[0], { exact: true })
  ).toBeVisible({
    timeout: 95000,
  });
  await userPage.deleteUser(userPage.checkUser1);
  await expect(
    page.getByText(pageTexts.userForDelete1[0], { exact: true })
  ).not.toBeVisible();
  await userPage.checkUser2.getByRole("checkbox").check();
  await userPage.checkUser3.getByRole("checkbox").check();
  await userPage.createUserDeleteButton.click({
    timeout: 75000,
  });
  await expect(
    page.getByText(pageTexts.userForDelete2[0], { exact: true })
  ).not.toBeVisible();
  await expect(
    page.getByText(pageTexts.userForDelete3[0], { exact: true })
  ).not.toBeVisible();
});

test("delete all user", async () => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await mainPage.goToMenuUsers();
  await userPage.checkAll.getByRole("checkbox").check();
  await expect(userPage.itemSelected).toBeVisible({
    timeout: 95000,
  });
  await userPage.createUserDeleteButton.click({
    timeout: 75000,
  });
  await expect(userPage.noUser).toBeVisible({
    timeout: 95000,
  });
});
