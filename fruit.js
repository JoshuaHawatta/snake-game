export default class Fruit {
    #X_ANGLE;
    #Y_ANGLE;
    #size = 50;

    constructor(X_ANGLE, Y_ANGLE) {
        this.#X_ANGLE = X_ANGLE;
        this.#Y_ANGLE = Y_ANGLE;
    }

    CREATE_FOOD_POSITION = (width, height) => {
        this.#X_ANGLE = Math.floor(Math.random() * Math.floor(width / this.#size)) * this.#size;
        this.#Y_ANGLE = Math.floor(Math.random() * Math.floor(height / this.#size)) * this.#size;
    }

    DRAW_SQUARE = context => {
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(this.#X_ANGLE, this.#Y_ANGLE, this.#size, this.#size)
    }

    //GETTERS_AND_SETTERS
    getX_ANGLE = () => this.#X_ANGLE;
    getY_ANGLE = () => this.#Y_ANGLE;
}