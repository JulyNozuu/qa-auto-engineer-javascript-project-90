// pages/tasksPage.js
import { expect } from "@playwright/test";
import tasks from "../__fixtures__/tasks";
import pageTexts from "../__fixtures__/pageTexts";

import {
  inputField,
  checkField,
  click,
  checkFieldByTextNotVisible,
  selectOption,
  clickSomewhere,
} from "../func.js";

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
    this.editTask1 = this.page
      .getByRole("button", { name: pageTexts.task1 })
      .getByLabel("Edit");

    this.editTask2 = this.page
      .getByRole("button", { name: pageTexts.task2 })
      .getByLabel("Edit");

    this.editTask3 = this.page
      .getByRole("button", { name: pageTexts.task3 })
      .getByLabel("Edit");

    this.showTask1 = this.page
      .getByRole("button", { name: pageTexts.task1 })
      .getByLabel("Show");

    this.task1 = this.page.getByRole("button", {
      name: pageTexts.task1,
    });

    this.task6 = this.page.getByRole("button", {
      name: pageTexts.task6,
    });
    this.task7 = this.page.getByRole("button", {
      name: pageTexts.task7,
    });
    this.task4 = this.page.getByRole("button", {
      name: pageTexts.task4,
    });
    this.task10 = this.page.getByRole("button", {
      name: pageTexts.task10,
    });
    this.task15 = this.page.getByRole("button", {
      name: pageTexts.task15,
    });
    this.deleteButton = this.page.getByLabel("Delete");
    this.undoButton = this.page.getByRole("button", { name: "Undo" });
    this.valueAssignee = this.page.getByRole("combobox", {
      name: pageTexts.valueAssignee,
    });
    this.сlearValue = this.page.getByRole("option", {
      name: pageTexts.clearValue,
    });
  }

  async checkTasks(page) {
    for (const task of tasks) {
      await expect(page.getByRole("button", { name: task.name })).toBeVisible();
    }
  }

  async clickCreateTasksButton() {
    await click(this.createLabelsButton);
  }

  async checkFieldCreateTask() {
    await checkField(this.createAssignee);
    await checkField(this.createTitle);
    await checkField(this.createContent);
    await checkField(this.createStatus);
    await checkField(this.createLabel);
  }

  async createTask(assignee, title, content, status, label, page) {
    await click(this.createAssignee);
    await selectOption(page, assignee);
    await inputField(this.createTitle, title);
    await inputField(this.createContent, content);
    await click(this.createStatus);
    await selectOption(page, status);
    await click(this.createLabel);
    await selectOption(page, label);
    await clickSomewhere(page);
    await click(this.tasksSave);
    await checkField(this.successSave);
  }

  async clickEditTasksButton(page, task) {
    await click(page.getByRole("button", { name: task }).getByLabel("Edit"));
  }

  async clickShowTasksButton(page, task) {
    await click(page.getByRole("button", { name: task }).getByLabel("Show"));
  }

  async clickTasksButton(page, task) {
    await click(page.getByRole("button", { name: task }).getByLabel("Edit"));
  }

  async editTask(assignee, title, content, status, label, page) {
    await click(this.createAssignee);
    await selectOption(page, assignee);
    await inputField(this.createTitle, title);
    await inputField(this.createContent, content);
    await click(this.createStatus);
    await selectOption(page, status);
    await click(this.createLabel);
    await selectOption(page, label);
    await clickSomewhere(page);
    await click(this.tasksSave);
    await checkField(this.successUpdate);
  }

  async cancelDeleteTask(task) {
    await click(this.deleteButton);
    await click(this.undoButton);
    await checkField(task);
  }

  async successDeleteTask(task, page) {
    await click(this.deleteButton);
    await checkField(this.successDelete);
    await checkFieldByTextNotVisible(task, page);
  }
}
