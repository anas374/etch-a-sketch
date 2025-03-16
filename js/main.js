const canvas = document.querySelector(".canvas");

function gridBuilder (gridSize) {
    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement("div");
        gridRow.style.display = "flex";
        gridRow.style.flexDirection = "column";
        gridRow.style.flexGrow = "1";
        gridRow.style.border = "1px solid black";
        gridRow.style.borderCollapse = "collapse";
        canvas.appendChild(gridRow);
        for (let j = 0; j < gridSize; j++) {
            const gridColumn = document.createElement("div");
            gridColumn.style.flexGrow = "1";
            gridColumn.style.border = "1px solid black";
            gridColumn.style.borderCollapse = "collapse";
            gridRow.appendChild(gridColumn);
        }
    } 
}

document.addEventListener('DOMContentLoaded', gridBuilder(16));

const grid = document.querySelector(".canvas").querySelectorAll("div");

grid.forEach(column => {
    const gridBlocks = column.querySelectorAll("div");
    gridBlocks.forEach(gridBlock => {
        gridBlock.addEventListener("mouseover", () => {gridBlock.style.backgroundColor = "black"});
    })
})