// pages/taskStatatusesPage.js
import { test, expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";
import taskStatuses from "../__fixtures__/taskStatuses";
import { checkCheckbox } from "../func";

export class TaskStatatusesPage {
  constructor(page) {
    this.page = page;
    this.createStatusButton = this.page.getByLabel("Create", { exact: true });
    this.createStatusName = this.page.getByLabel("Name");
    this.createStatusSlug = this.page.getByLabel("Slug");
    this.statusSave = this.page.getByLabel("Save");
    this.successSave = this.page.getByText("Element created");
    this.saveDeleteButton = this.page.getByText("SaveDelete");
    this.showButtonStatusCreate = this.page.getByLabel("Show");
    this.editButton = this.page.getByLabel("Edit");
    this.deleteButton = this.page.getByLabel("Delete");
    this.undoButton = this.page.getByRole("button", { name: "Undo" });
    this.checkAll = page.getByLabel("Select all");
    this.itemSelected = this.page.getByRole("heading", {
      name: "items selected",
    });
    this.checkStatus1 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.statusForDelete1}`,
    });
    this.checkStatus2 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.statusForDelete2}`,
    });
    this.checkStatus3 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.statusForDelete3}`,
    });

    this.noTaskStatus = this.page.getByText("No Task status yet.");
  }

  async checkStatuses(page) {
    for (const taskStatuse of taskStatuses) {
      await expect(
        page.getByText(taskStatuse.Name, { exact: true })
      ).toBeVisible();
      await expect(
        page.getByText(taskStatuse.Slug, { exact: true })
      ).toBeVisible();
    }
  }
}
