# 🔒 Système de Surveillance d'Examen

## Fonctionnalités de Sécurité

### 1. **Bouton de Démarrage**
- L'examen ne démarre pas automatiquement
- Le timer commence uniquement après avoir cliqué sur "Commencer l'examen"
- Un écran d'instructions s'affiche avant le démarrage

### 2. **Détection de Changement d'Onglet**
- ⚠️ Alarme sonore si l'utilisateur change d'onglet
- Compteur d'infractions visible dans le panneau latéral
- Bannière rouge d'avertissement en haut de l'écran

### 3. **Blocage des Captures d'Écran**
Le système tente de bloquer :
- `Print Screen` (touche Impr écran)
- `Ctrl + Shift + S` (Firefox screenshot)
- `Win + Shift + S` (Windows Snipping Tool)
- Clic droit (menu contextuel)

### 4. **Détection d'Outils Développeur**
- Blocage de `F12`
- Blocage de `Ctrl + Shift + I`

### 5. **Détection de Redimensionnement**
- Alerte si la fenêtre est redimensionnée de manière suspecte
- Peut indiquer un partage d'écran ou une tentative de triche

### 6. **Système d'Infractions**
- **Maximum : 3 infractions**
- Chaque infraction déclenche :
  - 🔊 Alarme sonore (effet sirène)
  - 📢 Bannière d'avertissement rouge
  - 📊 Mise à jour du compteur
- **À la 3ème infraction** : L'examen est automatiquement terminé

## Types d'Infractions Détectées

| Infraction | Description |
|------------|-------------|
| Changement d'onglet | L'utilisateur quitte la page de l'examen |
| Fenêtre minimisée | La fenêtre perd le focus |
| Capture d'écran | Tentative de prendre une capture |
| Outils développeur | Tentative d'ouvrir la console |
| Clic droit | Tentative d'accéder au menu contextuel |
| Redimensionnement | Changement suspect de taille de fenêtre |

## Alarme Sonore

L'alarme utilise l'API Web Audio pour générer un son de sirène :
- Fréquence : 600-800 Hz
- Durée : 800ms
- Effet : Variation de tonalité

## Limitations

⚠️ **Note importante** : Ce système de surveillance est une **simulation éducative**. 

Les captures d'écran ne peuvent pas être complètement bloquées car :
- Les outils système (Snipping Tool, etc.) fonctionnent au niveau OS
- Les smartphones peuvent photographier l'écran
- Les logiciels tiers peuvent contourner les restrictions JavaScript

Pour un examen réel sécurisé, utilisez :
- Des logiciels de proctoring professionnels (ProctorU, Examity, etc.)
- Une surveillance vidéo en direct
- Un environnement contrôlé

## Utilisation

1. Ouvrez `index.html` dans un navigateur
2. Lisez les instructions de surveillance
3. Cliquez sur "🚀 Commencer l'examen"
4. Le timer démarre et la surveillance est activée
5. Évitez toute action suspecte pour ne pas déclencher d'infraction

## Fichiers

- `index.html` : Interface principale de l'examen
- `exam-proctoring.js` : Système de surveillance
- `SURVEILLANCE.md` : Cette documentation

## Développement

Pour désactiver la surveillance pendant le développement, commentez la ligne dans `index.html` :

```html
<!-- <script src="exam-proctoring.js"></script> -->
```

---

**Créé pour** : Orange Digital Center AWS Promo 5  
**Objectif** : Simulateur d'examen AWS Cloud Practitioner avec surveillance
