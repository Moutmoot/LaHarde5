# La Harde - Roller Derby Club (Version Statique)

Site web officiel du club de roller derby **La Harde** - Version statique compatible GitHub Pages.

## 🛼 À propos

La Harde est un club de roller derby inclusif et passionné basé à Paris. Ce site présente notre équipe, nos entraînements, événements et galerie photos.

## 🚀 Déploiement sur GitHub Pages

### Prérequis
- Node.js et npm installés
- Compte GitHub

### Étapes de déploiement

1. **Forker/Cloner ce repository**
```bash
git clone https://github.com/VOTRE-USERNAME/la-harde.git
cd la-harde
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer le déploiement**
- Modifiez le champ `homepage` dans `package.json` :
```json
"homepage": "https://VOTRE-USERNAME.github.io/VOTRE-REPO-NAME"
```

4. **Déployer sur GitHub Pages**
```bash
npm run deploy
```

Cette commande :
- Construit l'application (`npm run build`)
- Pousse le dossier `build` vers la branche `gh-pages`
- Active automatiquement GitHub Pages

5. **Activer GitHub Pages** (si pas automatique)
- Allez dans Settings > Pages de votre repository
- Source : Deploy from a branch
- Branch : gh-pages / (root)

## 📁 Structure du projet

```
la-harde/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Composant principal
│   ├── App.css         # Styles personnalisés
│   ├── index.js        # Point d'entrée
│   └── index.css       # Styles globaux
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Fonctionnalités

- ✅ **Page d'accueil** avec présentation du club
- ✅ **Section événements** avec calendrier
- ✅ **Galerie photos** avec filtres par catégorie
- ✅ **Formulaires de contact** et d'inscription (démo)
- ✅ **Design responsive** (mobile/desktop)
- ✅ **Navigation fluide** entre sections
- ✅ **Thème roller derby** (rouge/jaune)

## 🔧 Version statique

Cette version est optimisée pour GitHub Pages :
- ❌ Pas de backend (FastAPI supprimé)
- ❌ Pas de base de données (MongoDB supprimé)
- ✅ Données codées en dur dans le code
- ✅ Formulaires en mode démo
- ✅ Compatible hébergement statique

## 🛠️ Scripts disponibles

```bash
npm start          # Serveur de développement
npm run build      # Construction pour production
npm run deploy     # Déploiement GitHub Pages
npm test           # Tests (si configurés)
```

## 📝 Personnalisation

### Modifier les données

Toutes les données (événements, photos, statistiques) sont dans `src/App.js` dans l'objet `STATIC_DATA`.

### Changer les couleurs
Modifiez `tailwind.config.js` et `src/App.css` pour personnaliser les couleurs.

### Ajouter des images
Utilisez des URLs d'images externes (Unsplash, etc.) ou ajoutez des fichiers dans `public/`.

## 🌐 Exemple en ligne

Une fois déployé, votre site sera accessible à :
`https://VOTRE-USERNAME.github.io/VOTRE-REPO-NAME`

## 📞 Contact

- **Email** : contact@laharde.fr
- **Téléphone** : 06 12 34 56 78
- **Adresse** : Gymnase Municipal, 123 Rue du Sport, 75000 Paris

## 📄 Licence

© 2025 La Harde - Roller Derby Club. Tous droits réservés.

---

🛼 **Rejoignez La Harde et découvrez le roller derby !**