import { test, expect } from '@playwright/test';
import { AuthFlows } from '../pages/authModal';

const BASE = process.env.BASE_URL || 'https://staging.sweepnow.io';

test('Login: success with username+password', async ({ page }) => {
  const auth = new AuthFlows(page);
  await auth.open(BASE);
  await auth.login(process.env.LOGIN_USER || 'testuser_4789', process.env.LOGIN_PASS || 'Test1234!');
  await auth.expectLoggedIn();
});

test('Login: wrong password shows inline error', async ({ page }) => {
  const auth = new AuthFlows(page);
  await auth.open(BASE);
  await auth.login(process.env.LOGIN_USER || 'testuser_4789', 'Wrong123!');
  await expect(page.getByText(/Login\/username is incorrrect/i)).toBeVisible();
});

test('Registration: happy path auto-login', async ({ page }) => {
  const auth = new AuthFlows(page);
  const unique = `user_${Date.now()}`;
  await auth.open(BASE);
  await auth.register(unique, 'Test1234!');
  await auth.expectLoggedIn();
});

test('Registration: Join Us disabled without checkboxes', async ({ page }) => {
  await page.goto(BASE);
  await page.getByRole('tab', { name: /^Registration$/i }).click();
  await page.locator('input[name="username"]').fill(`user_${Date.now()}`);
  await page.getByRole('button', { name: /^Next$/i }).click();
  await page.locator('input[name="password"]').fill('Test1234!');
  await page.locator('input[name="confirmPassword"]').fill('Test1234!');
  await expect(page.getByRole('button', { name: /Join Us/i })).toBeDisabled();
});
