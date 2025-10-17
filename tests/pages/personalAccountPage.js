// pages/personalAccountPage.js
import { test, expect } from "@playwright/test";
import pageTexts from "../__fixtures__/pageTexts";

export class PersonalAccountPage {
  constructor(page) {
    this.page = page;
    this.welcomText = this.page.getByText(
      pageTexts.welcomeTextPersonalAccountPage
    );
    this.logout = this.page.getByText("Logout");
    this.profile = this.page.getByLabel("Profile");
    this.menuUsers = this.page.getByRole("menuitem", { name: "Users" });
    this.menuStatuses = this.page.getByRole("menuitem", {
      name: "Task statuses",
    });
    this.menuLabels = this.page.getByRole("menuitem", { name: "Labels" });
    this.menuTasks = this.page.getByRole("menuitem", { name: "Tasks" });
  }
}
