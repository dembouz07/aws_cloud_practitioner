// ============================================
// SYSTÈME DE SURVEILLANCE D'EXAMEN
// ============================================
let examStarted = false;
let infractions = 0;
const MAX_INFRACTIONS = 3;

// Créer un son d'alarme
function createAlarmSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  gainNode.gain.value = 0.3;
  
  return { oscillator, audioContext, gainNode };
}

// Jouer l'alarme
function playAlarm() {
  const alarm = createAlarmSound();
  alarm.oscillator.start();
  
  // Variation de fréquence pour effet sirène
  setTimeout(() => alarm.oscillator.frequency.value = 600, 200);
  setTimeout(() => alarm.oscillator.frequency.value = 800, 400);
  setTimeout(() => alarm.oscillator.frequency.value = 600, 600);
  setTimeout(() => {
    alarm.oscillator.stop();
    alarm.audioContext.close();
  }, 800);
}

// Enregistrer une infraction
function recordInfraction(reason) {
  if (!examStarted) return;
  
  infractions++;
  const infractionCountEl = document.getElementById('infractionCount');
  const warningBanner = document.getElementById('warningBanner');
  const infractionText = document.getElementById('infractionText');
  
  // Mettre à jour le compteur
  infractionCountEl.textContent = infractions;
  document.getElementById('infractionCounter').style.display = 'block';
  
  // Afficher la bannière d'avertissement
  infractionText.textContent = `${reason} (${infractions}/${MAX_INFRACTIONS})`;
  warningBanner.classList.add('show');
  
  // Jouer l'alarme
  playAlarm();
  
  // Masquer la bannière après 5 secondes
  setTimeout(() => {
    warningBanner.classList.remove('show');
  }, 5000);
  
  // Si 3 infractions, terminer l'examen
  if (infractions >= MAX_INFRACTIONS) {
    setTimeout(() => {
      alert('⛔ EXAMEN TERMINÉ\n\nVous avez commis 3 infractions. L\'examen est automatiquement terminé.\n\nRaison : Comportement suspect détecté.');
      if (typeof submitExam === 'function') {
        submitExam();
      }
    }, 2000);
  }
}

// Détecter le changement d'onglet
document.addEventListener('visibilitychange', function() {
  if (document.hidden && examStarted) {
    recordInfraction('Changement d\'onglet détecté');
  }
});

// Détecter la perte de focus
window.addEventListener('blur', function() {
  if (examStarted) {
    recordInfraction('Fenêtre minimisée ou changement d\'application');
  }
});

// Bloquer les captures d'écran (tentative)
document.addEventListener('keydown', function(e) {
  if (!examStarted) return;
  
  // Bloquer Print Screen
  if (e.key === 'PrintScreen' || e.keyCode === 44) {
    e.preventDefault();
    recordInfraction('Tentative de capture d\'écran');
    return false;
  }
  
  // Bloquer Ctrl+Shift+S (Firefox screenshot)
  if (e.ctrlKey && e.shiftKey && e.key === 'S') {
    e.preventDefault();
    recordInfraction('Tentative de capture d\'écran');
    return false;
  }
  
  // Bloquer Win+Shift+S (Windows Snipping Tool)
  if (e.metaKey && e.shiftKey && e.key === 's') {
    e.preventDefault();
    recordInfraction('Tentative de capture d\'écran');
    return false;
  }
  
  // Bloquer F12 (DevTools)
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
    recordInfraction('Tentative d\'ouverture des outils développeur');
    return false;
  }
  
  // Bloquer Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
    e.preventDefault();
    recordInfraction('Tentative d\'ouverture des outils développeur');
    return false;
  }
});

// Bloquer le clic droit
document.addEventListener('contextmenu', function(e) {
  if (examStarted) {
    e.preventDefault();
    recordInfraction('Clic droit détecté');
    return false;
  }
});

// Détecter le redimensionnement (possible partage d'écran)
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
window.addEventListener('resize', function() {
  if (examStarted) {
    const widthChange = Math.abs(window.innerWidth - lastWidth);
    const heightChange = Math.abs(window.innerHeight - lastHeight);
    
    if (widthChange > 100 || heightChange > 100) {
      recordInfraction('Redimensionnement suspect de la fenêtre');
    }
    
    lastWidth = window.innerWidth;
    lastHeight = window.innerHeight;
  }
});

// Fonction pour démarrer l'examen
function startExam() {
  examStarted = true;
  infractions = 0;
  
  // Masquer l'écran de démarrage
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('questionCard').style.display = 'block';
  
  // Afficher le compteur d'infractions
  document.getElementById('infractionCounter').style.display = 'block';
  
  // Démarrer le timer (cette fonction doit être définie dans le script principal)
  if (typeof startTimer === 'function') {
    startTimer();
  }
  
  // Initialiser l'examen (cette fonction doit être définie dans le script principal)
  if (typeof initializeExam === 'function') {
    initializeExam(false);
  }
  
  console.log('🎓 Examen démarré - Surveillance activée');
}

// Attacher l'événement au bouton de démarrage
document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('startExamBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startExam);
  }
});
