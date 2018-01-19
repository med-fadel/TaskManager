<h1>TaskManager</h1>
Realiser par : 
**Fadel Mohammed** &lt;meddevlopp@gmail.com&gt;
* [DEV94](https://github.com/DEV94)

Cette application permet de gérer les tâches, groupes de tâches et les utilisateur dévlopper en JavaScript sous le Runtime NodeJs et AngularJs pour la gestion des écrans (SPA) , pour le stockage j'ai utiliser la base NoSql MongoDB.
La connexion entre le client web et les services web se fait en SSL et l'application contient des mechanisme contre les attaque DDOS, Sql Injection , etc ....

Cette application se structure en deux silos 'taskSilo.js' pour la gestion des tâches et les groupes de tâches et 'userSilo.js' pour gérer les utilisateurs, ces deux orchestrés par un pilot 'app.js' qui permet de recevoir les requêtes depuis le client et les aiguillées vers les silos et récupéré les résultats.


# Table of Contents

* [Install](#install)
* [Usage](#usage)

## Install
Pour installer il faut recupérer le ficheir 'package.json' puis lancer la commande : 

```console
$ npm install
```
et pour initialiser la stucture de données il faut executer le script d'install apres la modification de l'url du serveur de la base de données.

changer l'url dans le fichier install.js dans la racine.
```
var url = 'mongodb://localhost/';
```
puis lancer le scripte

```console
$ node install.js
```


## Usage

Alors pour utiliser cette application il faut lancer les silos et le pilote.

pour de démarer les silos, il faut se placer dans la racine puis executer les commande suivante :

```console
$ node userSilo.js
```
puis

```console
$ node taskSilo.js
```

et pareil pour le pilote : 

```console
$ node app.js
```

puis aller vers l'URL https://localhost.com pour que vous puissiez commencer l'utilisation de l'application.

il faut créer un compte et se connecter pour avoir l'access au autres fonctionnalité de l'application.