import pymem
import pymem.process
import time
from typing import Dict

class LoLLiveReader:
    def __init__(self):
        self.pm = None
        self.base_address = 0
        self.entity_list_offset = 0x1A2B3C4  # Reverse engineered baseline
        self.game_time_offset = 0x5D6E7F8
        
    def attach_lol(self):
        """Attach to live League process"""
        try:
            self.pm = pymem.Pymem("League of Legends.exe")
            self.base_address = self.pm.base_address
            print("Successfully attached to League of Legends process.")
            return True
        except pymem.exception.ProcessNotFound:
            print("League of Legends.exe not found.")
            return False
        except Exception as e:
            print(f"Failed to attach to LoL: {e}")
            return False
        
    def read_game_state(self) -> Dict:
        """Read live game entities"""
        if not self.pm:
            return {'entities': [], 'game_time': 0, 'timestamp': time.time()}
            
        try:
            entity_list = self.pm.read_ulonglong(self.base_address + self.entity_list_offset)
            game_time = self.pm.read_float(self.base_address + self.game_time_offset)
            
            entities = []
            for i in range(10):  # 10 players
                try:
                    entity_base = self.pm.read_ulonglong(entity_list + i * 0x8)
                    if entity_base:
                        entities.append({
                            'team': self.pm.read_int(entity_base + 0xF4),
                            'x': self.pm.read_float(entity_base + 0x1D8),
                            'y': self.pm.read_float(entity_base + 0x1DC),
                            'z': self.pm.read_float(entity_base + 0x1E0),
                            'champion_id': self.pm.read_int(entity_base + 0x1A8)
                        })
                except Exception:
                    continue
                    
            return {
                'entities': entities,
                'game_time': game_time,
                'timestamp': time.time()
            }
        except Exception as e:
            # print(f"Error reading game state: {e}")
            return {'entities': [], 'game_time': 0, 'timestamp': time.time()}
