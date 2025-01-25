# Utilisez une image Node.js pour construire l'application
FROM node:20 AS builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers du projet
COPY . .

# Construisez l'application Next.js
RUN npm run build

# Utilisez une image légère pour l'exécution
FROM node:20-alpine

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de package.json et package-lock.json
COPY package*.json ./

# Installez uniquement les dépendances de production
RUN npm install --only=production

# Copiez les fichiers construits depuis l'étape de construction
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exposez le port sur lequel Next.js écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]