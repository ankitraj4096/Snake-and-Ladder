document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    let cells = [];
    let reverse = true;

    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
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
            cells[this.position].appendChild(this.element);
        }

        move(steps) {
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
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") player1.move(1); // Move player1 forward
        if (event.key === "ArrowLeft") player2.move(1); // Move player2 forward
    });
});
