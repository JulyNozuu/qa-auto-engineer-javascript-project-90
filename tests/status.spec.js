import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { TaskStatatusesPage } from "./pages/taskStatusesPage";
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

test("create status item", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await click(statusPage.createStatusButton);
  await checkField(statusPage.createStatusName);
  await checkField(statusPage.createStatusSlug);
  await inputField(statusPage.createStatusName, pageTexts.createStatusName);
  await inputField(statusPage.createStatusName, pageTexts.createStatusSlug);
  await click(statusPage.statusSave);
  await checkField(statusPage.successSave);
});

test("status list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await statusPage.checkStatuses(page);
});

test("editing form status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await openCard(page, "1");
  await checkField(statusPage.createStatusName);
  await checkField(statusPage.createStatusSlug);
  await checkField(statusPage.saveDeleteButton);
});

test("edit status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await openCard(page, "1");
  await inputField(statusPage.createStatusName, pageTexts.editStatusName);
  await inputField(statusPage.createStatusSlug, pageTexts.editStatusSlug);
  await click(statusPage.statusSave);
  await checkFieldByText(pageTexts.editStatusName, page);
  await checkFieldByText(pageTexts.editStatusSlug, page);
});

test("edit status from create", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await click(statusPage.createStatusButton);
  await inputField(statusPage.createStatusName, pageTexts.createStatusName);
  await inputField(statusPage.createStatusSlug, pageTexts.createStatusSlug);
  await click(statusPage.statusSave);
  await click(statusPage.showButtonStatusCreate);
  await click(statusPage.editButton);
  await inputField(statusPage.createStatusName, pageTexts.editStatusName);
  await inputField(statusPage.createStatusSlug, pageTexts.editStatusSlug);
  await click(statusPage.statusSave);
  await checkFieldByText(pageTexts.editStatusName, page);
  await checkFieldByText(pageTexts.editStatusSlug, page);
});

test("delete status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await checkCheckbox(statusPage.checkStatus1);
  await click(statusPage.deleteButton);
  await click(statusPage.undoButton);
  await checkFieldByText(pageTexts.statusForDelete1[0], page);
  await checkCheckbox(statusPage.checkStatus2);
  await checkCheckbox(statusPage.checkStatus3);
  await click(statusPage.deleteButton);
  await checkFieldByTextNotVisible(pageTexts.statusForDelete2[0], page);
  await checkFieldByTextNotVisible(pageTexts.statusForDelete3[0], page);
});

test("delete all status", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await personalAccountPage.clickMenuItem();
  const statusPage = new TaskStatatusesPage(page);
  await checkCheckbox(statusPage.checkAll);
  await checkField(statusPage.itemSelected);
  await click(statusPage.deleteButton);
  await checkField(statusPage.noTaskStatus);
});
