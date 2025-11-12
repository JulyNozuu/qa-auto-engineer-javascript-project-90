import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage.js";
import { StatatusesPage } from "./pages/StatusesPage.js";
import pageTexts from "./__fixtures__/pageTexts";

let loginPage;
let statusesePage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  statusesePage = new StatatusesPage(page);
});

test("create status item", async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.createStatus(
    pageTexts.createStatusName,
    pageTexts.createStatusSlug
  );
});

test("status list", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.checkStatuses(page);
});

test("editing form status", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await expect(statusesePage.createStatusName).toBeVisible({
    timeout: 95000,
  });
  await expect(statusesePage.createStatusSlug).toBeVisible({
    timeout: 95000,
  });
  await expect(statusesePage.saveDeleteButton).toBeVisible({
    timeout: 95000,
  });
});

test("edit status", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.editStatus(
    1,
    pageTexts.editStatusName,
    pageTexts.editStatusSlug,
    page
  );
});

test("edit status from create", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.createStatus(
    pageTexts.createStatusName,
    pageTexts.createStatusSlug
  );
  await statusesePage.editStatusFromShow(
    pageTexts.editStatusName,
    pageTexts.editStatusSlug,
    page
  );
});

test("delete status", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.cancelDeleteStatus(pageTexts.statusForDelete1, page);
  await statusesePage.successDeleteStatus(pageTexts.statusForDelete2, page);
});

test("delete all status", async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await statusesePage.navigateToStatusesPage();
  await statusesePage.allStatusDelete();
});
