// pages/loginPage.js
import { expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";
import { inputField, checkField, click, checkFieldByText } from "../func.js";

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

  async checkLoginForm() {
    await this.page.goto("http://localhost:5173/#/login");
    await checkField(this.userName);
    await checkField(this.password);
    await checkField(this.signIn);
  }

  async authorization(name, password) {
    await this.page.goto("http://localhost:5173/#/login");
    await inputField(this.userName, name);
    await inputField(this.password, password);
    await click(this.signIn);
  }

  async checkWelcomeText(page) {
    await checkFieldByText(pageTexts.welcomeTextPersonalAccountPage, page);
  }
  async checkErrorText(page) {
    await checkFieldByText(pageTexts.errorTextLoginPage, page);
  }
}
