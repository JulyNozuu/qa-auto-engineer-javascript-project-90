import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage.js";
import { TasksPage } from "./pages/tasksPage.js";
import pageTexts from "./__fixtures__/pageTexts.js";
import { PersonalAccountPage } from "./pages/personalAccountPage.js";

let loginPage;
let personalAccountPage;
let tasksPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  personalAccountPage = new PersonalAccountPage(page);
  tasksPage = new TasksPage(page);
});

test("create status item", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickCreateTasksButton();
  await tasksPage.checkFieldCreateTask();
  await tasksPage.createTask(
    pageTexts.assigneeTask,
    pageTexts.createTasksTitle,
    pageTexts.createTasksContent,
    pageTexts.statusPublished,
    pageTexts.labelCritical,
    page
  );
});

test("tasks list", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.checkTasksFromList(page);
});

test("editing form tasks", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.checkFieldCreateTask();
});

test("edit task", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.editTask(
    pageTexts.assigneeTask,
    pageTexts.createTasksTitle,
    pageTexts.createTasksContent,
    pageTexts.statusPublished,
    pageTexts.labelCritical,
    page
  );
});

test("delete task", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.cancelDeleteTask(pageTexts.task1);
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.successDeleteTask(pageTexts.task1, page);
});

test("delete task from show", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickShowTasksButton(page, pageTexts.task1);
  await tasksPage.cancelDeleteTask(pageTexts.task1);
  await tasksPage.clickShowTasksButton(page, pageTexts.task1);
  await tasksPage.successDeleteTask(pageTexts.task1, page);
});

test("delete task from create", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickCreateTasksButton();
  await tasksPage.checkFieldCreateTask();
  await tasksPage.createTask(
    pageTexts.assigneeTask,
    pageTexts.createTasksTitle,
    pageTexts.createTasksContent,
    pageTexts.statusPublished,
    pageTexts.labelCritical,
    page
  );
  await tasksPage.successDeleteTask(pageTexts.task1, page);
});

test("filter task", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.filterAssignee.click({
    timeout: 75000,
  });
  await page.getByRole("option", { name: pageTexts.assigneeForFilter }).click({
    timeout: 75000,
  });
  await tasksPage.checkTasks(pageTexts.task6);
  await tasksPage.checkTasks(pageTexts.task7);
  await tasksPage.valueAssignee;
  await tasksPage.valueAssignee.click({
    timeout: 75000,
  });
  await page.getByRole("option", { name: pageTexts.clearValue }).click({
    timeout: 75000,
  });
  await tasksPage.checkTasksFromList(page);
  await tasksPage.filterStatus.click({
    timeout: 75000,
  });
  await page.getByRole("option", { name: pageTexts.statusPublished }).click({
    timeout: 75000,
  });
  await tasksPage.checkTasks(pageTexts.task4);
  await tasksPage.checkTasks(pageTexts.task10);
  await tasksPage.checkTasks(pageTexts.task15);
  await tasksPage.filterLabel.click({
    timeout: 75000,
  });
  await page.getByRole("option", { name: pageTexts.labelCritical }).click({
    timeout: 75000,
  });
  await tasksPage.checkTasks(pageTexts.task15);
});

test("sort task", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.editTask(
    pageTexts.assigneeTask,
    pageTexts.createTasksTitle,
    pageTexts.createTasksContent,
    pageTexts.statusPublished,
    pageTexts.labelCritical,
    page
  );
});
