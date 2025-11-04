import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";
import { UserPage } from "./pages/userPage";
import {
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  openCard,
  checkFieldByTextNotVisible,
} from "./func.js";
let loginPage;
let personalAccountPage;
let userPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  personalAccountPage = new PersonalAccountPage(page);
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
  await personalAccountPage.goToProfile();
  await personalAccountPage.logout();
  await loginPage.checkLoginForm();
});

test("create user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
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
  await personalAccountPage.goToMenuUsers();
  await userPage.checkUser(
    pageTexts.createUserEmail,
    pageTexts.createUserFirstName,
    pageTexts.createUserLastName,
    page
  );
});

test("user list", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
  await userPage.checkUsers(page);
});

test("editing form", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
  await openCard(page, "1");
  await userPage.checkUserCreateForm();
  await userPage.checkSaveDeleteButton();
});

test("edit user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
  await openCard(page, "1");
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
  await personalAccountPage.goToMenuUsers();
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
  await personalAccountPage.goToMenuUsers();
  await openCard(page, "1");
  await userPage.editUser("", "", "", "");
});

test("delete user", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
  await userPage.deleteUser(userPage.checkUser1);
  await userPage.cancelDeletUser();
  await checkFieldByText(pageTexts.userForDelete1[0], page);
  await userPage.deleteUser(userPage.checkUser1);
  await checkFieldByTextNotVisible(pageTexts.userForDelete1[0], page);
  await checkCheckbox(userPage.checkUser2);
  await checkCheckbox(userPage.checkUser3);
  await click(userPage.createUserDeleteButton);
  await checkFieldByTextNotVisible(pageTexts.userForDelete2[0], page);
  await checkFieldByTextNotVisible(pageTexts.userForDelete3[0], page);
});

test("delete all user", async () => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuUsers();
  await checkCheckbox(userPage.checkAll);
  await checkField(userPage.itemSelected);
  await click(userPage.createUserDeleteButton);
  await checkField(userPage.noUser);
});
