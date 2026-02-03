const ffi = require('ffi-napi');
const ref = require('ref-napi');
const processes = require('ps-node');

class ValorantMemoryReader {
  constructor(window) {
    this.processHandle = null;
    this.window = window;
    this.gameState = {};
    this.processId = null;
    this.initMemoryHooks();
  }

  initMemoryHooks() {
    // Windows API declarations
    this.kernel32 = ffi.Library('kernel32', {
      'OpenProcess': ['int', ['int', 'bool', 'int']],
      'ReadProcessMemory': ['bool', ['int', 'pointer', 'pointer', 'int', 'pointer']],
      'CloseHandle': ['bool', ['int']]
    });

    this.hookGameProcess();
  }

  hookGameProcess() {
    // Find VALORANT.exe process
    processes.lookup({ command: 'VALORANT-Win64-Shipping' }, (err, list) => {
      if (err) {
        console.error('Error looking up process:', err);
        return;
      }
      if (list[0]) {
        this.processId = list[0].pid;
        this.attachProcess();
        this.startReadLoop();
      } else {
        console.log('VALORANT process not found, retrying in 5s...');
        setTimeout(() => this.hookGameProcess(), 5000);
      }
    });
  }

  attachProcess() {
    const PROCESS_VM_READ = 0x0010;
    this.processHandle = this.kernel32.OpenProcess(
      PROCESS_VM_READ, false, this.processId
    );
    if (this.processHandle) {
        console.log(`Attached to VALORANT process (PID: ${this.processId})`);
    } else {
        console.error('Failed to attach to process');
    }
  }

  startReadLoop() {
    setInterval(() => {
        this.readLiveState();
    }, 1000 / 30); // 30 FPS
  }

  readLiveState() {
    if (!this.processHandle) return this.gameState;
    
    // Read entity list (example offsets)
    const entityListAddr = 0x1A2B3C4D; // Update with current offsets
    const buffer = Buffer.alloc(1024);
    
    const success = this.kernel32.ReadProcessMemory(
      this.processHandle,
      entityListAddr,
      buffer,
      buffer.length,
      null
    );
    
    if (success) {
        // Parse entities (simplified as per example)
        this.gameState = {
          roundTime: buffer.readFloatLE(0x100),
          enemies: this.parseEnemies(buffer),
          allyPositions: this.parseAllies(buffer),
          map: buffer.toString('utf8', 0x200, 0x220).replace(/\0/g, '')
        };
        
        this.sendToOverlay(this.gameState);
    }
    
    return this.gameState;
  }

  parseEnemies(buffer) {
    // Placeholder for actual parsing logic
    return [
        { agent: 'Jett', health: 100, position: { x: 0, y: 0 }, recentRounds: [{ deathTime: 20 }] },
        { agent: 'Sova', health: 100, position: { x: 10, y: 10 }, recentRounds: [{ deathTime: 60 }] }
    ];
  }

  parseAllies(buffer) {
    // Placeholder for actual parsing logic
    return [];
  }

  sendToOverlay(state) {
    if (this.window && !this.window.isDestroyed()) {
      this.window.webContents.send('live-state', state);
    }
  }
}

module.exports = (window) => new ValorantMemoryReader(window);
