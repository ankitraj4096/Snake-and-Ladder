document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const rollDiceButton = document.getElementById("rollDice");
    let cells = [];
    let reverse = true;

    const snakes = { 11: 80, 5: 62, 16: 35, 44: 97, 49: 96, 64: 94 };
    const ladders = { 94: 65, 98: 49, 72: 51, 38: 9, 31: 12, 57: 15 };

    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            let num = (9 - row) * 10 + col;
            let cell = document.createElement("div");
            cell.classList.add("cell");
            // cell.textContent = num;
            cell.style.position = "relative";
            if (row === 9) cell.classList.add("top-row");
            if (row === 0) cell.classList.add("bottom-row");
            if (col === 0) cell.classList.add("left-col");
            if (col === 9) cell.classList.add("right-col");
            tempRow.push(cell);
        }
        reverse = !reverse;
        cells.push(...tempRow);
    }

    cells.forEach(cell => board.appendChild(cell));

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    class Player {
        constructor(imageSrc, offsetX, offsetY) {
            this.element = document.createElement("img");
            this.element.src = imageSrc;
            this.element.classList.add("player");
            this.position = 90;
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

        async move(steps) {
            const imageSource = document.getElementById("image");
            imageSource.src = `../Die Faces/dice-six-faces-${steps}.svg`;
            
            let self = this;
            async function animateMovement(no_of_steps) {
                while (no_of_steps > 0) {
                    await delay(500);
                    let firstDigit = Math.floor(self.position / 10);
                    let lastDigit = self.position % 10;

                    if (firstDigit % 2 === 0) {
                        if (lastDigit === 0) {
                            self.position -= 10;
                        } else {
                            self.position--;
                        }
                    } else {
                        if (lastDigit === 9) {
                            self.position -= 10;
                        } else {
                            self.position++;
                        }
                    }
                    cells[self.position].appendChild(self.element);
                    no_of_steps--;
                }
                self.updatePosition();
                
                if (snakes[self.position]) {
                    self.position = snakes[self.position];
                } else if (ladders[self.position]) {
                    self.position = ladders[self.position];
                }
                self.updatePosition();
            }
            
            animateMovement(steps);
        }
    }

    const player1 = new Player("../Player/Player 1.png", 2, 2);
    const player2 = new Player("../Player/Player 2.png", 15, 15);

    rollDiceButton.addEventListener("click", () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        player1.move(diceRoll);
    });
});
