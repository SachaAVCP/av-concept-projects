# Guide de Contribution

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation
```bash
git clone [URL_DU_REPO]
cd av-concept-projects
npm install
npm run dev
```

## 🌿 Workflow Git

### Structure des Branches
- `main` : Production stable
- `develop` : Développement principal
- `feature/*` : Nouvelles fonctionnalités
- `bugfix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes

### Processus de Contribution

1. **Créer une branche feature**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nom-de-la-feature
   ```

2. **Développer et tester**
   ```bash
   npm run dev
   npm run test
   npm run lint
   ```

3. **Commiter avec des messages clairs**
   ```bash
   git add .
   git commit -m "feat: ajouter module de gestion des projets"
   ```

4. **Pousser et créer une PR**
   ```bash
   git push origin feature/nom-de-la-feature
   ```

### Convention de Nommage des Commits
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

## 🧪 Tests

### Lancer les tests
```bash
npm run test          # Tests unitaires
npm run test:ui       # Interface de test
npm run test:coverage # Couverture de code
```

### Écrire des tests
- Tests unitaires dans `src/**/*.test.tsx`
- Tests d'intégration dans `tests/`
- Couverture minimale : 80%

## 📝 Standards de Code

### ESLint et Prettier
```bash
npm run lint          # Vérifier le code
npm run lint:fix      # Corriger automatiquement
```

### Structure des Fichiers
```
src/
├── components/       # Composants réutilisables
├── pages/           # Pages principales
├── hooks/           # Hooks personnalisés
├── context/         # Contextes React
├── types/           # Types TypeScript
├── utils/           # Utilitaires
└── data/            # Données de démonstration
```

### Conventions TypeScript
- Interfaces avec préfixe `I` : `IProject`
- Types avec préfixe `T` : `TStatus`
- Enums en PascalCase : `ProjectStatus`

## 🎨 Guidelines UI/UX

### Design System
- Utiliser les composants de `src/components/ui/`
- Respecter la palette de couleurs Tailwind
- Suivre les principes d'accessibilité (WCAG 2.1)

### Responsive Design
- Mobile-first approach
- Breakpoints : sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔧 Configuration

### Variables d'Environnement
Créer `.env.local` :
```env
VITE_APP_NAME=AV Concept Projects
VITE_API_URL=http://localhost:3001
VITE_ENVIRONMENT=development
```

### Hooks de Pre-commit
```bash
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"
```

## 📋 Checklist PR

- [ ] Code testé et fonctionnel
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Pas de warnings ESLint
- [ ] Build réussi
- [ ] Interface responsive
- [ ] Accessibilité vérifiée

## 🐛 Signaler un Bug

### Template d'Issue
```markdown
**Description du bug**
Description claire et concise du problème.

**Étapes pour reproduire**
1. Aller à '...'
2. Cliquer sur '....'
3. Voir l'erreur

**Comportement attendu**
Description du comportement attendu.

**Screenshots**
Si applicable, ajouter des captures d'écran.

**Environnement**
- OS: [ex. iOS]
- Navigateur: [ex. chrome, safari]
- Version: [ex. 22]
```

## 💡 Proposer une Fonctionnalité

### Template de Feature Request
```markdown
**Problème à résoudre**
Description claire du problème que cette fonctionnalité résoudrait.

**Solution proposée**
Description claire de la solution souhaitée.

**Alternatives considérées**
Description des alternatives envisagées.

**Contexte additionnel**
Tout autre contexte ou captures d'écran.
```

## 📚 Ressources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Outils Recommandés
- **IDE** : VS Code avec extensions React/TypeScript
- **Browser** : Chrome DevTools
- **Design** : Figma pour les maquettes

## 🤝 Code de Conduite

### Nos Engagements
- Respecter tous les contributeurs
- Fournir un environnement accueillant et inclusif
- Accepter les critiques constructives
- Se concentrer sur l'amélioration du projet

### Standards
- Utiliser un langage accueillant et inclusif
- Respecter les différents points de vue
- Accepter gracieusement les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté

---

**Merci de contribuer à AV Concept Projects ! 🚀**

