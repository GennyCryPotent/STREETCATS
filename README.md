# STREETCATS - Piattaforma di Avvistamenti Gatti
Streetcats è un progetto universitario full-stack sviluppato per il corso di Tecnologie Web della Federico II. STREETCATS è una piattaforma social interattiva, che consente agli utenti di geolocalizzare, condividere e visualizzare avvistamenti di gatti randagi su una mappa interattiva. L'applicazione offre un'esperienza utente completa, includendo un sistema di autenticazione e registrazione siucro e la possibilità di caricare post con foto, promuovendo la creazione di una comunità attiva per la tutela dei felini.

# Tecnologie utilizzate
Il progetto è stato sviluppato utilizzando le seguenti tecnologie:

Frontend: Angular 15+, Leaflet, Bootstrap

Backend: Express.js, SQLITE, Sequelize, Multer

Testing: Playwright

# Guida all'Installazione e Avvio
Per avviare l'applicazione in locale, segui i passaggi riportati di seguito. Assicurati di avere Node.js e npm installati.

## Clone del repository
git clone [https://github.com/tuo-username/streetcats.git](https://github.com/tuo-username/streetcats.git)

## Spostati nella cartella del backend, installa le dipendenze e avvia il server
cd streetcats/backend
npm install
npm start

## In un nuovo terminale, sposta nella cartella del frontend, installa le dipendenze e avvia l'app
cd ../frontend
npm install
ng serve

🧪 Test E2E
Il progetto include test end-to-end completi, scritti con Playwright, per garantire il corretto funzionamento delle funzionalità critiche.

Per eseguire i test, assicurati che il backend e il frontend siano già in esecuzione, quindi lancia il seguente comando dal terminale:

cd streetcats/frontend
npx playwright test --ui 

Il flag --ui aprirà l'interfaccia grafica di Playwright per visualizzare i test in tempo reale.
