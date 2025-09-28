import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { TaskStatatusesPage } from "./pages/taskStatusesPage";
import { LabelsPage } from "./pages/labelsPage";
import pageTexts from "./__fixtures__/pageTexts";
import { PersonalAccountPage } from "./pages/personalAccountPage";
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  checkFieldByTextNotVisible,
  openCard,
} from "./func.js";

test("create labels", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await click(labelsPage.createLabelsButton);
  await checkField(labelsPage.createLabelsName);
  await inputField(labelsPage.createLabelsName, pageTexts.createLabelsName);
  await click(labelsPage.statusSave);
  await checkField(labelsPage.successSave);
});

test("labels list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await labelsPage.checkLabels(page);
});

test("editing form labels", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await openCard(page, "1");
  await checkField(labelsPage.createLabelsName);
  await checkField(labelsPage.saveDeleteButton);
});

test("edit labels", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await openCard(page, "1");
  await inputField(labelsPage.createLabelsName, pageTexts.editLabelsName);
  await click(labelsPage.statusSave);
  await checkFieldByText(pageTexts.editLabelsName, page);
});

test("edit labels from create", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await click(labelsPage.createLabelsButton);
  await checkField(labelsPage.createLabelsName);
  await inputField(labelsPage.createLabelsName, pageTexts.createLabelsName);
  await click(labelsPage.statusSave);
  await click(labelsPage.showButtonStatusCreate);
  await click(labelsPage.editButton);
  await inputField(labelsPage.createLabelsName, pageTexts.editLabelsName);
  await click(labelsPage.statusSave);
  await checkFieldByText(pageTexts.editLabelsName, page);
});

test("delete labels", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await checkCheckbox(labelsPage.checkLabels1);
  await click(labelsPage.deleteButton);
  await click(labelsPage.undoButton);
  await checkFieldByText(pageTexts.labelsForDelete1[0], page);
  await checkCheckbox(labelsPage.checkLabels2);
  await checkCheckbox(labelsPage.checkLabels3);
  await click(labelsPage.deleteButton);
  await checkFieldByTextNotVisible(pageTexts.labelsForDelete2[0], page);
  await checkFieldByTextNotVisible(pageTexts.labelsForDelete3[0], page);
});

test("delete all labels", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuLabels);
  const labelsPage = new LabelsPage(page);
  await checkCheckbox(labelsPage.checkAll);
  await checkField(labelsPage.labelSelected);
  await click(labelsPage.deleteButton);
  await checkField(labelsPage.noLabelsStatus);
});
