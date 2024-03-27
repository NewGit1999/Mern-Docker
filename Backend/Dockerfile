# Utilise une image Node.js en tant que base
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /app/Backend

# Copie le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers dans le répertoire de travail
COPY . .

# Expose le port sur lequel le serveur Express écoute
EXPOSE 3001

# Commande pour exécuter l'application lorsque le conteneur démarre
CMD ["node", "server.js"]

