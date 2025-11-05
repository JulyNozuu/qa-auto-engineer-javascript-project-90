import { expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";
import taskStatuses from "../__fixtures__/taskStatuses";

import {
  inputField,
  checkField,
  click,
  openCard,
  checkFieldByText,
  checkFieldByTextNotVisible,
  checkCheckbox,
} from "../func.js";

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

  async createStatus(statusName, statusSlug) {
    await click(this.createStatusButton);
    await checkField(this.createStatusName);
    await checkField(this.createStatusSlug);
    await inputField(this.createStatusName, statusName);
    await inputField(this.createStatusName, statusSlug);
    await click(this.statusSave);
    await checkField(this.successSave);
  }

  async editStatus(id, editStatusName, editStatusSlug, page) {
    await openCard(page, id);
    await inputField(this.createStatusName, editStatusName);
    await inputField(this.createStatusSlug, editStatusSlug);
    await click(this.statusSave);
    await checkFieldByText(editStatusName, page);
    await checkFieldByText(editStatusSlug, page);
  }

  async editStatusFromShow(editStatusName, editStatusSlug, page) {
    await click(this.showButtonStatusCreate);
    await click(this.editButton);
    await inputField(this.createStatusName, editStatusName);
    await inputField(this.createStatusSlug, editStatusSlug);
    await click(this.statusSave);
    await checkFieldByText(pageTexts.editStatusName, page);
    await checkFieldByText(pageTexts.editStatusSlug, page);
  }

  async cancelDeleteStatus(status, page) {
    await checkCheckbox(
      this.page.getByRole("row", {
        name: `Select this row ${status}`,
      })
    );
    await click(this.deleteButton);
    await click(this.undoButton);
    await checkFieldByText(status[0], page);
  }

  async successDeleteStatus(status, page) {
    await checkCheckbox(
      this.page.getByRole("row", {
        name: `Select this row ${status}`,
      })
    );
    await click(this.deleteButton);
    await checkFieldByTextNotVisible(status[0], page);
  }

  async allStatusDelete() {
    await checkCheckbox(this.checkAll);
    await checkField(this.itemSelected);
    await click(this.deleteButton);
    await checkField(this.noTaskStatus);
  }
}
