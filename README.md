## 🛍️ Simple ecommerce cart application [![CircleCI](https://circleci.com/gh/jeffersonRibeiro/react-shopping-cart.svg?style=svg)](https://circleci.com/gh/jeffersonRibeiro/react-shopping-cart)

<p align="center">

  <img src="./readme-banner.png">
</p>

## Basic Overview - [Live Demo](https://react-shopping-cart-67954.firebaseapp.com/)

<p align="left">

  <img src="./work-in-the-netherlands.png" width="380" height="90">
</p>

✈️ [Follow Jeremy Akeze](https://www.linkedin.com/in/jeremy-akeze-9542b396/)

This simple shopping cart prototype shows how React with Typescript, React hooks, react Context and Styled Components can be used to build a friendly user experience with instant visual updates and scaleable code in ecommerce applications.

#### Features

- Add and remove products from the floating cart using Context Api
- Filter products by available sizes using Context Api
- Responsive design

<!--
## Getting started

Try playing with the code on CodeSandbox :)

[![Edit app](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/74rykw70qq)
 -->

## Build/Run

#### Requirements

- Node.js
- NPM

```javascript

/* First, Install the needed packages */
npm install

/* Then start the React app */
npm start

/* To run the tests */
npm run test

```

### Copyright and license

The MIT License (MIT). Please see License File for more information.

<br/>
<br/>

<p align="center"><img src="http://www.jeffersonribeiro.com/assets/img/apple-icon-180x180.png" width="35" height="35"/></p>
<p align="center">
<sub>A little project by <a href="http://www.jeffersonribeiro.com/">Jefferson Ribeiro</a></sub>
</p>

## Rapport de Contribution - Benjamin

Dans le cadre de ce projet universitaire, mon rôle a été de développer les fonctionnalités liées à la finalisation de commande et à l'administration, en ajoutant des fonctionnalités avancées sur une base existante.

### 1. Page Checkout (Commande)

J'ai conçu et implémenté la page de checkout qui permet à l'utilisateur de valider son panier.

- **Résumé de commande** : Affichage clair des articles, du total et des options.
- **Autocomplétion d'adresse** : Intégration de l'**API Adresse du gouvernement (api-adresse.data.gouv.fr)** pour faciliter la saisie de l'adresse de livraison (autocomplétion de la ville et de l'adresse).
- **Persistance des données** : Contraint par l'absence de backend, j'ai mis en place un système de stockage des commandes via le **LocalStorage** du navigateur, simulant ainsi un enregistrement en base de données.

### 2. Page Admin

J'ai créé une interface d'administration pour visualiser les commandes passées.

- **Récupération des commandes** : Lecture des données stockées dans le LocalStorage pour afficher l'historique des commandes.
- **Gestion** : Visualisation des détails de chaque commande (client, produits, total).
- **Suppression** : Option de suppression des commandes pour nettoyer l'historique.
