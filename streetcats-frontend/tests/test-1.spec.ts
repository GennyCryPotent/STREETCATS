import { test, expect } from '@playwright/test';

//Test 1
test('Test caricamento componenti homepage (non loggato)', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('http://localhost:4200/');
  await expect(page.locator('app-map-display')).toBeVisible();
  await expect(page.locator('app-navbar')).toBeVisible();
  await expect(page.locator('app-footer')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toHaveText('Login');
  await page.getByRole('button', { name: 'Marker' }).nth(1).click();
  await expect(page.locator('.leaflet-popup')).toBeVisible({ timeout: 5000 });
  await page.locator('b').click();
});

//Test 2
test('Navigazione e Login corretto', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await 
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page).toHaveURL('http://localhost:4200/');
  await expect(page.getByRole('link', { name: 'Nuovo post' })).toBeVisible();
  await expect(page.getByText('Logout')).toBeVisible();
});

//Test 3
test('Login errato', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByText('Credenziali non valide, riprova').first()).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Alic');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByText('Credenziali non valide, riprova').first()).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password12');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByText('Credenziali non valide, riprova').first()).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
});

//Test 4
test('Test navigazione e Registrazione corretta', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Registrati qui' })).toBeVisible();
  await page.getByRole('link', { name: 'Registrati qui' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth/signup');
  await expect(page.getByText('Registrati per segnalare e')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Gennaro');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Gattino2003');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth');
});
