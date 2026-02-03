import pygame
import sys
import time
from .intelligence import LoLLiveIntelligence
from .overlay import LiveOverlay

def main():
    print("🎯 LoL Live Intelligence Starting...")
    print("Waiting for League of Legends process...")
    
    intel = LoLLiveIntelligence()
    overlay = LiveOverlay()
    
    # Start the background analysis thread
    intel.start_live_analysis()
    
    # Main overlay loop (must run in main thread for pygame)
    clock = pygame.time.Clock()
    running = True
    
    try:
        while running:
            # 1. Handle Events
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                
                # Allow moving the window or other interactions if needed
                # (Pygame NOFRAME windows usually can't be moved easily without extra code)
            
            # 2. Update Overlay
            if intel.prediction_buffer:
                latest_prediction = intel.prediction_buffer[-1]
                overlay.render_coach_call(latest_prediction)
            else:
                # Show waiting screen or similar
                pass
            
            # 3. Cap Frame Rate
            clock.tick(60)
            
    except KeyboardInterrupt:
        print("\nShutting down...")
    except Exception as e:
        print(f"Error in main loop: {e}")
    finally:
        intel.stop()
        overlay.cleanup()
        sys.exit()

if __name__ == "__main__":
    main()
