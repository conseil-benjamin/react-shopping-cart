# 🛒 E-Commerce Platform - React & TypeScript

**Projet Master 1 Informatique : Parcours Ingénierie Logicielle (IL)** **ISTIC - Université de Rennes**

---

### 👥 Auteurs

- **Benjamin CONSEIL** (n° 23100903)
- **Antoine DEBRAY** (n° 26100468)
- **Formation :** M1 IL Alternance

---

## 📝 Contexte du Projet

Dans le cadre de l'UE Développement Web, ce projet suit l'**Option 3** : nous sommes partis d'une base existante (_React Shopping Cart_) pour y injecter de nouvelles fonctionnalités majeures.

**Contrainte majeure :** Le projet se concentre exclusivement sur le **Front-end**. Nous exploitons des services tiers et des API publiques pour simuler un écosystème complet sans modification de backend.

---

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

# Antoine DEBRAY

### 1. Optimisation de la Page d'Accueil (Recherche & Filtrage)

L'expérience utilisateur sur la page principale a été enrichie par l'ajout d'outils de navigation et de tri performants :

- **Barre de Recherche** : Intégration d'un composant `SearchBar` permettant un filtrage dynamique des produits par leur titre.
- **Système de Filtres Avancés** : Création d'un composant `Filter` regroupant plusieurs critères :
  - **Filtrage par catégorie** : Permet de cibler précisément les types de produits souhaités.
  - **Tri dynamique** : Options pour trier par prix (croissant/décroissant) ou par les articles les mieux notés.
  - **Plage de prix** : Champs de saisie Min/Max pour adapter les résultats au budget de l'utilisateur.
  - **Note minimale** : Filtrage par évaluation via une interface de boutons interactifs.

### 2. Page de Détails du Produit

Mise en œuvre d'une vue détaillée complète accessible via un routage dynamique (`/product/:id`) :

- **Informations Complètes** : Affichage de l'image, de la description, de la note moyenne et du prix formaté de l'article sélectionné.
- **Algorithme de Suggestion** : Une section "Vous aimerez aussi" affiche automatiquement jusqu'à 4 produits de la même catégorie pour encourager la découverte.
- **Navigation Intuitive** : Ajout d'un bouton de retour à la boutique et gestion du défilement automatique vers le haut (Scroll to top) lors du changement de produit.

### 3. Architecture Technique

- **Routage** : Utilisation de `BrowserRouter` de `react-router-dom` pour une navigation fluide sans rechargement de page.
- **Gestion d'État (Context API)** : Centralisation des données de produits et des filtres via `ProductsProvider` pour assurer la cohérence entre les différents composants (Recherche, Filtres et Grille de produits).

API :

- Utilisation de fakestoreapi.com

Pages :

- Page détail d'un produit (/ product /: id) avec possibilité d'ajouter au panier. (Antoine)
- Page commander (/ checkout) avec formulaire de commande et résumé du panier. (Avec autocomplétion des adresses via l'API Google Places) (Benjamin)
- Page admin (Benjamin)
- Filtre et barre de recherche sur la page d'accueil. (Antoine)
