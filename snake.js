import { width, height } from "./index.js";

export default class Snake {
    #X_ANGLE;
    #Y_ANGLE;
    #snakeSize = [];
    #X_VELOCITY = 1;
    #Y_VELOCITY = 0;
    #size = 50;
    #counter = 0;
    #bodyLength = 3;
    #score = 0;

    constructor(X_ANGLE, Y_ANGLE) {
        this.#X_ANGLE = X_ANGLE;
        this.#Y_ANGLE = Y_ANGLE;
    }

    //UPDATING_SNAKE_COORDENATES_AT_THE_BOARD
    UPDATE_SNAKE = () => {
        const x = this.#X_ANGLE, y = this.#Y_ANGLE;

        this.INCREMENT_X_VELOCITY();
        this.INCREMENT_Y_VELOCITY();

        this.#snakeSize.push({ x, y });

        if (this.#counter >= this.#bodyLength) 
            this.#snakeSize.shift()
        else
            this.#counter ++
    }

    //DRAWING_THE_BODY_AMD_GETTING_THE_COORDENATES
    DRAW_SNAKE = context => {
        this.#snakeSize.map(({ x, y }, index) => {
            context.beginPath();
            
            //DRAWING_SNAKE_HEAD
            index === this.#snakeSize.length - 1 
                ? context.fillStyle = "white" 
                : context.fillStyle = "grey"
            ;

            context.fillRect(x, y, this.#size, this.#size)
        });
    }

    MOVE_SNAKE = () => {
        window.addEventListener('keydown', e => {
            if(e.key === "a" || e.key === "ArrowLeft") {
                this.#X_VELOCITY = -1;
                this.#Y_VELOCITY = 0;
            }
            else if (e.key === "d" || e.key === "ArrowRight") {
                this.#X_VELOCITY = 1;
                this.#Y_VELOCITY = 0;
            }
            else if (e.key === "s" || e.key === "ArrowDown") {
                this.#X_VELOCITY = 0;
                this.#Y_VELOCITY = 1;
            }
            else if (e.key === "w" || e.key === "ArrowUp") {
                this.#X_VELOCITY = 0;
                this.#Y_VELOCITY = -1;
            }
        })
    }

    INCREMENT_X_VELOCITY = () => this.#X_ANGLE += (this.#X_VELOCITY * this.#size);
    INCREMENT_Y_VELOCITY = () => this.#Y_ANGLE += (this.#Y_VELOCITY * this.#size);

    collisionDecection = ({ width, height }, score) => {
        const x = this.#X_ANGLE, y = this.#Y_ANGLE, bodysize = this.#snakeSize;
        let head = bodysize[bodysize.length - 1];

        if (x + this.#size < 0) 
            this.#X_ANGLE = (width - this.#size);
        else if (y + this.#size < 0) 
            this.#Y_ANGLE = (height - this.#size);
        else if (x - this.#size >= width) 
            this.#X_ANGLE = 0;
        else if (y - this.#size >= height) 
            this.#Y_ANGLE = 0; 
            
        for(let index = 0; index < bodysize.length - 1; index ++) {
            const body = bodysize[index];

            if(body.x === head.x && body.y === head.y) {
                alert("Game over...");

                if (score.getScore() > JSON.parse(localStorage.getItem("scores"))) {
                    localStorage.setItem("scores", JSON.stringify(score.getScore()))
                }
                
                window.location.reload();
            };
        }
    }

    eatFruit = (fruit, score) => {
        const x = this.#X_ANGLE, y = this.#Y_ANGLE;

        //CREATE_NEXT_SCORE_AT_ANY_PART_OF_THE_BOARD_AND_UPDATE_THE_SCORES
        if(fruit.getX_ANGLE() === x && fruit.getY_ANGLE() === y) {
            this.#bodyLength ++;
            score.INCREMENT_SCORE();
            fruit.CREATE_FOOD_POSITION(Math.random() * width, Math.random() * height)
        }
    }

    //GETTERS_AND_SETTERS
    getSize = () => this.#size;
    getCounter = () => this.#counter;
    getPoints = () => this.#score;

    getX_ANGLE = () => this.#X_ANGLE;
    setX_ANGLE = xDimension => this.#X_ANGLE = xDimension;

    getY_ANGLE = () => this.#Y_ANGLE;
    setY_ANGLE = yDimension => this.#Y_ANGLE = yDimension;

    getX_VELOCITY = () => this.#X_VELOCITY;
    setX_VELOCITY = xVelocity => this.#X_VELOCITY = xVelocity;

    getY_VELOCITY = () => this.#Y_VELOCITY;
    setY_VELOCITY = yVelocity => this.#Y_VELOCITY = yVelocity;

    getSnakeSize = () => this.#snakeSize;
    setSnakeSize = snakeSize => this.#snakeSize = snakeSize;

    getBodyLength = () => this.#bodyLength;
    setbodyLength = bodyLength => this.#bodyLength = bodyLength;
}