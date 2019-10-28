# TaskManager

Realiser par : 

* [DEV94](https://github.com/DEV94) - **Fadel Mohammed** &lt;meddevlopp@gmail.com&gt;


Gestionnaire de tâche


# Table of Contents

* [Pré-requis](#requires)
* [Install](#install)
* [Usage](#usage)

## Requires
Les pré-requis pour commencer l'installation sont:

  * Node.js 6.0.0 ou superieur, pour télécharger : https://nodejs.org/en/download/releases/
  * MongoDB 3.6.2 ou superieur, pour télécharger et installer : https://docs.mongodb.com/manual/installation/
  * Mozilla Firefox ou Google Chrome avec leurs dernieres versions.

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
