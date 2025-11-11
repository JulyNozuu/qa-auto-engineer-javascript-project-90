import { expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";

export class  LoginPage {
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
    await this.signIn.click({
      timeout: 75000,
    });
  }

  async checkLoginForm() {
    await this.page.goto("http://localhost:5173/#/login");
    await expect(this.userName).toBeVisible({
      timeout: 95000,
    });
    await expect(this.password).toBeVisible({
      timeout: 95000,
    });
    await expect(this.signIn).toBeVisible({
      timeout: 95000,
    });
  }

  async authorization(name, password) {
    await this.page.goto("http://localhost:5173/#/login");
    await this.userName.fill(name);
    await this.password.fill(password);
    await this.signIn.click({
      timeout: 75000,
    });
  }

  async checkWelcomeText(page) {
    await expect(
      page.getByText(pageTexts.welcomeTextPersonalAccountPage, { exact: true })
    ).toBeVisible({
      timeout: 95000,
    });
  }
  async checkErrorText(page) {
    await expect(
      page.getByText(pageTexts.errorTextLoginPage, { exact: true })
    ).toBeVisible({
      timeout: 95000,
    });
  }
}
