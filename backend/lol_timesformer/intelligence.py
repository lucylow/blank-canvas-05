import threading
import time
from collections import deque
from .timesformer_lol import TimeSformerLoL
from .live_reader import LoLLiveReader
from .minimap_capture import MinimapCapture
from .predictor import TimeSformerPredictor, LoLPrediction

class LoLLiveIntelligence:
    def __init__(self):
        self.timesformer_wrapper = TimeSformerLoL()
        self.memory_reader = LoLLiveReader()
        self.minimap_capture = MinimapCapture()
        self.predictor = TimeSformerPredictor(self.timesformer_wrapper.model)
        self.prediction_buffer = deque(maxlen=60)  # 10s @ 6fps
        self.running = False
        
    def start_live_analysis(self):
        """60ms loop - Memory → Minimap → TimeSformer → Overlay"""
        self.memory_reader.attach_lol()
        self.running = True
        
        def analysis_loop():
            while self.running:
                try:
                    # 1. Read live game state
                    game_state = self.memory_reader.read_game_state()
                    
                    # 2. Capture minimap + extract positions
                    frame = self.minimap_capture.extract_positions(game_state)
                    self.timesformer_wrapper.frame_buffer.append(frame)
                    
                    # 3. TimeSformer prediction
                    prediction = self.predictor.predict_sequence(self.timesformer_wrapper.frame_buffer)
                    
                    # 4. Generate coach calls
                    prediction.coach_call = self.generate_coach_call(prediction)
                    self.prediction_buffer.append(prediction)
                    
                    time.sleep(0.06)  # ~16fps target
                
                except Exception as e:
                    # print(f"Analysis error: {e}")
                    time.sleep(1)
        
        thread = threading.Thread(target=analysis_loop, daemon=True)
        thread.start()
        return thread

    def generate_coach_call(self, prediction: LoLPrediction) -> str:
        if prediction.gank_probability > 0.75:
            return "WARD RIVER → FREEZE"
        if prediction.rotate_probability > 0.7:
            return "TP MID → 4V3 DRAKE"
        if prediction.objective_timer.get('dragon', 999) < 30:
            return "DRAGON VISION → GROUP"
        return "FARM SAFE → SPLIT T2"

    def stop(self):
        self.running = False
