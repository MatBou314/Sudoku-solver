import pygame
import sys
import random
from dokusan import generators

grille_str = str(generators.random_sudoku(avg_rank=150))

# ==== PYGAME ==== #
pygame.init()
screen = pygame.display.set_mode((1800, 1000))
SQUARE_SIZE = 80
font = pygame.font.Font(None, int(SQUARE_SIZE * 0.9))

def drawGrid(nums):
    screen.fill((255, 255, 255))
    for i in range(81):
        num = nums[i]
        col = i % 9
        line = int(i/9)
        x = (col+1) * SQUARE_SIZE
        y = (line+1) * SQUARE_SIZE
        text = font.render(f"{num}", True, (0, 0, 0))
        pygame.draw.rect(screen, (50, 60, 70), (x, y, SQUARE_SIZE, SQUARE_SIZE))
        screen.blit(text, (x, y))


grid = list(grille_str)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            print("Fin du jeu...")
            pygame.quit()
            sys.exit()
    drawGrid(grid)
    pygame.display.flip()
