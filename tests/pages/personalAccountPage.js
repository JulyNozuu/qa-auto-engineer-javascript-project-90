import pageTexts from "../__fixtures__/pageTexts";
import {
  click,
} from "../func.js";

export class PersonalAccountPage {
  constructor(page) {
    this.page = page;
    this.welcomText = this.page.getByText(
      pageTexts.welcomeTextPersonalAccountPage
    );
    this.logoutBottun = this.page.getByText("Logout");
    this.profile = this.page.getByLabel("Profile");
    this.menuUsers = this.page.getByRole("menuitem", { name: "Users" });
    this.menuStatuses = this.page.getByRole("menuitem", {
      name: "Task statuses",
    });
    this.menuLabels = this.page.getByRole("menuitem", { name: "Labels" });
    this.menuTasks = this.page.getByRole("menuitem", { name: "Tasks" });
  }

  async goToProfile() {
    await click(this.profile);
  }

  async logout() {
    await click(this.logoutBottun);
  }

  async goToMenuUsers() {
    await click(this.menuUsers);
  }

  async goToMenuTasks() {
    await click(this.menuTasks);
  }

  async goToMenuLabels() {
    await click(this.menuLabels);
  }

  async goToMenuStatuses() {
    await click(this.menuStatuses);
  }
  
}
