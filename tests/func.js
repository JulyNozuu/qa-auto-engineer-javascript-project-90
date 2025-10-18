import { test, expect } from "@playwright/test";

export async function inputField(field, query) {
  await field.fill(query);
}

export async function checkField(field, timeout = 95000) {
  await expect(field).toBeVisible({
    timeout,
  });
}

export async function checkFieldByText(field, page, timeout = 35000) {
  await expect(page.getByText(field, { exact: true })).toBeVisible({
    timeout,
  });
}

export async function checkFieldByTextNotVisible(field, page) {
  await expect(page.getByText(field, { exact: true })).not.toBeVisible();
}

export async function click(field, timeout = 75000) {
  await field.click({
    timeout,
  });
}

export async function checkCheckbox(field) {
  await field.getByRole("checkbox").check();
}

export async function openCard(page, id) {
  await page.getByRole("cell", { name: id, exact: true }).click();
}

export async function selectOption(page, query, timeout = 35000) {
  await page.getByRole("option", { name: query }).click({
    timeout,
  });
}
export async function clickSomewhere(page) {
  await page.locator("#menu-label_id div").first().click();
}
