import { test, expect } from '@playwright/test';


//Test 1
test('Test caricamento componenti homepage (non loggato)', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('http://localhost:4200/');
  await expect(page.locator('app-map-display')).toBeVisible();
  await expect(page.locator('app-navbar')).toBeVisible();
  await expect(page.locator('app-footer')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Login' })).toHaveText('Login');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Marker' }).first().click({ force: true });
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

  //wrong username
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Alic');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByText('Credenziali non valide, riprova').first()).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/auth');

  //wrong password
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
test('Navigazione e Registrazione corretta', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Registrati qui' })).toBeVisible();
  await page.getByRole('link', { name: 'Registrati qui' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth/signup');
  await expect(page.getByText('Registrati per segnalare e')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(createRandomString(7));
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Gattino2003');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth');
});

//Test 5
test('Registazione errata ', async ({ page }) => {
  //existing username
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Registrati qui' })).toBeVisible();
  await page.getByRole('link', { name: 'Registrati qui' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth/signup');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Gattino5003');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page.getByText('Username già esistente, prova con un altro.').first()).toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/auth/signup');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();

  //password with less than 4 characters
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Darknine');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Cat');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page.getByText('La password deve avere minimo 4 caratteri.').first()).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await expect(page).toHaveURL('http://localhost:4200/auth/signup');
});

//Test 6
test('Navigazione e caricamento pagina post (non loggato)', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Marker' }).nth(1).click( { force: true });
  await page.locator('app-map-display').getByRole('link', { name: 'Visualizza' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('div').filter({ hasText: '+− Leaflet | © OpenStreetMap' }).nth(3)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:4200/');
});

//Test 7
test('Navigazione e caricamento pagina post (loggato)', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  login(page);
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Marker' }).nth(1).click( { force: true });
  await page.locator('app-map-display').getByRole('link', { name: 'Visualizza' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('textbox', { name: 'Aggiungi un commento...' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Invia' })).toBeVisible();
});

//Test 8
test('Aggiunta e rimozione commento', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  login(page);
  await page.waitForTimeout(10000);
  await page.goto('http://localhost:4200/posts/1');
  await page.getByRole('textbox', { name: 'Aggiungi un commento...' }).click();
  await page.getByRole('textbox', { name: 'Aggiungi un commento...' }).fill('Sono un test');
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('app-post-detail')).toContainText('Tu');
  await expect(page.locator('app-post-detail')).toContainText('Sono un test');
  await expect(page.getByText('Tu - 05/09/2025 🗑️').first()).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: '🗑️' }).first().click();
  await expect(page.getByText('Commento eliminato!')).toBeVisible();
});

//Test 9
test('Aggiunta commento vuoto', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  login(page);
  await page.waitForTimeout(10000);
  await page.goto('http://localhost:4200/posts/1');
  await page.getByRole('button', { name: 'Invia' }).click();
  await expect(page.getByText('Il commento non può essere vuoto.')).toBeVisible();
});

//Test 10
test('Navigazione e creazione nuovo post', async ({ page }) => {
  // Login
  await page.goto('http://localhost:4200/');
  login(page);
  await page.waitForTimeout(10000);
  

  // Navigate to New Post page and fill the form
  await page.getByRole('link', { name: 'Nuovo post' }).click();
  await expect(page).toHaveURL('http://localhost:4200/posts/new');
  await page.getByRole('link', { name: 'Nuovo post' }).click();
  await expect(page.locator('#map')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Titolo' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Descrizione' })).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Immagine' })).toBeEmpty();
  await expect(page.locator('app-new-post')).toContainText('Latitudine: -- | Longitudine: --');
  await page.getByRole('textbox', { name: 'Titolo' }).click();
  await page.getByRole('textbox', { name: 'Titolo' }).fill('Test');
  await page.getByRole('textbox', { name: 'Descrizione' }).click();
  await page.getByRole('textbox', { name: 'Descrizione' }).fill('Questo è un test **giusto**');
  await page.getByRole('button', { name: 'Immagine' }).click();
  await page.getByRole('button', { name: 'Immagine' }).setInputFiles('tests/imageTest.png');
  await page.getByLabel('Sesso').selectOption('femmina');
  await page.locator('#map').click();
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Pubblica' }).click();
  await expect(page.getByRole('alert', { name: 'Post creato con successo!' })).toBeVisible();
});

//test 11
test('Creazione nuovo post con dati mancanti (tutti i casi)', async ({ page }) => {
  // Login
  await page.goto('http://localhost:4200/');
  login(page);
 await page.waitForTimeout(10000);
 

  // Navigate to New Post page and check empty form
  await page.getByRole('link', { name: 'Nuovo post' }).click();
  await expect(page).toHaveURL('http://localhost:4200/posts/new');
  await expect(page.locator('#map')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Titolo' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Descrizione' })).toBeEmpty();
  await expect(page.getByRole('button', { name: 'Immagine' })).toBeEmpty(); 
  await expect(page.locator('app-new-post')).toContainText('Latitudine: -- | Longitudine: --');

  // missing title and image (for every case)
  await page.getByRole('textbox', { name: 'Descrizione' }).click();
  await page.getByRole('textbox', { name: 'Descrizione' }).fill('Questo è un test con valori mancanti');
  await page.getByLabel('Sesso').selectOption('femmina');
  await page.locator('#map').click();
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Pubblica' }).click();
  await expect(page.getByRole('alert', { name: 'Per favore, compila tutti i campi' }).last()).toBeVisible();
  await page.waitForTimeout(2000);

  // missing description and image
  await page.getByRole('textbox', { name: 'Titolo' }).click();
  await page.getByRole('textbox', { name: 'Titolo' }).fill('Test');
  await page.getByLabel('Sesso').selectOption('femmina');
  await page.locator('#map').click();
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Pubblica' }).click();
  await expect(page.getByRole('alert', { name: 'Per favore, compila tutti i campi' }).last()).toBeVisible();
  await page.waitForTimeout(2000);

  // missing geolocation and image
  await page.getByRole('textbox', { name: 'Titolo' }).click();
  await page.getByRole('textbox', { name: 'Titolo' }).fill('Test');
  await page.getByRole('textbox', { name: 'Descrizione' }).click();
  await page.getByRole('textbox', { name: 'Descrizione' }).fill('Questo è un test con valori mancanti');
  await page.getByLabel('Sesso').selectOption('femmina');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Pubblica' }).click();
  await expect(page.getByRole('alert', { name: 'Per favore, compila tutti i campi' }).last()).toBeVisible();
  await page.waitForTimeout(2000);

  // missing gender and image
  await page.getByRole('textbox', { name: 'Titolo' }).click();
  await page.getByRole('textbox', { name: 'Titolo' }).fill('Test');
  await page.getByRole('textbox', { name: 'Descrizione' }).click();
  await page.getByRole('textbox', { name: 'Descrizione' }).fill('Questo è un test con valori mancanti');
  await page.getByLabel('Sesso').selectOption('femmina');
  await page.locator('#map').click();
  await expect(page.getByRole('button', { name: 'Marker' })).toBeVisible();
  await page.getByRole('button', { name: 'Pubblica' }).click();
  await expect(page.getByRole('alert', { name: 'Per favore, compila tutti i campi' }).last()).toBeVisible();

});

//test 12
test('Logout', async ({ page }) => {
  // Login
  await page.goto('http://localhost:4200/');
  login(page);
 await page.waitForTimeout(10000);
  await expect(page.getByText('Logout')).toBeVisible();
  await page.getByText('Logout').click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Logout')).not.toBeVisible();
  await expect(page).toHaveURL('http://localhost:4200/');
});

//utility function 
function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


async function login(page, username: string = 'Alice', password: string = 'password123') {
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:4200/auth');
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page).toHaveURL('http://localhost:4200/');
  await expect(page.getByRole('link', { name: 'Nuovo post' })).toBeVisible();
}

