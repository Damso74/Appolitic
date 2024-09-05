# Appolitic

**Appolitic** est une application conçue pour aider les utilisateurs à mieux comprendre leur alignement politique en répondant à des questions et en obtenant des résultats basés sur les différentes positions des partis politiques en France.

## Fonctionnalités

- **Test Politique Personnalisé** : L'utilisateur répond à une série de questions politiques couvrant divers domaines tels que l'écologie, l'économie, la société, la sécurité, etc.
- **Analyse et Alignement** : L'application attribue des points aux réponses en fonction de leur alignement avec les positions des partis politiques majeurs en France.
- **Résultats Détaillés** : L'utilisateur reçoit une évaluation détaillée qui montre les partis politiques les plus proches de ses idées, en évitant toute influence biaisée.
- **Neutralité et Transparence** : Aucune réponse ne favorise un parti en particulier ; les résultats sont basés sur une analyse objective.

## Installation

### Pré-requis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version 14 ou plus récente)
- **npm** (gestionnaire de paquets Node.js)

### Étapes d'installation

1. Clonez le dépôt GitHub sur votre machine locale :

   ```bash
   git clone https://github.com/Damso74/Appolitic.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd Appolitic
   ```

3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ```

4. Lancer l'application en mode développement :

   ```bash
   npm start
   ```

L'application sera accessible à l'adresse : `http://localhost:3000`

## Utilisation

1. **Démarrage du Test** : Une fois l'application ouverte, l'utilisateur peut démarrer le test en répondant aux questions dans différentes catégories.
2. **Analyse des Réponses** : Chaque question propose 5 options avec une réponse neutre (Option "Je ne sais pas"). L'application analyse les réponses pour attribuer une note à chaque parti politique.
3. **Résultats** : À la fin du test, l'utilisateur voit un graphique et des informations détaillées sur les partis les plus alignés avec ses idées.

## Technologies Utilisées

- **Frontend** : React.js
- **Backend** : Node.js avec Express.js
- **Base de données** : MongoDB
- **Design** : Palette de couleurs mauve et gris clair pour une apparence moderne et professionnelle.

## Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations ou signaler des bugs :

1. Forkez ce dépôt
2. Créez une nouvelle branche (`git checkout -b feature/nom_de_votre_branche`)
3. Commitez vos modifications (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nom_de_votre_branche`)
5. Créez une Pull Request

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.
