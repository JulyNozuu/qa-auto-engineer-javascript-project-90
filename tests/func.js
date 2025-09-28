import { test, expect } from "@playwright/test";

export async function inputField(field, query) {
  await field.fill(query);
}

export async function checkField(field, timeout = 35000) {
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

export async function click(field) {
  await field.click();
}

export async function checkCheckbox(field) {
  await field.getByRole("checkbox").check();
}

export async function openCard(page, id) {
  await page.getByRole("cell", { name: id, exact: true }).click();
}
