# 🎓 Simulateur AWS Cloud Practitioner - Orange Digital Center Promo 5

## 📋 Description

Application web de simulation d'examen AWS Certified Cloud Practitioner (CLF-C02) avec système de surveillance intégré.

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd aws_cloud_practitioner
```

### 2. Ajouter la photo de la Promo 5

**IMPORTANT** : Pour que la photo de groupe s'affiche dans l'en-tête, vous devez :

1. Placer votre image de la Promo 5 à la racine du projet
2. Renommer l'image en : `promo5.jpg`

**Ou** modifier le nom dans `index.html` ligne ~607 :
```html
<img src="promo5.jpg" alt="Photo de groupe Promo 5" class="promo-photo" />
```

Remplacez `promo5.jpg` par le nom de votre fichier image.

### 3. Ouvrir l'application

Ouvrez simplement `index.html` dans votre navigateur.

## 📁 Structure du Projet

```
aws_cloud_practitioner/
├── index.html                 # Application principale
├── exam-proctoring.js        # Système de surveillance
├── promo5.jpg                # Photo de groupe (à ajouter)
├── README.md                 # Ce fichier
├── SURVEILLANCE.md           # Documentation surveillance
└── PERSISTANCE.md            # Documentation persistance
```

## ✨ Fonctionnalités

### 🎯 Examen
- ✅ 65 questions aléatoires
- ✅ 90 minutes chronomètre
- ✅ 4 domaines AWS couverts
- ✅ Système de points (1 point/question)
- ✅ Score de passage : 70% (46/65)

### 🔒 Surveillance
- ✅ Bouton de démarrage obligatoire
- ✅ Détection changement d'onglet
- ✅ Blocage captures d'écran
- ✅ Alarme sonore sur infraction
- ✅ 3 infractions max → Examen terminé

### 💾 Persistance
- ✅ Sauvegarde automatique du temps
- ✅ Restauration après actualisation
- ✅ Conservation des infractions
- ✅ Actualiser = +1 infraction

## 🎨 Personnalisation

### Modifier la photo de groupe

1. **Option 1** : Renommer votre image en `promo5.jpg`
2. **Option 2** : Modifier le code HTML

Dans `index.html`, cherchez :
```html
<img src="promo5.jpg" alt="Photo de groupe Promo 5" class="promo-photo" />
```

Remplacez `promo5.jpg` par votre nom de fichier.

### Ajuster la taille de la photo

Dans `index.html`, section CSS `.promo-photo` :
```css
.promo-photo {
  width: 100%;
  max-width: 200px;  /* Modifier cette valeur */
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(54, 65, 83, .15);
  border: 2px solid var(--line);
  object-fit: cover;
}
```

## 🌐 Déploiement sur Vercel

1. Assurez-vous que `promo5.jpg` est dans le projet
2. Commitez tous les fichiers :
```bash
git add .
git commit -m "Ajout photo Promo 5"
git push
```
3. Vercel redéploiera automatiquement

## 📊 Domaines Couverts

| Domaine | Questions | Points |
|---------|-----------|--------|
| D1 - Concepts du cloud | 16 | 16 pts |
| D2 - Sécurité et conformité | 19 | 19 pts |
| D3 - Technologies, IA/ML et services | 22 | 22 pts |
| D4 - Facturation et support | 8 | 8 pts |
| **TOTAL** | **65** | **65 pts** |

## ⚠️ Règles de Surveillance

1. Le chronomètre démarre au clic sur "Commencer"
2. Ne changez pas d'onglet pendant l'examen
3. Les captures d'écran sont détectées
4. Toute infraction déclenche une alarme sonore
5. Après 3 infractions → Examen terminé automatiquement

## 🛠️ Technologies

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla
- Web Audio API (alarmes)
- LocalStorage API (persistance)

## 📝 Licence

Projet éducatif - Orange Digital Center AWS Promo 5

## 👥 Auteurs

Orange Digital Center - Promo 5  
Simulateur AWS Cloud Practitioner CLF-C02

---

**Note** : Ce simulateur est un outil d'entraînement. Pour l'examen officiel AWS, consultez [aws.training](https://aws.training).
