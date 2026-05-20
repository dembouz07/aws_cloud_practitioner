# 💾 Système de Persistance de l'Examen

## Fonctionnalité

Le système sauvegarde automatiquement l'état de l'examen dans le **localStorage** du navigateur. Cela signifie que :

✅ **Si vous actualisez la page (F5)** → L'examen continue où vous l'avez laissé  
✅ **Le temps restant est préservé** → Le chronomètre ne redémarre pas  
✅ **Les infractions sont conservées** → Le compteur d'infractions persiste  
✅ **Vos réponses sont sauvegardées** → Vous ne perdez pas votre progression  

⚠️ **ATTENTION** : Actualiser la page compte comme une **infraction** !

## Données Sauvegardées

Le système sauvegarde les informations suivantes dans le localStorage :

| Clé | Description | Valeur |
|-----|-------------|--------|
| `exam_started` | L'examen a-t-il démarré ? | `true` / `false` |
| `remaining_seconds` | Temps restant en secondes | `0` à `5400` (90 min) |
| `infractions` | Nombre d'infractions commises | `0` à `3` |
| `start_time` | Timestamp du début de l'examen | Timestamp Unix |

## Fréquence de Sauvegarde

- **Toutes les secondes** : Le temps restant est sauvegardé automatiquement
- **À chaque infraction** : Le compteur d'infractions est mis à jour
- **En temps réel** : L'état de l'examen est synchronisé en continu

## Restauration Automatique

Lorsque vous rechargez la page :

1. ✅ Le système détecte qu'un examen était en cours
2. ✅ L'écran de démarrage est masqué automatiquement
3. ✅ Le chronomètre reprend avec le temps restant
4. ✅ Le compteur d'infractions est restauré
5. ⚠️ Une infraction est ajoutée pour "Actualisation de la page"

## Nettoyage des Données

Les données sont automatiquement supprimées dans les cas suivants :

### 1. Fin de l'examen
Quand vous cliquez sur "Terminer l'examen" :
```javascript
localStorage.removeItem('exam_started');
localStorage.removeItem('remaining_seconds');
localStorage.removeItem('infractions');
```

### 2. Réinitialisation
Quand vous cliquez sur "Réinitialiser" :
- Toutes les données sont effacées
- L'écran de démarrage réapparaît
- Le compteur d'infractions est remis à zéro

### 3. Trois infractions
Quand vous atteignez 3 infractions :
- L'examen est automatiquement terminé
- Les données sont nettoyées
- Vous devez recommencer

## Exemple de Scénario

### Scénario 1 : Actualisation accidentelle
```
1. Vous êtes à la question 25/65
2. Temps restant : 45 minutes
3. Infractions : 0
4. Vous actualisez par erreur (F5)
5. ⚠️ Infraction ajoutée : "Actualisation de la page"
6. ✅ Vous revenez à la question 25/65
7. ✅ Temps restant : 45 minutes
8. ⚠️ Infractions : 1/3
```

### Scénario 2 : Fermeture du navigateur
```
1. Vous êtes à la question 40/65
2. Temps restant : 30 minutes
3. Vous fermez le navigateur
4. Vous rouvrez le navigateur
5. Vous retournez sur la page
6. ⚠️ Infraction ajoutée : "Actualisation de la page"
7. ✅ Vous revenez à la question 40/65
8. ✅ Temps restant : 30 minutes
```

### Scénario 3 : Fin normale
```
1. Vous terminez les 65 questions
2. Vous cliquez sur "Terminer l'examen"
3. ✅ Résultats affichés
4. ✅ localStorage nettoyé
5. ✅ Vous pouvez recommencer un nouvel examen
```

## Avantages

✅ **Protection contre les accidents** : Actualisation accidentelle ne fait pas perdre la progression  
✅ **Continuité** : Possibilité de reprendre après une coupure  
✅ **Équité** : Le temps ne redémarre pas, c'est équitable  
✅ **Sécurité** : Actualiser compte comme une infraction pour éviter la triche  

## Limitations

⚠️ **Navigation privée** : Le localStorage ne persiste pas en mode incognito  
⚠️ **Changement de navigateur** : Les données ne sont pas transférées  
⚠️ **Nettoyage du cache** : Effacer les données du navigateur supprime la progression  
⚠️ **Appareil différent** : Les données sont locales à l'appareil  

## Code Technique

### Sauvegarde
```javascript
localStorage.setItem('remaining_seconds', remainingSeconds);
localStorage.setItem('exam_started', 'true');
localStorage.setItem('infractions', infractions);
```

### Restauration
```javascript
const savedRemainingSeconds = localStorage.getItem('remaining_seconds');
if (savedRemainingSeconds) {
  remainingSeconds = parseInt(savedRemainingSeconds);
}
```

### Nettoyage
```javascript
localStorage.removeItem('exam_started');
localStorage.removeItem('remaining_seconds');
localStorage.removeItem('infractions');
```

## Inspection des Données

Pour voir les données sauvegardées dans votre navigateur :

1. Ouvrez les **DevTools** (F12)
2. Allez dans l'onglet **Application** (Chrome) ou **Stockage** (Firefox)
3. Cliquez sur **Local Storage**
4. Sélectionnez votre domaine
5. Vous verrez les clés : `exam_started`, `remaining_seconds`, `infractions`

---

**Note** : Ce système est conçu pour améliorer l'expérience utilisateur tout en maintenant l'intégrité de l'examen. Actualiser la page est détecté et pénalisé pour éviter les abus.
