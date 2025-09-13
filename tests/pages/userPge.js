// pages/userPage.js
import { test, expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";
import users from "../__fixtures__/users";

export class UserPage {
  constructor(page) {
    this.page = page;
    this.createUserButton = this.page.getByLabel("Create", { exact: true });
    this.userEmail = this.page.getByLabel("Email");
    this.userFirstName = this.page.getByLabel("First name");
    this.userLastName = this.page.getByLabel("Last name");
    this.userPassword = this.page.getByLabel("Password");
    this.saveButton = this.page.getByLabel("Save");
    this.createUserTextSuccess = this.page.getByText(
      pageTexts.createUserTextSuccess
    );
    this.createUserDeleteButton = this.page.getByLabel(
      pageTexts.createUserDeleteButton
    );
    this.createUserShow = this.page.getByLabel(pageTexts.createUserShow);

    this.createUserEditButton = this.page.getByLabel(
      pageTexts.createUserEditButton
    );
    this.saveDeleteButton = this.page.getByText("SaveDelete");
  }

  async createUserButtonClick() {
    await this.createUserButton.click();
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async inputUserEmail(query) {
    await this.userEmail.fill(query);
  }

  async inputUserFirstName(query) {
    await this.userFirstName.fill(query);
  }

  async inputUserLastName(query) {
    await this.userLastName.fill(query);
  }

  async inputUserPassword(query) {
    await this.userPassword.fill(query);
  }

  async checkCreateUserSuccess() {
    await expect(this.createUserTextSuccess).toBeVisible();
  }

  async checkCreateUserDeleteButton() {
    await expect(this.createUserDeleteButton).toBeVisible();
  }

  async checkCreateUserShow() {
    await expect(this.createUserShow).toBeVisible();
  }

  async createUserShowClick() {
    await this.createUserShow.click();
  }

  async checkCreateUserEditButton() {
    await expect(this.createUserEditButton).toBeVisible();
  }

  async createUserCreateUserEditButtonClick() {
    await this.createUserEditButton.click();
  }

  async checkUsers(page) {
    for (const user of users) {
      await expect(page.getByText(user.Email, { exact: true })).toBeVisible();
      await expect(
        page.getByText(user.LastName, { exact: true })
      ).toBeVisible();
      await expect(
        page.getByText(user.FirstName, {
          exact: true,
        })
      ).toBeVisible();
    }
  }

  async openCardUser(page, id) {
    await page.getByRole("cell", { name: id, exact: true }).click();
  }

  async checkUserEmail() {
    await expect(this.userEmail).toBeVisible();
  }

  async checkUserFirstName() {
    await expect(this.userFirstName).toBeVisible();
  }

  async checkUserLastName() {
    await expect(this.userLastName).toBeVisible();
  }

  async checkUserPassword() {
    await expect(this.userPassword).toBeVisible();
  }

  async checkSaveDeleteButton() {
    await expect(this.saveDeleteButton).toBeVisible();
  }

  async checkFieldByText(field, page, timeout = 35000) {
    await expect(page.getByText(field, { exact: true })).toBeVisible({
      timeout,
    });
  }
}
