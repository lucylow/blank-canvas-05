// overlay.js - Real-time rendering
const { ipcRenderer } = require('electron');

class ValorantOverlay {
  constructor() {
    this.gameState = {};
    this.initIPC();
    this.renderLoop();
  }

  initIPC() {
    // Receive memory data from main process
    ipcRenderer.on('live-state', (event, state) => {
      this.gameState = state;
      this.analyzeState();
    });
  }

  analyzeState() {
    const enemies = this.gameState.enemies || [];
    const intel = this.classifyEnemyPlaystyles(enemies);
    
    this.renderEnemies(intel);
    this.generateCoachCall(intel);
    this.renderMetadata();
  }

  classifyEnemyPlaystyles(enemies) {
    return enemies.map(enemy => {
      // Live playstyle detection (rolling window)
      const fdpr = enemy.recentRounds?.filter(r => r.deathTime < 35).length / 5 || 0;
      
      let playstyle = 'anchor';
      let confidence = 0.5;
      
      if (fdpr > 0.7) {
        playstyle = 'rush_wq';
        confidence = 0.9;
      } else if (enemy.utilDamagePct > 0.6) {
        playstyle = 'utility_entry';
        confidence = 0.85;
      }
      
      return {
        agent: enemy.agent || 'Unknown',
        playstyle,
        confidence,
        position: enemy.position,
        health: enemy.health
      };
    });
  }

  generateCoachCall(intel) {
    const rushers = intel.filter(p => p.playstyle === 'rush_wq');
    
    if (rushers.length >= 2 && this.gameState.roundTime < 40) {
      document.getElementById('coach-call').textContent = 'STACK A 5V3 → B PLANT NOW';
      document.getElementById('coach-call').style.background = 'linear-gradient(90deg, #ff4444, #ff6666)';
    } else {
      document.getElementById('coach-call').textContent = 'PLAY DEFAULT → LURK CLEAR';
      document.getElementById('coach-call').style.background = 'linear-gradient(90deg, #4444ff, #6666ff)';
    }
  }

  renderEnemies(intel) {
    const container = document.getElementById('enemy-profiles');
    container.innerHTML = intel.slice(0, 5).map(enemy => `
      <div class="enemy-card">
        <div>${enemy.agent}</div>
        <div>${enemy.playstyle.toUpperCase()} (${(enemy.confidence*100).toFixed(0)}%)</div>
      </div>
    `).join('');
  }

  renderMetadata() {
    if (this.gameState.roundTime !== undefined) {
        const minutes = Math.floor(this.gameState.roundTime / 60);
        const seconds = Math.floor(this.gameState.roundTime % 60).toString().padStart(2, '0');
        document.getElementById('round-time').textContent = `${minutes}:${seconds}`;
    }
    if (this.gameState.map) {
        document.getElementById('map-name').textContent = this.gameState.map;
    }
  }

  renderLoop() {
    // 30fps update
    requestAnimationFrame(() => this.renderLoop());
  }
}

new ValorantOverlay();
