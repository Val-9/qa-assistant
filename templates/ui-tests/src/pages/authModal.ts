import { Page, expect } from '@playwright/test';

export const authModal = {
  root: (page: Page) => page.getByRole('dialog'),
  registrationTab: (page: Page) => page.getByRole('tab', { name: /^Registration$/i }),
  loginTab:        (page: Page) => page.getByRole('tab', { name: /^Login$/i }),
  username: (page: Page) => page.locator('input[name="username"]'),
  next:     (page: Page) => page.getByRole('button', { name: /^Next$/i }),
  password:        (page: Page) => page.locator('input[name="password"]'),
  confirmPassword: (page: Page) => page.locator('input[name="confirmPassword"]'),
  ageCheckbox:     (page: Page) => page.getByLabel(/I am at least 18 years old and not a resident of the restricted states/i),
  termsCheckbox:   (page: Page) => page.getByLabel(/I accept the Terms of Use and Privacy Policy/i),
  join:            (page: Page) => page.getByRole('button', { name: /Join Us/i }),
  submitLogin: (page: Page) => page.getByRole('button', { name: /^Login$/i }),
  forgotPassword: (page: Page) => page.getByRole('link', { name: /Forgot Password\?/i }),
  googleBtn:      (page: Page) => page.getByRole('button', { name: /Google/i }),
  facebookBtn:    (page: Page) => page.getByRole('button', { name: /Facebook/i })
};

export class AuthFlows {
  constructor(private page: Page) {}
  async open(baseURL?: string) {
    await this.page.goto(baseURL || 'https://staging.sweepnow.io');
    await expect(authModal.root(this.page)).toBeVisible({ timeout: 10_000 });
  }
  async login(username: string, password: string) {
    await authModal.loginTab(this.page).click();
    await authModal.username(this.page).fill(username);
    await authModal.password(this.page).fill(password);
    await authModal.submitLogin(this.page).click();
  }
  async expectLoggedIn() {
    await this.page.waitForURL('**/account**', { timeout: 10_000 });
  }
  async register(username: string, password: string) {
    await authModal.registrationTab(this.page).click();
    await authModal.username(this.page).fill(username);
    await authModal.next(this.page).click();
    await authModal.password(this.page).fill(password);
    await authModal.confirmPassword(this.page).fill(password);
    await authModal.ageCheckbox(this.page).check();
    await authModal.termsCheckbox(this.page).check();
    await authModal.join(this.page).click();
  }
}
