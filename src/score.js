export default class Score {
    #score = 0;
    #record = JSON.parse(localStorage.getItem("scores")) || 0;

    constructor() {}

    DRAW_SCORE = context => {
        context.fillStyle = "white";
        context.fillText(`Score: ${ this.#score }`, 20, 20)
        
        if (this.#record > this.#score) {
            context.fillStyle = "yellow";
            context.fillText(`Highest score: ${ this.#record }`, 70, 20)
        }
    };

    INCREMENT_SCORE = () => this.#score ++;

    //GETTERS_AND_SETTERS
    getScore = () => this.#score;
    getRecord = () => this.#record;
}