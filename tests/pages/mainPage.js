import pageTexts from "../__fixtures__/pageTexts";

export class MainPage {
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

  async navigateToMainPage() {
    await this.page.goto("http://localhost:5173/#/");
  }

  async goToProfile() {
    await this.profile.click({
      timeout: 75000,
    });
  }

  async logout() {
    await this.logoutBottun.click({
      timeout: 75000,
    });
  }

  async goToMenuUsers() {
    await this.menuUsers.click({
      timeout: 75000,
    });
  }

  async goToMenuTasks() {
    await this.menuTasks.click({
      timeout: 75000,
    });
  }

  async goToMenuLabels() {
    await this.menuLabels.click({
      timeout: 75000,
    });
  }

  async goToMenuStatuses() {
    await this.menuStatuses.click({
      timeout: 75000,
    });
  }
}
