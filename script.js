document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    let cells = [];
    let reverse = true;

    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            let num = row * 10 + (reverse ? 9 - col : col) + 1;
            let cell = document.createElement("div");
            // cell.textContent = num;
            cell.classList.add("cell");
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
});
