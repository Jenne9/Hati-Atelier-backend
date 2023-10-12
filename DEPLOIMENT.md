# COMMENT DEPLOYER L'API

Cloner l'api depuis le dépôt git

Créer à la racine un fichier .env avec ces infos : 
    - MONGODB_URI=""
    - LOG_LEVEL=""
    - JWT_SECRET=
    - JWT_EXPIRY=

Créer à la racine un fichier .gitignore avec ces infos :
    - .env
    - node_modules/

Dans un terminal : npm install