# Project A

La refonte d'Assomaker est un projet qui depuis quelques années est dans les discussions. 
Le logiciel devient vieux et les technologies utilisées associé au manque de documentation
rends la maintenance et l'exploitation assez difficile. L'objectif de ce projet est, en 
plus de reproduire les fonctions essentielles d'Assomaker, de mettre au goût du jour les
technologies utilisées.

L'objectif principal s'accompagne d'un ajout d'une partie logistique permettant une gestion du matériel.
Une nouvelle interface au _workflow_ plus intuitif permettra aux utilisateurs de pouvoir très rapidement
créer, afficher ou affecter.

### Technologies
Les langages web actuels (en 2019) sont principalement Javascript, Python ou Java. Le choix de Javascript a été
motivé par le fait d'avoir le _front-end_ et le _back-end_ dans le même langage, étant assez facilement compréhensible
pour quiconque ait un minimum de compétence en programmation web.
Les technologies utilisées sont pour l'API :
+ _Express_ : ce framework web permet de structurer le serveur web, en permettant de créer des requêtes très facilement, 
tout en étant très efficace.
+ _Sequelize_ : cet ORM (_Object-Relationnal Manager_) permet d'avoir une surcouche gérant les intéractions avec la base de données.
Il permet aussi de rendre le code plus facilement lisible, et donc plus facilement maintenable. De plus, si jamais on doit changer
 de moteur de base de données, le changement se fait de façon transparente.

Pour l'application web :
+ _VueJS_ : ce framework de front-end permet de construire rapidement des applications avec une logique de composants réutilisables. 
On l'as choisi car il permet d'avoir une arborescence compréhensible tout en ayant une complexité suffisante pour notre projet.

### Lancer le projet

Le projet se sépare en deux processus, le serveur d'API et le serveur de l'appweb. 
+ Pour lancer le serveur d'API il faut aller dans `/api/server/` et lancer le fichier `index.js`. On utilise soit `nodemon` 
en situation de dev avec la commande `nodemon index.js`.
Sinon en situation de prod, on peut utiliser `forever`, 
avec une option de logs : `forever start index.js -o <fichier d'output> -e <fichier d'erreur>`.

+ Pour lancer le serveur de l'appweb il faut aller dans `/appweb/` et utiliser la commande `npm run serve`.