# GitHub per principianti: come salvare e gestire il tuo progetto online

Se stai iniziando a sviluppare un sito o una piccola applicazione, prima o poi hai bisogno di un posto sicuro dove conservare il codice, tenerne traccia nel tempo e pubblicare gli aggiornamenti senza fare confusione. GitHub serve esattamente a questo.

In questa guida riprendo e approfondisco i punti mostrati anche nel video, così hai una versione scritta da consultare con calma mentre lavori sul tuo progetto.

## Obiettivo della guida

L'obiettivo è imparare a:

- creare un repository su GitHub
- collegare il progetto locale al repository remoto
- configurare l'accesso tramite chiave SSH
- inviare le modifiche online con i comandi Git principali

Alla fine avrai il tuo progetto salvato sia sul computer sia su GitHub.

## Prerequisiti

Prima di iniziare ti servono due cose:

- un account GitHub: https://github.com/
- Git installato sul computer: https://git-scm.com/install/

Se usi Windows, durante l'installazione di Git puoi lasciare quasi tutte le opzioni di default. Una volta terminato, avrai a disposizione Git Bash e i comandi Git nel terminale.

## 1. Perche usare GitHub

Molti all'inizio tengono il progetto solo in una cartella del PC. Funziona, ma basta poco per perdere il controllo: file duplicati, versioni chiamate `sito-finale`, `sito-finale-definitivo`, `sito-finale-2`, oppure modifiche fatte ieri che oggi non riesci piu a recuperare.

GitHub ti aiuta a risolvere proprio questi problemi.

Con GitHub puoi:

- conservare una copia online del progetto
- vedere la cronologia delle modifiche
- tornare indietro se rompi qualcosa
- lavorare da piu computer
- condividere il codice con altre persone

Dietro GitHub c'e Git, cioe il sistema di versionamento che registra i cambiamenti del tuo progetto. Git lavora in locale. GitHub aggiunge la parte online e collaborativa.

## 2. Creare un nuovo repository su GitHub

Dopo aver fatto accesso a GitHub:

1. clicca su `New repository`
2. scegli un nome per il repository, per esempio `diarycar`
3. aggiungi una descrizione se vuoi
4. scegli se renderlo `Public` o `Private`
5. clicca su `Create repository`

Se il progetto e didattico o vuoi mostrarlo nel portfolio, `Public` ha senso. Se invece vuoi lavorarci in privato, scegli `Private`.

Appena creato il repository, GitHub ti mostrera diverse istruzioni per collegarlo al progetto locale. In questa guida usiamo la connessione SSH, che e una delle soluzioni piu comode per evitare di inserire username e password a ogni push.

## 3. Creare una chiave SSH e collegarla a GitHub

La chiave SSH serve per autenticare il tuo computer con GitHub in modo sicuro.

Nel terminale esegui:

```bash
ssh-keygen -t ed25519 -C "example@mail.com"
```

Al posto di `example@mail.com` inserisci la tua email GitHub.

Durante la procedura:

- premi Invio per confermare il percorso predefinito
- se vuoi, imposta una passphrase
- altrimenti premi Invio per lasciarla vuota

Una volta creata la chiave, avvia l'agente SSH e aggiungila.

Su Git Bash:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Per visualizzare la chiave pubblica:

```bash
cat ~/.ssh/id_ed25519.pub
```

Adesso:

1. copia tutto il contenuto mostrato nel terminale
2. vai su GitHub
3. apri `Settings`
4. entra in `SSH and GPG keys`
5. clicca `New SSH key`
6. incolla la chiave e salva

Per verificare che tutto sia configurato correttamente, esegui:

```bash
ssh -T git@github.com
```

Se e tutto a posto, GitHub ti rispondera con un messaggio di conferma.

## 4. Inizializzare il repository localmente

Adesso spostati nella cartella del tuo progetto con il terminale. Se il progetto esiste gia sul tuo computer, devi solo inizializzarlo con Git.

Esempio:

```bash
git init
```

Questo comando crea il repository Git locale.

Poi collega il progetto al repository GitHub con l'URL SSH che trovi nella pagina del repository. In genere ha una forma simile a questa:

```bash
git remote add origin git@github.com:tuo-username/diarycar.git
```

Per controllare che il collegamento sia stato aggiunto correttamente:

```bash
git remote -v
```

Se stai partendo da zero, questo e il momento giusto anche per creare un file `.gitignore`, utile per escludere file che non vuoi caricare su GitHub.

## 5. Salvare il codice su GitHub

Una volta collegato il progetto, puoi iniziare a salvare le modifiche online.

Il flusso base e questo:

```bash
git add .
git commit -m "Aggiunta guida su GitHub"
git push origin main
```

Vediamo cosa fanno questi tre comandi:

- `git add .` prepara tutti i file modificati
- `git commit -m "..."` crea un salvataggio con un messaggio descrittivo
- `git push origin main` invia i commit su GitHub

Se e il primo invio e il branch principale si chiama `main`, questo comando andra bene nella maggior parte dei casi. Se il tuo branch ha un nome diverso, sostituiscilo.

Un buon commit message dovrebbe spiegare in poche parole cosa hai cambiato. Alcuni esempi:

- `Aggiunge la pagina contatti`
- `Corregge il layout mobile`
- `Aggiorna la guida GitHub`

## 6. Comandi Git essenziali da conoscere

All'inizio non hai bisogno di imparare decine di comandi. Te ne bastano pochi, ma capiti bene.

### Controllare lo stato del progetto

```bash
git status
```

Ti mostra quali file sono stati modificati, quali sono pronti per il commit e quali non sono ancora tracciati.

### Aggiungere i file al prossimo commit

```bash
git add .
```

Se vuoi aggiungere un solo file:

```bash
git add nomefile.html
```

### Creare un commit

```bash
git commit -m "Messaggio del commit"
```

Il commit e come una fotografia del progetto in quel momento.

### Inviare le modifiche su GitHub

```bash
git push origin main
```

### Scaricare gli aggiornamenti da GitHub

```bash
git pull origin main
```

Questo comando e utile quando lavori da un altro computer o quando il repository online e stato aggiornato.

### Vedere la cronologia dei commit

```bash
git log --oneline
```

Ti permette di leggere rapidamente la lista dei salvataggi fatti nel tempo.

## 7. Errori comuni da evitare

Quando inizi con Git e GitHub, alcuni errori capitano spesso:

- fare `git add .` senza controllare cosa stai caricando
- scrivere messaggi di commit troppo generici come `update`
- dimenticare il `git pull` quando lavori da piu dispositivi
- non configurare correttamente la chiave SSH
- caricare file inutili o pesanti che dovevano stare nel `.gitignore`

Il consiglio pratico e semplice: lavora con calma, usa spesso `git status` e fai commit piccoli e chiari.

## 8. Conclusione

Imparare GitHub all'inizio puo sembrare tecnico, ma dopo i primi utilizzi diventa una parte naturale del lavoro. Il vantaggio piu grande e che inizi a gestire il progetto in modo ordinato, sicuro e professionale, anche se stai costruendo un sito semplice.

Se hai seguito anche il video, questa guida ti puo servire come riferimento rapido ogni volta che devi:

- creare un nuovo repository
- collegare un progetto locale
- configurare l'SSH
- fare commit e push delle modifiche

Nella prossima guida puoi continuare il flusso di lavoro passando alla pubblicazione o all'evoluzione del progetto verso una struttura piu moderna.

## Comandi riassunti

```bash
ssh-keygen -t ed25519 -C "example@mail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com

git init
git remote add origin git@github.com:tuo-username/diarycar.git
git status
git add .
git commit -m "Aggiunta guida su GitHub"
git push origin main
git pull origin main
git log --oneline
```