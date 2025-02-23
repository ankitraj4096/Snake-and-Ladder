document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const rollDiceButton = document.getElementById("rollDice");
    let cells = [];
    let reverse = true;
    let currentPlayer = 1;

    const snakes = { 11: 80, 5: 62, 16: 35, 44: 97, 49: 96, 64: 94 };
    const ladders = { 94: 65, 98: 49, 72: 51, 38: 9, 31: 12, 57: 15 };

    // Creating the board
    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            let num = (9 - row) * 10 + col;
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.position = "relative";
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
        constructor(imageSrc, offsetX, offsetY, name) {
            this.element = document.createElement("img");
            this.element.src = imageSrc;
            this.element.classList.add("player");
            this.position  = 90;
            this.name = name;
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

            // Check if player won
            if (this.position === 0) {
                showWinner(this.name);
            }
        }

        async move(steps) {
            animateDiceRoll(steps);

            let self = this;
            async function animateMovement(no_of_steps) {
                while (no_of_steps > 0) {
                    await delay(500);
                    let firstDigit = Math.floor(self.position / 10);
                    let lastDigit = self.position % 10;
                    if (firstDigit === 0 && lastDigit - no_of_steps < 0) {
                        return;
                    }
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
            }
            
            await animateMovement(steps);
        }
    }

    // Function to animate dice roll
    function animateDiceRoll(steps) {
        const imageSource = document.getElementById("image");
        let count = 0;
        let interval = setInterval(() => {
            let randomFace = Math.floor(Math.random() * 6) + 1;
            imageSource.src = `../Die Faces/dice-six-faces-${randomFace}.svg`;
            count++;
            if (count === 10) {
                clearInterval(interval);
                imageSource.src = `../Die Faces/dice-six-faces-${steps}.svg`;
            }
        }, 100);
    }

    // Function to show winner
    function showWinner(playerName) {
        const winnerPopup = document.createElement("div");
        winnerPopup.classList.add("winner-popup");
        winnerPopup.innerHTML = `
            <div class="winner-message">
                🎉 ${playerName} Wins! 🎉
                <button id="restartGame">Restart</button>
            </div>
        `;
        document.body.appendChild(winnerPopup);

        document.getElementById("restartGame").addEventListener("click", () => {
            location.reload();
        });
    }

    const player1 = new Player("../Player/Player 1.png", 2, 2, "Player 1");
    const player2 = new Player("../Player/Player 2.png", 15, 15, "Player 2");

    rollDiceButton.addEventListener("click", () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        
        if (currentPlayer === 1) {
            player1.move(diceRoll);
            currentPlayer = 2;
            rollDiceButton.textContent = "Player 2's Turn";
        } else {
            player2.move(diceRoll);
            currentPlayer = 1;
            rollDiceButton.textContent = "Player 1's Turn";
        }
    });

    // Winner popup styles
    const style = document.createElement("style");
    style.textContent = `
        .winner-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            font-size: 2rem;
            z-index: 1000;
        }
        .winner-message button {
            margin-top: 10px;
            padding: 10px;
            font-size: 1rem;
            cursor: pointer;
            background: #ffcc00;
            border: none;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);
});
