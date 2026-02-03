import pygame
import pygame_gui
from .predictor import LoLPrediction

class LiveOverlay:
    def __init__(self):
        pygame.init()
        # Create a small overlay window
        self.screen = pygame.display.set_mode((400, 300), pygame.NOFRAME)
        pygame.display.set_caption("LoL Live Intel")
        self.manager = pygame_gui.UIManager((400, 300))
        self.font = pygame.font.SysFont('arial', 16)
        self.title_font = pygame.font.SysFont('arial', 20, bold=True)
        
    def render_coach_call(self, prediction: LoLPrediction):
        self.screen.fill((20, 20, 30))
        
        # Title
        title = self.title_font.render("LIVE TACTICAL INTEL", True, (0, 255, 200))
        self.screen.blit(title, (20, 10))

        # Enemy JG prediction
        # Map normalized pos to overlay area (just visual representation)
        jg_x = int(50 + prediction.enemy_jg_position[0] * 50)
        jg_y = int(50 + prediction.enemy_jg_position[1] * 50)
        
        pygame.draw.circle(self.screen, (255, 100, 100), (jg_x, jg_y), 10)
        text = self.font.render(f"JG Gank Prob: {prediction.gank_probability:.1%}", True, (255,255,255))
        self.screen.blit(text, (120, 50))
        
        rotate_text = self.font.render(f"Rotate Prob: {prediction.rotate_probability:.1%}", True, (255,255,255))
        self.screen.blit(rotate_text, (120, 80))

        # Coach call section
        call_rect = pygame.Rect(20, 150, 360, 80)
        pygame.draw.rect(self.screen, (40, 40, 60), call_rect, border_radius=10)
        pygame.draw.rect(self.screen, (255, 50, 50), call_rect, 2, border_radius=10)
        
        call_title = self.font.render("COACH RECOMMENDATION:", True, (255, 255, 0))
        self.screen.blit(call_title, (40, 160))
        
        call_text = self.title_font.render(prediction.coach_call, True, (255,255,255))
        self.screen.blit(call_text, (40, 190))
        
        pygame.display.flip()
    
    def cleanup(self):
        pygame.quit()
