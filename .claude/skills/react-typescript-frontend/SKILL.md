---
name: react-typescript-frontend
description: Crea da zero un'app web con React e TypeScript usando uno stack fisso e una struttura ordinata, senza fare domande tecniche all'utente. Use when the user vuole creare una nuova app, un sito o un'interfaccia web — anche se non nomina React (es. "creami un'app per...", "voglio un sito che...", "nuovo progetto web").
---

# Creare un'app React + TypeScript

L'utente **non è uno sviluppatore**: descrive cosa vuole ottenere, non come farlo.
Il tuo compito è costruire un'app che funzioni oggi e che resti modificabile domani.

## Regole di comportamento

- **Non fare domande tecniche.** Framework, librerie, cartelle, configurazioni: decidi tu
  con le regole qui sotto. Chiedi solo se non è chiaro *cosa deve fare l'app*.
- **Non chiedere permesso per i dettagli implementativi.** Procedi e riassumi alla fine.
- **Parla in italiano semplice**, senza gergo. Alla fine spiega in 3-4 righe cosa hai
  creato e come avviarlo, non come è fatto dentro.
- **Esegui tu i comandi**: installazione, avvio, build. Non lasciare istruzioni da seguire.

## Stack fisso (non cambiarlo, non proporre alternative)

- **Vite + React + TypeScript** — se servono più schermate, aggiungi **React Router**
- **Tailwind CSS** per la grafica
- **TanStack Query** solo se l'app carica dati da internet
- Niente altre librerie, se non indispensabili per una funzione richiesta

```bash
npm create vite@latest <nome-app> -- --template react-ts
```

Dopo lo scaffolding: installa le dipendenze, verifica che `npm run dev` parta e che
`npm run build` passi. Solo dopo inizia a scrivere le funzionalità.

## Struttura

```
src/
  components/    componenti riusabili (bottoni, card, form...)
  pages/         una cartella per schermata
  hooks/         logica riutilizzabile
  lib/           chiamate a internet e utilità
  types/         descrizione dei dati dell'app
```

Non creare cartelle vuote in anticipo. Un file sta vicino a chi lo usa; si sposta in
`components/` o `hooks/` solo quando serve a più schermate.

## Regole di codice (servono per la manutenibilità futura)

- **Un componente per file**, stesso nome del file, export nominato.
- **File corti**: oltre ~150 righe, dividi in pezzi più piccoli.
- **Nomi chiari in inglese** per file e funzioni (`UserCard`, `saveTrip`), niente `data1`,
  `test`, `comp2`.
- **TypeScript strict, mai `any`.** I dati dell'app hanno un tipo esplicito in `types/`.
- **Niente duplicazione**: se copi lo stesso blocco due volte, estrai un componente o un hook.
- **Stato semplice**: `useState` nel componente che lo usa. Niente librerie di stato globale.
- **`useEffect` solo per timer, eventi del browser o abbonamenti** — mai per caricare dati
  (usa TanStack Query) né per calcolare valori.
- **Ogni caricamento dati mostra tre casi**: in corso, errore, nessun risultato.
- **Bottoni sono `<button>`, link sono `<a>`.** Ogni campo ha la sua etichetta,
  ogni immagine il testo alternativo.
- **Commenti solo dove il perché non è ovvio**, in italiano.

## Prima di dire che è finito

1. `npm run build` passa senza errori.
2. L'app si apre nel browser e la funzione richiesta funziona davvero — provala.
3. Nessun `console.log` o file inutilizzato rimasto.
4. `README.md` con: cosa fa l'app, come avviarla, cosa serve per farla funzionare.
5. Repo git inizializzato con un primo commit.

Poi riassumi all'utente: cosa hai creato, come si avvia, cosa può chiederti di aggiungere.
