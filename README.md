# Snake Game

Classic Snake game implemented as a reusable JavaScript module.

## Installation

```bash
npm install github:serptest/snake-game#main
```

## Usage

```javascript
import SnakeGame from '@serptest/snake-game'

// Create a container element
const container = document.getElementById('game-container')

// Initialize and start the game
const game = new SnakeGame(container)
game.start()

// Stop the game when needed
game.stop()
```

## Controls

- **Arrow Keys**: Move the snake
- **Space**: Restart after game over

## API

### `new SnakeGame(container)`
Creates a new Snake game instance.
- `container`: HTML element where the game canvas will be appended

### `game.start()`
Starts the game loop.

### `game.stop()`
Stops the game and removes the canvas from DOM.

## License

MIT