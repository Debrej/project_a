# API

## Documentation
La documentation de l'api se situe à l'adresse suivante :
[Documentation Postman](https://documenter.getpostman.com/view/5897764/SVtR3B88?version=latest "Documentation Postman")

## Technologies
Les technologies utilisées sont :
+ Express, qui sert de serveur web, [site officiel](https://expressjs.com)
+ Sequelize, qui sert d'ORM, [site officiel](https://sequelize.org/)

## Installation et lancement
Pour installer l'API :
`npm install`.

Pour créer la base de données :
`sudo npm run create_database`.
Si on ne lance pas le script avec `sudo` ou avec root, on ne peut pas se connecter à MySQL en root.

Pour lancer l'API :
`npm start index.js` ou `nodemon index.js`.
Au niveau du serveur à distance, on utilise [pm2](https://pm2.keymetrics.io/) qui est un gestionnaire de processus 
permettant de facilement les gérer ainsi que d'ajouter du load-balancing. 
On y ajoute le plugin [pm2-logrotate](https://www.npmjs.com/package/pm2-logrotate) pour limiter la taille des fichiers de log.
Pour utiliser pm2 : `pm2 start index.js`.