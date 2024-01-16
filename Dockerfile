# Usa un'immagine di Node.js come base
FROM node:20

# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia i file necessari per l'emulazione (aggiungi altri file necessari)
COPY firebase.json .
COPY firestore.rules .

# Installa il Firebase CLI
RUN npm install -g firebase-tools

# Espone la porta necessaria per l'emulazione (sostituisci '9000' con la tua porta effettiva)
EXPOSE 8888

# firebase emulators:start --only firestore,storage

# Comando di avvio dell'emulazione
CMD ["firebase", "emulators:start", "--only", "firestore"]
