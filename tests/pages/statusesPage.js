import { expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";
import taskStatuses from "../__fixtures__/taskStatuses";

export class StatatusesPage {
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

  async navigateToStatusesPage() {
    await this.page.goto("http://localhost:5173/#/task_statuses");
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

  async createStatus(statusName, statusSlug) {
    await this.createStatusButton.click({
      timeout: 75000,
    });
    await expect(this.createStatusName).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createStatusSlug).toBeVisible({
      timeout: 95000,
    });
    await this.createStatusName.fill(statusName);
    await this.createStatusSlug.fill(statusSlug);
    await this.statusSave.click({
      timeout: 75000,
    });
    await expect(this.successSave).toBeVisible({
      timeout: 95000,
    });
  }

  async editStatus(id, editStatusName, editStatusSlug, page) {
    await page.getByRole("cell", { name: id, exact: true }).click();
    await this.createStatusName.fill(editStatusName);
    await this.createStatusSlug.fill(editStatusSlug);
    await this.statusSave.click({
      timeout: 75000,
    });
    await expect(page.getByText(editStatusName, { exact: true })).toBeVisible({
      timeout: 95000,
    });
    await expect(page.getByText(editStatusSlug, { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async editStatusFromShow(editStatusName, editStatusSlug, page) {
    await this.showButtonStatusCreate.click({
      timeout: 75000,
    });
    await this.editButton.click({
      timeout: 75000,
    });
    await this.createStatusName.fill(editStatusName);
    await this.createStatusSlug.fill(editStatusSlug);
    await this.statusSave.click({
      timeout: 75000,
    });

    await expect(
      page.getByText(pageTexts.editStatusName, { exact: true })
    ).toBeVisible({
      timeout: 95000,
    });
    await expect(page.getByText(editStatusSlug, { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async cancelDeleteStatus(status, page) {
    await this.page
      .getByRole("row", {
        name: `Select this row ${status}`,
      })
      .getByRole("checkbox")
      .check();
    await this.deleteButton.click({
      timeout: 75000,
    });
    await this.undoButton.click({
      timeout: 75000,
    });
    await expect(page.getByText(status[0], { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async successDeleteStatus(status, page) {
    await this.page
      .getByRole("row", {
        name: `Select this row ${status}`,
      })
      .getByRole("checkbox")
      .check();
    await this.deleteButton.click({
      timeout: 75000,
    });
    await expect(page.getByText(status[0], { exact: true })).not.toBeVisible();
  }

  async allStatusDelete() {
    await this.checkAll.getByRole("checkbox").check();
    await expect(this.itemSelected).toBeVisible({
      timeout: 95000,
    });
    await this.deleteButton.click({
      timeout: 75000,
    });
    await expect(this.noTaskStatus).toBeVisible({
      timeout: 95000,
    });
  }
}
