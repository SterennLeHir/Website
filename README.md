# Website

## Présentation du projet
Le but de ce projet est la migration de notre application web NestJS/Angular vers une architecture type "micro-service", en utilisant la conteneurisation Docker.
A l'origine, cette application permet, entre autres, la création, l'enregistrement, la recherche et la modification d'utilisateurs et d'associations (pour en savoir plus cliquez [ici](https://github.com/SterennLeHir/Website/blob/main/front/README.md)).
On souhaite pouvoir lui rajouter d'autres services.

## Schéma de l'architecture
Vous trouverez ci-dessous un schéma de notre architecture "micro-service".

![schema](https://github.com/SterennLeHir/Website/blob/main/img/structure.png)

![](images/structure.png)
## Liste des services

### Terminés
* Serveur HTTP + Front

Pour le mode de fonctionnement production, nos services Angular et Nginx sont fusionnés en un seul service car nous avons fait le choix de copier notre build du front-end Angular dans notre serveur Nginx. Ainsi on gagne en performances car on évite des requêtes inutiles entre le serveur Nginx et Angular.

* Back
  
En mode production, le service backend, codé en NestJS, communique avec le frontend et la base de donnée. On utilise la commande node dist/main.js
En mode développement, on utilise la commande npm run start:dev pour que les modifications soient prises en compte en temps réel et rebuild automatiquement le serveur et donc l'application. On utilise dans ce cas un bind-mount.

* BDD

La base de donnée, implémentée par Postgres, permet la persistance des données. Elle communique avec le backend. On sauvegarde les donnnées par l'utilisation d'un volume. 
Nous avons choisi Postgres car c'est une base de données opensource, bien documentée et maintenue par la communauté et qui, de plus, est performante et sécurisée.

* Mode développement et production

Pour le mode développement, nous avons fait un nouveau docker compose nommé `docker-compose.dev.yml` et une nouvelle configuration pour le serveur Http `nginx-dev.conf`. Dans certains Dockerfile (back et Nginx), nous avons deux images, une pour la production (AS prod) et une pour le développement (AS dev). Nous indiquons l'image à construire dans le `docker-compose.dev.yml` avec `target : dev`. Nous avons eu énormément de soucis pour le mode de développement. Nous voulions créer un bind-mount avec le front pour lier notre dossier src. Cependant, en modifiant un élément, la modification ne se réalisait pas. En demandant à des camarades, ils nous ont indiqué faire un service à part pour le front-end et en faisant la même chose, nous avions une erreur 502 en se connectant au localhost et d'autres erreurs. Le serveur nginx n'arrivait pas à rediriger vers le service front et cherchait les fichiers .html dans son dossier usr/share/nginx/html. Nous avons donc combiné les deux méthodes, mettre notre front-end dans le nginx comme pour le mode production et garder le proxy-pass. Cela fonctionne. Nous avons également utilisé le bind-mount pour pouvoir modifier le back-end. 

### En cours
Nous allons détailler ici les services que nous avons essayé de fournir mais pour lesquels nous ne sommes pas parvenus au bout à cause de nombreuses erreurs que nous n'avons pas réussi à comprendre et régler. Chaque service à sa propre branche où vous pouvez aller voir notre travail. 

* Notifications

Pour le système de notifications avec Quarkus, nous avons repris le projet mailer du get started de Quarkus. Nous avons ensuite inséré RabbitMQ dans notre projet back-end. Nous avons eu beaucoup d'erreurs à ce niveau là. Des dépendances n'étaient pas installées, chose que nous avons ajouté dans le Dockerfile de l'image pour le back. Nous avons ajouté du code à notre service users pour envoyer un mail à la création d'un compte. Cependant, au lancement du docker compose, nous avions cette erreur : `The attribute `queue.name` on connector 'smallrye-rabbitmq' (channel: mail) must be set`. Cependant, cette propriété était indiquée dans le fichier application.properties dans le dossier quarkus/src/main/ressources. Nous ne pouvions alors pas construire tous les containers.
On a choisi RabbitMQ car il permet la communication asynchrone entre les composants, plutôt intéressant dans une application découplée en plusieurs micro-services, et qu'il offre une prise en charge de nombreux langages de programmation.

* Load Testing

Pour le load testing, nous avons voulu utilisé k6 et grafana. Cependant, même en se documentant sur grafana, nous n'avons pas réussi à le faire fonctionner avec tous les autres containers. Nous réussissions à accéder sur la page de login de grafana en lançant uniquement l'image de grafana, mais cela ne fonctionnait pas avec notre docker-compose. 
On a choisi Grafana car il offre une visualisation puissante des métriques et des données, permettant de surveiller en temps réel nos micro-services. En parallèle, K6 est un outil de test qui permet de simuler des charges réalistes sur nos micro-services pour évaluer leur résilience.

## Fuzzing

Le fuzzing est une méthode de test consistant à envoyer des données aléatoires à certains endroits d'un projet (formulaire, paramètres de fonction, requête http...) et d'observer les résultats. Cela permet notamment de tester la résilience du système tout en trouvant de nouveaux bugs auxquels on aurait pas pensé. 

Dans ce projet, on fait le choix de tester les fonctions TypeScript du front-end et on utilisera l'outil "Jazzer.js" pour la génération et l'automatisation de ces tests.

## Canary testing

Le canary testing permet le déploiement d'une version mise à jour du projet à une petite proportion des utilisateurs finaux. Cela permet de tester la dernière version de notre application dans un réel environnement de production, tout en réduisant les risques car peu d'utilisateurs seront touchés. 

Pour implémenter le canary testing dans notre application, nous aurons besoin de :
- la version d'origine de l'application
- la nouvelle version de l'application : dans notre cas on modifiera le service front uniquement
- une redirection vers ces applications : notre serveur nginx redirige les utilisateurs soit vers l'ancienne soit ver la nouvelle application

On fait le choix de rediriger 10% des utilisateurs vers la nouvelle application.

## Comment utiliser l'application

1. Cloner ce projet Github sur votre machine personnelle
2. Installer Docker : https://docs.docker.com/get-docker/

* Mode production
3. Ouvrir le projet et exécuter la commande :
```
docker compose up
```
* Mode développement
3. Ouvrir le projet et exécuter la commande :
```
docker compose -f docker-compose.dev.yml up
```

## Sécurité
Nous avons fait le choix de n'exposer que le serveur http Nginx sur Internet car il peut embarquer le protocole https pour communiquer avec le navigateur, qui encrypte tous les échanges. Le reste de l'architecture échange alors en clair car les serveurs se situent sur un réseau privé. 

## Feedback sur le module Architecture Logicielle
Pendant les cours magistraux, nous avons pu énormément développer notre culture générale. Nous avons discuté de nombreux aspects intéressants en informatique (licences open sources, micro-services, etc). 
Cependant, il nous a manqué du temps et de la connaissance pour réussir ce projet. Même en se documentant sur les sites officiels, sur des forums avec le code de nos erreurs, nous ne sommes pas parvenus à régler nos soucis, ce qui est très frustrant. 
