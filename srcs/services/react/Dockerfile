    # Utiliser Node léger
    FROM node:20-slim

    # Créer le répertoire de travail dans le conteneur
    WORKDIR /frontend_plateforme

    # Copier uniquement les fichiers de dépendances
    COPY frontend_plateforme/package-lock.json ./
    COPY frontend_plateforme/package.json ./

    RUN ls -l /frontend_plateforme
    RUN cat /frontend_plateforme/package.json

    # Installer les dépendances
    RUN npm install

    COPY frontend_plateforme ./

    # Exposer le port React
    EXPOSE 3000

    # Démarrer l'application
    CMD ["npm", "run", "dev"]