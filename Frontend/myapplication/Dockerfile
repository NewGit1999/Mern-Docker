# Utilise une image Node.js en tant que base
FROM node:14

# Définit le répertoire de travail dans le conteneur
WORKDIR /app/frontend/myapplication

# Copie le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers dans le répertoire de travail
COPY . .

# Expose le port sur lequel le serveur de développement React écoute
EXPOSE 3000

# Commande pour exécuter l'application lorsque le conteneur démarre
CMD ["npm", "start"]

