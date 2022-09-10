import Snake from './snake.js';
import Fruit from './fruit.js';
import Score from './score.js';

const snakeCanvas = document.querySelector("#snake-canvas");
const canvasContext = snakeCanvas.getContext('2d');

export const [width, height] = [snakeCanvas.width, snakeCanvas.height];
const FPS = 7;

const snake = new Snake(0, 0);
const food = new Fruit(5 * 50, 5 * 50);
const score = new Score();

const animate = () => {
    canvasContext.clearRect(0, 0, width, height);

    snake.DRAW_SNAKE(canvasContext);
    snake.MOVE_SNAKE();
    snake.UPDATE_SNAKE();
    snake.collisionDecection(snakeCanvas, score);
    snake.eatFruit(food, score);

    food.DRAW_SQUARE(canvasContext);
    score.DRAW_SCORE(canvasContext);

    setTimeout(() => requestAnimationFrame(animate), 1000 / FPS)
}

console.log(score.getRecord());


animate();