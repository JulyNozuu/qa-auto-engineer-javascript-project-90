// pages/labelsPage.js
import { expect } from "@playwright/test";
import labels from "../__fixtures__/labels";
import pageTexts from "../__fixtures__/pageTexts";

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
    this.checkLabels1 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.labelsForDelete1}`,
    });
    this.checkLabels2 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.labelsForDelete2}`,
    });
    this.checkLabels3 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.labelsForDelete3}`,
    });

    this.noLabelsStatus = this.page.getByText("No Label yet.");
  }

  async checkLabels(page) {
    for (const label of labels) {
      await expect(page.getByText(label.Name, { exact: true })).toBeVisible();
    }
  }
}
