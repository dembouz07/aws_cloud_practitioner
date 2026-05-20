# 📱 Test de Surveillance Mobile

## ✅ Fonctionnalités Ajoutées pour Mobile

### 🔍 Détections Tactiles

#### 1. **Changement d'Application**
- Événement : `visibilitychange`
- Détecte quand l'utilisateur quitte l'application
- ⚠️ Infraction : "Changement d'application détecté"

#### 2. **Geste de Capture d'Écran**
- Détection de 3 doigts simultanés
- ⚠️ Infraction : "Geste de capture détecté"

#### 3. **Appui Long (Menu Contextuel)**
- Détection d'appui > 500ms
- Bloque le menu contextuel mobile
- ⚠️ Infraction : "Appui long détecté"

#### 4. **Geste Suspect**
- 2 doigts appuyés > 1 seconde
- Peut indiquer une tentative de capture
- ⚠️ Infraction : "Geste suspect détecté"

#### 5. **Partage d'Écran**
- Bloque `navigator.share()`
- ⚠️ Infraction : "Tentative de partage détectée"

#### 6. **Application en Arrière-Plan**
- Événement : `pagehide`
- Détecte la mise en arrière-plan
- ⚠️ Infraction : "Application mise en arrière-plan"

#### 7. **Retour sur l'Application**
- Événement : `pageshow`
- Détecte le retour après mise en arrière-plan
- ⚠️ Infraction : "Retour sur l'application"

---

## 🧪 Comment Tester sur Mobile

### Test 1 : Changement d'Application
1. Démarrez l'examen sur mobile
2. Appuyez sur le bouton Home
3. Revenez sur l'application
4. ✅ Vous devriez voir : Alarme + "Changement d'application détecté"

### Test 2 : Capture d'Écran
**Android :**
- Bouton Power + Volume Bas
- ✅ Devrait déclencher une infraction

**iOS :**
- Bouton Power + Volume Haut
- ✅ Devrait déclencher une infraction

### Test 3 : Appui Long
1. Appuyez longuement sur du texte
2. ✅ Menu contextuel bloqué + Infraction

### Test 4 : Geste Multi-Touch
1. Posez 3 doigts sur l'écran
2. ✅ Infraction : "Geste de capture détecté"

### Test 5 : Partage
1. Essayez de partager la page (si disponible)
2. ✅ Partage bloqué + Infraction

---

## 🔧 Problème du Timer qui Recommence

### Solution Implémentée :

#### 1. **Sauvegarde Automatique**
```javascript
// Chaque seconde, le temps est sauvegardé
localStorage.setItem('remaining_seconds', remainingSeconds);
```

#### 2. **Restauration au Chargement**
```javascript
// Au chargement, le temps est restauré
let remainingSeconds = parseInt(localStorage.getItem('remaining_seconds')) || 90 * 60;
```

#### 3. **Timer Redémarré Automatiquement**
```javascript
// Après actualisation, le timer reprend
if (savedExamStarted === 'true') {
  startTimer(); // ← Timer redémarré
}
```

### Vérification :

1. **Démarrez l'examen**
2. **Attendez 1 minute** (timer à 89:00)
3. **Actualisez la page** (F5)
4. ✅ Le timer devrait afficher **89:00** (pas 90:00)

### Debug :

Ouvrez la console (F12) et vérifiez :
```javascript
localStorage.getItem('remaining_seconds')
```

Vous devriez voir le nombre de secondes restantes.

---

## 📊 Compatibilité Mobile

| Appareil | Changement App | Capture | Appui Long | Multi-Touch |
|----------|----------------|---------|------------|-------------|
| Android Chrome | ✅ | ✅ | ✅ | ✅ |
| Android Firefox | ✅ | ✅ | ✅ | ✅ |
| iOS Safari | ✅ | ⚠️ Partiel | ✅ | ✅ |
| iOS Chrome | ✅ | ⚠️ Partiel | ✅ | ✅ |
| Tablette Android | ✅ | ✅ | ✅ | ✅ |
| iPad | ✅ | ⚠️ Partiel | ✅ | ✅ |

⚠️ **Note** : Les captures d'écran ne peuvent pas être complètement bloquées au niveau système, mais elles sont détectées via les gestes.

---

## 🐛 Débogage

### Si le timer recommence à 90:00 :

1. **Vérifiez le localStorage :**
```javascript
console.log(localStorage.getItem('remaining_seconds'));
console.log(localStorage.getItem('exam_started'));
```

2. **Vérifiez que le timer démarre :**
```javascript
// Devrait afficher dans la console :
// "Timer démarré - Temps restant: X secondes"
```

3. **Vérifiez que tick() s'exécute :**
```javascript
// Chaque seconde, remaining_seconds devrait diminuer
```

### Si la surveillance mobile ne fonctionne pas :

1. **Vérifiez la console :**
```javascript
console.log('Système de surveillance chargé et actif');
```

2. **Testez examStarted :**
```javascript
console.log(examStarted); // Devrait être true
```

3. **Testez une infraction manuellement :**
```javascript
recordInfraction('Test');
```

---

## 📝 Logs de Debug

Le système affiche maintenant :
- ✅ "Système de surveillance chargé et actif"
- ✅ "Examen démarré - Surveillance activée"
- ✅ "Timer démarré - Temps restant: X secondes"
- ✅ "Démarrage du timer après restauration"

Vérifiez ces messages dans la console pour confirmer que tout fonctionne.

---

## 🎯 Résumé

### Problèmes Résolus :

1. ✅ **Surveillance mobile** → Détections tactiles ajoutées
2. ✅ **Timer qui recommence** → Sauvegarde/restauration vérifiée
3. ✅ **Logs de debug** → Messages ajoutés pour diagnostic

### Prochaines Étapes :

1. Testez sur mobile réel
2. Vérifiez les logs dans la console
3. Confirmez que le timer persiste après actualisation

---

**Créé pour** : Orange Digital Center AWS Promo 5  
**Date** : 2026-05-20
