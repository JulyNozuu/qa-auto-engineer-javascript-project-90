import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";
import { LabelsPage } from "./pages/LabelsPage.js";
import pageTexts from "./__fixtures__/pageTexts.js";

let loginPage;
let labelsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  labelsPage = new LabelsPage(page);
});

test("create labels", async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.createLabels(pageTexts.createLabelsName);
});

test("labels list", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.checkLabels(page);
});

test("editing form labels", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await page.getByRole("cell", { name: 1, exact: true }).click();
  await expect(labelsPage.createLabelsName).toBeVisible({
    timeout: 95000,
  });
  await expect(labelsPage.saveDeleteButton).toBeVisible({
    timeout: 95000,
  });
});

test("edit labels", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.editLabelsFromList(1, pageTexts.editLabelsName, page);
});

test("edit labels from create", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.createLabels(pageTexts.createLabelsName);
  await labelsPage.editLabelsFromShow(pageTexts.editLabelsName, page);
});

test("delete labels", async ({ page }) => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.cancelDeleteLabel(pageTexts.labelsForDelete1, page);
  await labelsPage.successDeleteLabel(pageTexts.labelsForDelete2, page);
});

test("delete all labels", async () => {
  await loginPage.navigateToLoginPage();
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await labelsPage.navigateToLabelPage();
  await labelsPage.allLabelsDelete();
});
