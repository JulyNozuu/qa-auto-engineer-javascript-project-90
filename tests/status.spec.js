import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";
import { TaskStatatusesPage } from "./pages/taskStatusesPage.js";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";

let loginPage;
let personalAccountPage;
let statusPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  personalAccountPage = new PersonalAccountPage(page);
  statusPage = new TaskStatatusesPage(page);
});

test("create status item", async () => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.createStatus(
    pageTexts.createStatusName,
    pageTexts.createStatusSlug
  );
});

test("status list", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.checkStatuses(page);
});

test("editing form status", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await expect(statusPage.createStatusName).toBeVisible({
    timeout: 95000,
  });
  await expect(statusPage.createStatusSlug).toBeVisible({
    timeout: 95000,
  });
  await expect(statusPage.saveDeleteButton).toBeVisible({
    timeout: 95000,
  });
});

test("edit status", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.editStatus(
    1,
    pageTexts.editStatusName,
    pageTexts.editStatusSlug,
    page
  );
});

test("edit status from create", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.createStatus(
    pageTexts.createStatusName,
    pageTexts.createStatusSlug
  );
  await statusPage.editStatusFromShow(
    pageTexts.editStatusName,
    pageTexts.editStatusSlug,
    page
  );
});

test("delete status", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.cancelDeleteStatus(pageTexts.statusForDelete1, page);
  await statusPage.successDeleteStatus(pageTexts.statusForDelete2, page);
});

test("delete all status", async () => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuStatuses();
  await statusPage.allStatusDelete();
});
