import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage.js";
import { TasksPage } from "./pages/tasksPage.js";
import pageTexts from "./__fixtures__/pageTexts.js";
import { PersonalAccountPage } from "./pages/personalAccountPage.js";
import { checkField, click, selectOption } from "./func.js";

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
  await tasksPage.checkTasks(page);
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
  await tasksPage.cancelDeleteTask(tasksPage.task1);
  await tasksPage.clickEditTasksButton(page, pageTexts.task1);
  await tasksPage.successDeleteTask(tasksPage.task1, page);
});

test("delete task from show", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
  await tasksPage.clickShowTasksButton(page, pageTexts.task1);
  await tasksPage.cancelDeleteTask(tasksPage.task1);
  await tasksPage.clickShowTasksButton(page, pageTexts.task1);
  await tasksPage.successDeleteTask(tasksPage.task1, page);
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
  await tasksPage.successDeleteTask(tasksPage.task1, page);
});

test("filter task", async ({ page }) => {
  await loginPage.authorization(pageTexts.userName, pageTexts.password);
  await personalAccountPage.goToMenuTasks();
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
