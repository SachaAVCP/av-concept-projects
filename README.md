# Application de Gestion de Projets AV Concept Products

## 🎯 Description
Application web moderne pour la gestion de projets d'installation de systèmes audiovisuels home cinéma. Cette application remplace les fichiers Excel actuels et digitalise les processus de planification, coordination et suivi des équipes techniques.

## 🏗️ Architecture
- **Frontend** : React 18+ avec TypeScript
- **Routing** : React Router v6
- **State Management** : React Context API + useReducer
- **UI Framework** : Tailwind CSS + Headless UI
- **Calendrier** : React Big Calendar
- **Build Tool** : Vite
- **Persistance** : localStorage (Phase 1) → API REST (Phase 2)

## 📋 Modules Principaux

### 1. Dashboard
- Métriques clés et indicateurs de performance
- Vue d'ensemble des projets actifs
- Alertes et notifications
- Aperçu du planning hebdomadaire

### 2. Gestion des Projets
- Création et suivi de projets clients
- Checklist interactive de 26 tâches (phases A/B/C/E)
- Assignation automatique des techniciens
- Gestion des dépendances entre tâches

### 3. Planning Interactif
- Calendrier multi-vues (mensuel, hebdomadaire, journalier)
- Événements multi-jours avec assignation multiple
- Drag & drop pour optimisation
- Détection automatique des conflits

### 4. Gestion d'Équipe
- Profils détaillés des techniciens
- Compétences et niveaux d'expertise
- Gestion des disponibilités
- Historique et performance

## 🚀 Plan de Développement

### Phase 1 : Analyse et planification ✅
### Phase 2 : Configuration GitHub (en cours)
### Phase 3 : Configuration Scaleway
### Phase 4 : Base technique (MVP)
### Phase 5 : Module Dashboard
### Phase 6 : Module Projets
### Phase 7 : Module Planning
### Phase 8 : Module Équipe
### Phase 9 : Tests d'intégration
### Phase 10 : Déploiement

## 🛠️ Installation et Développement

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd av-concept-projects

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

## 📊 Données Métier

### Techniciens Identifiés
- **JACQUET** : Spécialiste Construction
- **DI GRANDI, GIUSTI** : Pose des équipements
- **ROORYCK** : Polyvalent (Aménagement + Pose)
- **DIDDAOUI** : Pose des équipements

### Types d'Interventions
- Construction
- Pose des équipements
- Aménagement
- SAV (Service Après Vente)
- Voyage (déplacements)

### Phases de Projet (26 tâches)
- **Phase A** : Préparation salle (5 tâches)
- **Phase B** : Construction/Structure (7 tâches)
- **Phase C** : Installations techniques (7 tâches)
- **Phase E** : Finitions (7 tâches)

## 🔧 Configuration

### Variables d'Environnement
```env
VITE_APP_NAME=AV Concept Projects
VITE_API_URL=http://localhost:3001
VITE_ENVIRONMENT=development
```

### Scripts Disponibles
- `npm run dev` : Serveur de développement
- `npm run build` : Build de production
- `npm run preview` : Aperçu du build
- `npm run lint` : Vérification du code
- `npm run test` : Tests unitaires

## 📝 Contribution

1. Créer une branche feature : `git checkout -b feature/nom-feature`
2. Commiter les changements : `git commit -m "Description"`
3. Pousser la branche : `git push origin feature/nom-feature`
4. Créer une Pull Request

## 🔒 Sécurité

- Authentification via tokens
- Validation des données côté client et serveur
- Protection CSRF
- Chiffrement des données sensibles

## 📞 Support

Pour toute question ou problème :
- Email : dev@avconceptproducts.com
- Documentation : [Lien vers la doc]
- Issues GitHub : [Lien vers les issues]

---

**Développé pour AV Concept Products - Spécialiste en systèmes audiovisuels home cinéma**

