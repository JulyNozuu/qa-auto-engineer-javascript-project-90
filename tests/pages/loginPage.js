// pages/loginPage.js
import { expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = this.page.getByLabel("Username *");
    this.password = this.page.getByLabel("Password *");
    this.signIn = this.page.getByRole("button", { name: "Sign in" });
    this.errorText = this.page.getByText(pageTexts.errorTextLoginPage);
  }

  async checkUserNameField() {
    await expect(this.userName).toBeVisible();
  }

  async checkPasswordField() {
    await expect(this.password).toBeVisible();
  }

  async checkSignIn() {
    await expect(this.signIn).toBeVisible();
  }

  async inputUserNameField(query) {
    await this.userName.fill(query);
  }

  async inputPasswordField(query) {
    await this.password.fill(query);
  }
  async clickSignInButton() {
    await this.signIn.click();
  }

  async checkErrorText() {
    await expect(this.errorText).toBeVisible();
  }
}
