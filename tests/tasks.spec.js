import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage.js";
import { TaskStatatusesPage } from "./pages/taskStatusesPage.js";
import { TasksPage } from "./pages/tasksPage.js";
import pageTexts from "./__fixtures__/pageTexts.js";
import { PersonalAccountPage } from "./pages/personalAccountPage.js";
import {
  inputField,
  checkField,
  click,
  checkFieldByText,
  checkCheckbox,
  checkFieldByTextNotVisible,
  openCard,
  selectOption,
  clickSomewhere,
} from "./func.js";

test("create status item", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.createLabelsButton);
  await checkField(tasksPage.createAssignee);
  await checkField(tasksPage.createTitle);
  await checkField(tasksPage.createContent);
  await checkField(tasksPage.createStatus);
  await checkField(tasksPage.createLabel);
  await click(tasksPage.createAssignee);
  await selectOption(page, pageTexts.assigneeTask);
  await inputField(tasksPage.createTitle, pageTexts.createTasksTitle);
  await inputField(tasksPage.createContent, pageTexts.createTasksContent);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusPublished);
  await click(tasksPage.createLabel);
  await selectOption(page, pageTexts.labelCritical);
  await clickSomewhere(page);
  await click(tasksPage.tasksSave);
  await checkField(tasksPage.successSave);
});

test("tasks list", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await tasksPage.checkTasks(page);
});

test("editing form tasks", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.editTask1);
  await checkField(tasksPage.createAssignee);
  await checkField(tasksPage.createTitle);
  await checkField(tasksPage.createContent);
  await checkField(tasksPage.createStatus);
  await checkField(tasksPage.createLabel);
});

test("edit task", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.editTask1);
  await click(tasksPage.createAssignee);
  await selectOption(page, pageTexts.assigneeTaskEdit);
  await inputField(tasksPage.createTitle, pageTexts.tasksTitleEdit);
  await inputField(tasksPage.createContent, pageTexts.tasksContentEdit);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusDraft);
  await click(tasksPage.createLabel);
  await selectOption(page, pageTexts.labelBug);
  await clickSomewhere(page);
  await click(tasksPage.tasksSave);
  await checkField(tasksPage.successUpdate);
});

test("delete task", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.editTask1);
  await click(tasksPage.deleteButton);
  await click(tasksPage.undoButton);
  await checkField(tasksPage.task1);
  await click(tasksPage.editTask1);
  await click(tasksPage.deleteButton);
  await checkField(tasksPage.successDelete);
  await checkFieldByTextNotVisible(pageTexts.task1, page);
});

test("delete task from show", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.showTask);
  await click(tasksPage.deleteButton);
  await click(tasksPage.undoButton);
  await checkField(tasksPage.task1);
  await click(tasksPage.showTask);
  await click(tasksPage.deleteButton);
  await checkField(tasksPage.successDelete);
  await checkFieldByTextNotVisible(pageTexts.task1, page);
});

test("delete task from create", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.createLabelsButton);
  await checkField(tasksPage.createAssignee);
  await checkField(tasksPage.createTitle);
  await checkField(tasksPage.createContent);
  await checkField(tasksPage.createStatus);
  await checkField(tasksPage.createLabel);
  await click(tasksPage.createAssignee);
  await selectOption(page, pageTexts.assigneeTask);
  await inputField(tasksPage.createTitle, pageTexts.createTasksTitle);
  await inputField(tasksPage.createContent, pageTexts.createTasksContent);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusPublished);
  await click(tasksPage.createLabel);
  await selectOption(page, pageTexts.labelCritical);
  await clickSomewhere(page);
  await click(tasksPage.tasksSave);
  await checkField(tasksPage.successSave);
  await click(tasksPage.deleteButton);
  await checkField(tasksPage.successDelete);
  await checkFieldByTextNotVisible(pageTexts.createTasksTitle, page);
});

test("filter task", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.filterAssignee);
  await selectOption(page, pageTexts.assigneeForFilter);
  await checkField(tasksPage.task6);
  await checkField(tasksPage.task7);
  await tasksPage.valueAssignee;
  await click(tasksPage.valueAssignee);
  await selectOption(page, pageTexts.clearValue);
  await tasksPage.checkTasks(page);
  await click(tasksPage.filterStatus);
  await selectOption(page, pageTexts.statusPublished);
  await checkField(tasksPage.task4);
  await checkField(tasksPage.task10);
  await checkField(tasksPage.task15);
  await click(tasksPage.filterLabel);
  await selectOption(page, pageTexts.labelCritical);
  await checkField(tasksPage.task15);
});

test("sort task", async ({ page }) => {
  await page.goto("http://localhost:5173/#/login");
  const loginPage = new LoginPage(page);
  const personalAccountPage = new PersonalAccountPage(page);
  await inputField(loginPage.userName, pageTexts.userName);
  await inputField(loginPage.password, pageTexts.password);
  await click(loginPage.signIn);
  await click(personalAccountPage.menuTasks);
  const tasksPage = new TasksPage(page);
  await click(tasksPage.editTask1);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusDraft);
  await click(tasksPage.tasksSave);
  await click(tasksPage.editTask2);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusDraft);
  await click(tasksPage.tasksSave);
  await click(tasksPage.editTask3);
  await click(tasksPage.createStatus);
  await selectOption(page, pageTexts.statusDraft);
  await click(tasksPage.tasksSave);
});
