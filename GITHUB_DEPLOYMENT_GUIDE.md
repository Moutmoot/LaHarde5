# 🚀 Guide de déploiement GitHub Pages - La Harde

## 📋 Instructions étape par étape

### Étape 1 : Préparer votre version statique

Votre version statique est prête dans le dossier `/app/frontend-static/` avec :
- ✅ Toutes les données codées en dur (événements, galerie, statistiques)
- ✅ Formulaires en mode démo
- ✅ Compatible GitHub Pages
- ✅ Design identique à la version complète

### Étape 2 : Créer un repository GitHub

1. **Connectez GitHub à Emergent :**
   - Cliquez sur votre profil → "Connect GitHub"
   - Autorisez les permissions

2. **Sauvegardez le code :**
   - Utilisez "Save to GitHub" dans Emergent
   - Créez un nouveau repository nommé `la-harde` ou `laharde-website`

### Étape 3 : Structure pour GitHub Pages

Votre repository doit contenir (copier depuis `/app/frontend-static/`) :

```
votre-repo/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── .gitignore
```

### Étape 4 : Configurer le déploiement

1. **Modifier package.json :**
   Remplacez `VOTRE-USERNAME` par votre nom GitHub :
   ```json
   "homepage": "https://VOTRE-USERNAME.github.io/la-harde"
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

### Étape 5 : Déployer

1. **Commande de déploiement :**
   ```bash
   npm run deploy
   ```

2. **Activer GitHub Pages :**
   - Repository Settings → Pages
   - Source : "Deploy from a branch"
   - Branch : `gh-pages`
   - Folder : `/ (root)`

### Étape 6 : Accéder à votre site

Votre site sera disponible à :
`https://VOTRE-USERNAME.github.io/la-harde`

## 🔧 Personnalisation post-déploiement

### Modifier les données

Dans `src/App.js`, modifiez l'objet `STATIC_DATA` :

```javascript
const STATIC_DATA = {
  stats: {
    total_inscriptions: 23,  // ← Changez ces valeurs
    membres_actifs: 23,
    evenements_a_venir: 4,
    total_photos: 15
  },
  events: [
    // ← Ajoutez/modifiez vos événements
  ],
  photos: [
    // ← Ajoutez/modifiez vos photos
  ]
};
```

### Ajouter de vraies photos

1. **Méthode 1 : URLs externes**
   - Utilisez Unsplash, vos propres hébergements
   - Remplacez les URLs dans `STATIC_DATA.photos`

2. **Méthode 2 : Fichiers locaux**
   - Ajoutez images dans `/public/images/`
   - Utilisez `"/images/mon-image.jpg"` dans le code

### Personnaliser les couleurs

Dans `tailwind.config.js` :
```javascript
colors: {
  'roller-red': '#dc2626',    // ← Votre couleur principale
  'roller-yellow': '#eab308'  // ← Votre couleur secondaire
}
```

## 📝 Maintenance

### Mettre à jour le site

1. Modifiez le code localement
2. Testez avec `npm start`
3. Déployez avec `npm run deploy`

### Ajouter un domaine personnalisé

1. Repository Settings → Pages → Custom domain
2. Entrez votre domaine (ex: `laharde.fr`)
3. Configurez vos DNS chez votre hébergeur

## ⚠️ Limitations de la version statique

### Ce qui fonctionne :
- ✅ Affichage de toutes les pages
- ✅ Navigation entre sections
- ✅ Design responsive
- ✅ Galerie avec filtres
- ✅ Calendrier des événements

### Ce qui est en démo :
- 🔶 Formulaires d'inscription (affiche un message mais ne sauvegarde pas)
- 🔶 Formulaires de contact (affiche un message mais n'envoie pas d'email)
- 🔶 Statistiques statiques (ne se mettent pas à jour automatiquement)

## 🎯 Pour un site complètement fonctionnel

Si vous voulez des formulaires qui marchent réellement :

1. **Solution simple :** Utilisez des services comme :
   - Formspree.io
   - Netlify Forms
   - Google Forms

2. **Solution avancée :** Ajoutez un backend :
   - Revenez à la version Emergent complète
   - Ou utilisez Vercel + Supabase
   - Ou Firebase

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Erreurs de build :** Vérifiez que toutes les dépendances sont installées
2. **Page blanche :** Vérifiez le chemin `homepage` dans package.json
3. **GitHub Pages n'active pas :** Vérifiez que la branche `gh-pages` existe

## 🎉 Félicitations !

Vous avez maintenant un site web professionnel pour votre club de roller derby, hébergé gratuitement sur GitHub Pages !

**URL de votre site :** `https://VOTRE-USERNAME.github.io/la-harde`