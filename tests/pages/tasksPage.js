import { expect } from "@playwright/test";
import tasks from "../__fixtures__/tasks";
import pageTexts from "../__fixtures__/pageTexts";

export class TasksPage {
  constructor(page) {
    this.page = page;
    this.createLabelsButton = this.page.getByLabel("Create", { exact: true });
    this.createAssignee = this.page.getByLabel("Assignee", { exact: true });
    this.createTitle = this.page.getByLabel("Title", { exact: true });
    this.createContent = this.page.getByLabel("Content", { exact: true });
    this.createStatus = this.page.getByLabel("Status");
    this.createLabel = this.page.getByLabel("Label");
    this.tasksSave = this.page.getByLabel("Save");
    this.successSave = this.page.getByText("Element created");
    this.successUpdate = this.page.getByText("Element updated");
    this.successDelete = this.page.getByText("Element deleted");
    this.filterAssignee = this.page.getByRole("combobox", {
      name: "Assignee",
    });
    this.filterStatus = this.page.getByRole("combobox", { name: "Status" });
    this.filterLabel = this.page.getByRole("combobox", { name: "Label" });
    this.deleteButton = this.page.getByLabel("Delete");
    this.undoButton = this.page.getByRole("button", { name: "Undo" });
    this.valueAssignee = this.page.getByRole("combobox", {
      name: pageTexts.valueAssignee,
    });
    this.сlearValue = this.page.getByRole("option", {
      name: pageTexts.clearValue,
    });
  }

  async checkTasksFromList(page) {
    for (const task of tasks) {
      await expect(page.getByRole("button", { name: task.name })).toBeVisible();
    }
  }

  async clickCreateTasksButton() {
    await this.createLabelsButton.click({
      timeout: 75000,
    });
  }

  async checkFieldCreateTask() {
    await expect(this.createAssignee).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createTitle).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createContent).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createStatus).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createLabel).toBeVisible({
      timeout: 95000,
    });
  }

  async createTask(assignee, title, content, status, label, page) {
    await this.createAssignee.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: assignee }).click({
      timeout: 75000,
    });
    await this.createTitle.fill(title);
    await this.createContent.fill(content);
    await this.createStatus.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: status }).click({
      timeout: 75000,
    });
    await this.createLabel.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: label }).click({
      timeout: 75000,
    });
    await page.locator("#menu-label_id div").first().click();
    await this.tasksSave.click({
      timeout: 75000,
    });
    await expect(this.successSave).toBeVisible({
      timeout: 95000,
    });
  }

  async clickEditTasksButton(page, task) {
    await page.getByRole("button", { name: task }).getByLabel("Edit").click({
      timeout: 75000,
    });
  }

  async clickShowTasksButton(page, task) {
    await page.getByRole("button", { name: task }).getByLabel("Show").click({
      timeout: 75000,
    });
  }

  async clickTasksButton(page, task) {
    await page.getByRole("button", { name: task }).getByLabel("Edit").click({
      timeout: 75000,
    });
  }

  async editTask(assignee, title, content, status, label, page) {
    await this.createAssignee.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: assignee }).click({
      timeout: 75000,
    });
    await this.createTitle.fill(title);
    await this.createContent.fill(content);
    await this.createStatus.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: status }).click({
      timeout: 75000,
    });
    await this.createLabel.click({
      timeout: 75000,
    });
    await page.getByRole("option", { name: label }).click({
      timeout: 75000,
    });
    await page.locator("#menu-label_id div").first().click();
    await this.tasksSave.click({
      timeout: 75000,
    });
    await expect(this.successUpdate).toBeVisible({
      timeout: 95000,
    });
  }

  async cancelDeleteTask(task) {
    await this.deleteButton.click({
      timeout: 75000,
    });
    await this.undoButton.click({
      timeout: 75000,
    });
    await expect(
      this.page.getByRole("button", {
        name: task,
      })
    ).toBeVisible({
      timeout: 95000,
    });
  }

  async successDeleteTask(task, page) {
    await this.deleteButton.click({
      timeout: 75000,
    });
    await expect(this.successDelete).toBeVisible({
      timeout: 95000,
    });
    await expect(page.getByText(task, { exact: true })).not.toBeVisible();
  }

  async checkTasks(taskText, timeout = 95000) {
    await expect(this.page.getByRole("button", { name: taskText })).toBeVisible(
      { timeout }
    );
  }
}
