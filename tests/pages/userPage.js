import { expect } from "@playwright/test";
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

    this.undoButtonUser = this.page.getByRole("button", { name: "Undo" });

    this.checkUser1 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.userForDelete1}`,
    });

    this.checkUser2 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.userForDelete2}`,
    });

    this.checkUser3 = this.page.getByRole("row", {
      name: `Select this row ${pageTexts.userForDelete3}`,
    });

    this.checkAll = page.getByLabel("Select all");

    this.itemSelected = this.page.getByRole("heading", {
      name: "items selected",
    });

    this.noUser = this.page.getByText("No User yet.");
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

  async createUser(email, firstName, lastName, password) {
    await this.createUserButton.click({
      timeout: 75000,
    });
    await this.userEmail.fill(email);
    await this.userFirstName.fill(firstName);
    await this.userLastName.fill(lastName);
    await this.userPassword.fill(password);
    await this.saveButton.click({
      timeout: 75000,
    });
  }

  async editUser(email, firstName, lastName, password) {
    await this.userEmail.fill(email);
    await this.userFirstName.fill(firstName);
    await this.userLastName.fill(lastName);
    await this.userPassword.fill(password);
    await this.saveButton.click({
      timeout: 75000,
    });
  }

  async checkCreateUser(page) {
    await expect(
      page.getByText(pageTexts.createUserTextSuccess, { exact: true })
    ).toBeVisible({
      timeout: 95000,
    });
    await expect(
      page.getByText(pageTexts.createUserShow, { exact: true })
    ).toBeVisible({
      timeout: 95000,
    });
    await expect(this.createUserDeleteButton).toBeVisible({
      timeout: 95000,
    });
  }

  async clickShowButton() {
    await this.createUserShow.click({
      timeout: 75000,
    });
  }

  async clickEditButton() {
    await this.createUserEditButton.click({
      timeout: 75000,
    });
  }

  async checkUserCreateForm() {
    await expect(this.userEmail).toBeVisible({
      timeout: 95000,
    });
    await expect(this.userFirstName).toBeVisible({
      timeout: 95000,
    });
    await expect(this.userLastName).toBeVisible({
      timeout: 95000,
    });
    await expect(this.userPassword).toBeVisible({
      timeout: 95000,
    });
  }

  async checkUser(email, firstName, lastName, page) {
    await expect(page.getByText(email, { exact: true })).toBeVisible({
      timeout: 95000,
    });
    await expect(page.getByText(firstName, { exact: true })).toBeVisible({
      timeout: 95000,
    });
    await expect(page.getByText(lastName, { exact: true })).toBeVisible({
      timeout: 95000,
    });
  }

  async checkEditButton() {
    await this.createUserEditButton.click({
      timeout: 75000,
    });
  }

  async checkSaveDeleteButton() {
    await expect(this.saveDeleteButton).toBeVisible({
      timeout: 95000,
    });
  }

  async deletUser() {
    await this.createUserDeleteButton.click({
      timeout: 75000,
    });
  }

  async deleteUser(user) {
    await user.getByRole("checkbox").check();
    await this.createUserDeleteButton.click({
      timeout: 75000,
    });
  }
  async cancelDeletUser() {
    await this.undoButtonUser.click({
      timeout: 75000,
    });
  }
}
