import mss
import numpy as np
import cv2
import pygetwindow as gw
import time
from typing import Tuple, Dict
from .timesformer_lol import MinimapFrame

class MinimapCapture:
    def __init__(self, capture_region: Tuple[int, int, int, int] = (0,0,224,224)):
        self.sct = mss.mss()
        self.region = {"top": capture_region[1], "left": capture_region[0],
                      "width": capture_region[2], "height": capture_region[3]}
        self.update_region()
        
    def update_region(self):
        """Auto-detect League minimap region"""
        windows = gw.getWindowsWithTitle("League of Legends")
        if windows:
            win = windows[0]
            # Minimap typically bottom-right
            x, y, w, h = win.left, win.top, win.width, win.height
            # Re-calculating region based on window position
            self.region["left"] = int(x + w * 0.75)
            self.region["top"] = int(y + h * 0.75)
            self.region["width"] = int(w * 0.25)
            self.region["height"] = int(h * 0.25)
        else:
            # Fallback
            pass
    
    def capture_frame(self) -> np.ndarray:
        """Capture minimap"""
        try:
            screenshot = self.sct.grab(self.region)
            frame = np.array(screenshot)
            # Remove alpha channel if present
            if frame.shape[2] == 4:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)
            return cv2.resize(frame, (224, 224))
        except Exception as e:
            # print(f"Capture error: {e}")
            return np.zeros((224, 224, 3), dtype=np.uint8)
    
    def extract_positions(self, game_state: Dict) -> MinimapFrame:
        """Convert game state to minimap heatmap and metadata"""
        visual_frame = self.capture_frame()
        
        ally_pos = np.zeros((5, 2))
        enemy_pos = np.zeros((5, 2))
        vision_mask = np.ones((224, 224))
        
        # Counter for teams
        ally_idx = 0
        enemy_idx = 0
        
        for entity in game_state.get('entities', []):
            # Normalizing LoL coordinates (ranges might vary, -10k to 10k is rough estimate)
            x_norm = np.interp(entity['x'], (-1000, 15000), (0, 1))
            y_norm = np.interp(entity['y'], (-1000, 15000), (0, 1))
            
            # Assume team 100 is Blue, 200 is Red. 
            # In live reader, we'd need to know which team the local player is on.
            if entity['team'] == 100:  
                if ally_idx < 5:
                    ally_pos[ally_idx] = [x_norm, y_norm]
                    ally_idx += 1
            else:
                if enemy_idx < 5:
                    enemy_pos[enemy_idx] = [x_norm, y_norm]
                    enemy_idx += 1
        
        return MinimapFrame(
            timestamp=time.time(),
            ally_positions=ally_pos,
            enemy_positions=enemy_pos,
            objectives={'dragon': (0.3, 0.8), 'baron': (0.9, 0.2)},
            vision_fog=vision_mask,
            visual_frame=visual_frame
        )
