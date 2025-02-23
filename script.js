document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const rollDiceButton = document.getElementById("rollDice");
    let cells = [];
    let reverse = true;

    const snakes = {11: 80, 5: 62, 16: 35, 44: 97, 49: 96, 64: 94};
    const ladders = {94: 65, 98: 51, 72: 51, 38: 9, 31: 12, 57: 15};

    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            // let num = (9-row)*10 + col;
            let cell = document.createElement("div");
            cell.classList.add("cell");
            // cell.textContent = num;
            cell.style.position = "relative"; // Ensure players can be positioned inside
            if (row === 9) cell.classList.add("top-row"); // Top row
            if (row === 0) cell.classList.add("bottom-row"); // Bottom row
            if (col === 0) cell.classList.add("left-col"); // Leftmost column
            if (col === 9) cell.classList.add("right-col"); // Rightmost column
            tempRow.push(cell);
        }
        reverse = !reverse;
        cells.push(...tempRow);
    }

    cells.forEach(cell => board.appendChild(cell));

    // Player Object
    class Player {
        constructor(imageSrc, offsetX, offsetY) {
            this.element = document.createElement("img");
            this.element.src = imageSrc;
            this.element.classList.add("player");
            this.position = 90; // Start position (bottom-left)

            // Apply unique offsets to avoid overlapping
            this.element.style.position = "absolute";
            this.element.style.left = offsetX + "px";
            this.element.style.top = offsetY + "px";

            this.updatePosition();
        }

        updatePosition() {
            if (snakes[this.position]) {
                this.position = snakes[this.position];
            } else if (ladders[this.position]) {
                this.position = ladders[this.position];
            }
            cells[this.position].appendChild(this.element);
        }


        move(steps) {
            const imageSource = document.getElementById("image");
            var imageLocation = "../Die Faces/dice-six-faces-" + steps+".svg";
            imageSource.src = imageLocation;
            var firstDigit = Math.floor(this.position / 10);
            var lastDigit = this.position % 10;
            if(firstDigit % 2 == 0){
                if(lastDigit - steps < 0){
                    this.position -= 9 + steps;
                }
                else{
                    this.position -= steps;
                }
            }
            else{
                if(lastDigit + steps > 9){
                    this.position -= 9 + steps;
                }
                else{
                    this.position += steps;
                }
            }
            this.updatePosition();
        }
    }

    // Create two players with different offsets to avoid overlap
    const player1 = new Player("../Player/Player 1.png",2, 2);   // Slightly top-left
    const player2 = new Player("../Player/Player 2.png", 15, 15); // Slightly bottom-right

    // Example move logic
    rollDiceButton.addEventListener("click", () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        player1.move(diceRoll);
    });
});
