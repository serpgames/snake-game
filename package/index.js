export default class SnakeGame {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvas.style.border = '2px solid #333';
    this.canvas.style.backgroundColor = '#111';
    
    this.gridSize = 20;
    this.tileSize = this.canvas.width / this.gridSize;
    
    this.reset();
    this.setupControls();
    
    container.appendChild(this.canvas);
  }
  
  reset() {
    this.snake = [
      { x: 10, y: 10 }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = this.generateFood();
    this.gameOver = false;
    this.score = 0;
    this.gameLoop = null;
  }
  
  setupControls() {
    this.handleKeyPress = (e) => {
      if (this.gameOver) return;
      
      switch(e.key) {
        case 'ArrowUp':
          if (this.direction.y === 0) {
            this.nextDirection = { x: 0, y: -1 };
          }
          break;
        case 'ArrowDown':
          if (this.direction.y === 0) {
            this.nextDirection = { x: 0, y: 1 };
          }
          break;
        case 'ArrowLeft':
          if (this.direction.x === 0) {
            this.nextDirection = { x: -1, y: 0 };
          }
          break;
        case 'ArrowRight':
          if (this.direction.x === 0) {
            this.nextDirection = { x: 1, y: 0 };
          }
          break;
        case ' ':
          if (this.gameOver) {
            this.reset();
            this.start();
          }
          break;
      }
    };
    
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
  }
  
  update() {
    if (this.gameOver) return;
    
    this.direction = this.nextDirection;
    
    const head = { ...this.snake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;
    
    // Check wall collision
    if (head.x < 0 || head.x >= this.gridSize || 
        head.y < 0 || head.y >= this.gridSize) {
      this.gameOver = true;
      return;
    }
    
    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver = true;
      return;
    }
    
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#111';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = '#0f0';
    this.snake.forEach((segment, index) => {
      this.ctx.fillRect(
        segment.x * this.tileSize,
        segment.y * this.tileSize,
        this.tileSize - 2,
        this.tileSize - 2
      );
      
      // Draw eyes on head
      if (index === 0) {
        this.ctx.fillStyle = '#fff';
        const eyeSize = 3;
        const eyeOffset = this.tileSize / 4;
        
        if (this.direction.x !== 0) {
          // Horizontal movement
          this.ctx.fillRect(
            segment.x * this.tileSize + eyeOffset,
            segment.y * this.tileSize + eyeOffset,
            eyeSize,
            eyeSize
          );
          this.ctx.fillRect(
            segment.x * this.tileSize + eyeOffset,
            segment.y * this.tileSize + this.tileSize - eyeOffset - eyeSize,
            eyeSize,
            eyeSize
          );
        } else {
          // Vertical movement
          this.ctx.fillRect(
            segment.x * this.tileSize + eyeOffset,
            segment.y * this.tileSize + eyeOffset,
            eyeSize,
            eyeSize
          );
          this.ctx.fillRect(
            segment.x * this.tileSize + this.tileSize - eyeOffset - eyeSize,
            segment.y * this.tileSize + eyeOffset,
            eyeSize,
            eyeSize
          );
        }
        this.ctx.fillStyle = '#0f0';
      }
    });
    
    // Draw food
    this.ctx.fillStyle = '#f00';
    this.ctx.fillRect(
      this.food.x * this.tileSize,
      this.food.y * this.tileSize,
      this.tileSize - 2,
      this.tileSize - 2
    );
    
    // Draw score
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    
    // Draw game over
    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '30px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 30);
      this.ctx.font = '20px Arial';
      this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
      this.ctx.font = '16px Arial';
      this.ctx.fillText('Press SPACE to play again', this.canvas.width / 2, this.canvas.height / 2 + 50);
      this.ctx.textAlign = 'left';
    }
  }
  
  start() {
    if (this.gameLoop) return;
    
    this.gameLoop = setInterval(() => {
      this.update();
      this.draw();
    }, 100);
    
    // Draw initial state
    this.draw();
  }
  
  stop() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
      this.gameLoop = null;
    }
    
    if (this.handleKeyPress) {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}