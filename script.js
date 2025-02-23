document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    let cells = [];
    let reverse = true;

    for (let row = 9; row >= 0; row--) {
        let tempRow = [];
        for (let col = 0; col < 10; col++) {
            let num = row * 10 + (reverse ? 9 - col : col) + 1;
            let cell = document.createElement("div");
            cell.textContent = num;
            cell.style.backgroundColor = num % 2 === 0 ? "#f4a261" : "#ffe066";
            tempRow.push(cell);
        }
        reverse = !reverse;
        cells.push(...tempRow);
    }

    cells.forEach(cell => board.appendChild(cell));
});
