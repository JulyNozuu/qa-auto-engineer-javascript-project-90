// pages/labelsPage.js
import { expect } from "@playwright/test";
import labels from "../__fixtures__/labels.js";
import pageTexts from "../__fixtures__/pageTexts";

import {
  inputField,
  checkField,
  click,
  openCard,
  checkFieldByText,
  checkCheckbox,
  checkFieldByTextNotVisible,
} from "../func.js";

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

  async createLabels(labelsName) {
    await click(this.createLabelsButton);
    await checkField(this.createLabelsName);
    await inputField(this.createLabelsName, labelsName);
    await click(this.statusSave);
    await checkField(this.successSave);
  }

  async editLabelsFromList(labelsId, editLabelsName, page) {
    await openCard(page, labelsId);
    await inputField(this.createLabelsName, editLabelsName);
    await click(this.statusSave);
    await checkFieldByText(editLabelsName, page);
  }

  async editLabelsFromShow(editLabelsName, page) {
    await click(this.showButtonStatusCreate);
    await click(this.editButton);
    await inputField(this.createLabelsName, editLabelsName);
    await click(this.statusSave);
    await checkFieldByText(editLabelsName, page);
  }

  async cancelDeleteLabel(labels, page) {
    await checkCheckbox(
      this.page.getByRole("row", {
        name: `Select this row ${labels}`,
      })
    );
    await click(this.deleteButton);
    await click(this.undoButton);
    await checkFieldByText(labels[0], page);
  }

  async successDeleteLabel(labels, page) {
    await checkCheckbox(
      this.page.getByRole("row", {
        name: `Select this row ${labels}`,
      })
    );
    await click(this.deleteButton);
    await checkFieldByTextNotVisible(labels[0], page);
  }

  async allLabelsDelete(){
  await checkCheckbox(this.checkAll);
  await checkField(this.labelSelected);
  await click(this.deleteButton);
  await checkField(this.noLabelsStatus);
}
}

