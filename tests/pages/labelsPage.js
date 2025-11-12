import { expect } from "@playwright/test";
import labels from "../__fixtures__/labels.js";

export class LabelsPage {
  constructor(page) {
    this.page = page;
    this.createLabelsButton = this.page.getByLabel("Create", { exact: true });
    this.createLabelsName = this.page.getByLabel("Name");
    this.statusSave = this.page.getByLabel("Save");
    this.successSave = this.page.getByText("Element created");
    this.saveDeleteButton = this.page.getByText("SaveDelete");
    this.showButtonStatusCreate = this.page.getByLabel("Show");
    this.editButton = this.page.getByLabel("Edit");
    this.deleteButton = this.page.getByLabel("Delete");
    this.undoButton = this.page.getByRole("button", { name: "Undo" });
    this.checkAll = page.getByLabel("Select all");
    this.labelSelected = this.page.getByRole("heading", {
      name: "items selected",
    });

    this.noLabelsStatus = this.page.getByText("No Label yet.");
  }

  async navigateToLabelPage() {
    await this.page.goto("http://localhost:5173/#/labels");
  }

  async checkLabels(page) {
    for (const label of labels) {
      await expect(page.getByText(label.Name, { exact: true })).toBeVisible();
    }
  }

  async createLabels(labelsName) {
    await this.createLabelsButton.click({
      timeout: 75000,
    });
    await expect(this.createLabelsName).toBeVisible({
      timeout: 95000,
    });
    await this.createLabelsName.fill(labelsName);
    await this.statusSave.click({
      timeout: 75000,
    });
    await expect(this.successSave).toBeVisible({
      timeout: 95000,
    });
  }

  async editLabelsFromList(labelsId, editLabelsName, page) {
    await page.getByRole("cell", { name: labelsId, exact: true }).click();
    await this.createLabelsName.fill(editLabelsName);
    await this.statusSave.click({
      timeout: 75000,
    });
    await expect(page.getByText(editLabelsName, { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async editLabelsFromShow(editLabelsName, page) {
    await this.showButtonStatusCreate.click({
      timeout: 75000,
    });
    await this.editButton.click({
      timeout: 75000,
    });
    await this.createLabelsName.fill(editLabelsName);
    await this.statusSave.click({
      timeout: 75000,
    });
    await expect(page.getByText(editLabelsName, { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async cancelDeleteLabel(labels, page) {
    await this.page
      .getByRole("row", {
        name: `Select this row ${labels}`,
      })
      .getByRole("checkbox")
      .check();
    await this.deleteButton.click({
      timeout: 75000,
    });
    await this.undoButton.click({
      timeout: 75000,
    });
    await expect(page.getByText(labels[0], { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async successDeleteLabel(labels, page) {
    await this.page
      .getByRole("row", {
        name: `Select this row ${labels}`,
      })
      .getByRole("checkbox")
      .check();

    await this.deleteButton.click({
      timeout: 75000,
    });
    await expect(page.getByText(labels[0], { exact: true })).not.toBeVisible();
  }

  async allLabelsDelete() {
    await this.checkAll.getByRole("checkbox").check();
    await expect(this.labelSelected).toBeVisible({
      timeout: 95000,
    });
    await this.deleteButton.click({
      timeout: 75000,
    });
    await expect(this.noLabelsStatus).toBeVisible({
      timeout: 95000,
    });
  }
}
