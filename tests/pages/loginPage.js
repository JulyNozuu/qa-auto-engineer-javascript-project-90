// pages/loginPage.js
import { test, expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = this.page.getByLabel("Username *");
    this.password = this.page.getByLabel("Password *");
    this.signIn = this.page.getByRole("button", { name: "Sign in" });
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
}
