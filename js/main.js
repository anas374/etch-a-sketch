const canvas = document.querySelector(".canvas");
let painting = false;
let randomizeColor = false;

function gridBuilder (gridSize) {
    destroy();
    gridSize = parseInt(gridSize);
    if (gridSize > 100) gridSize = 100;
    for (let i = 0; i < gridSize; i++) {
        const gridRow = document.createElement("div");
        gridRow.style.display = "flex";
        gridRow.style.flexDirection = "column";
        gridRow.style.flexGrow = "1";
        gridRow.style.borderLeft = "1px solid black";
        gridRow.style.borderRight = "1px solid black";
        gridRow.style.borderCollapse = "collapse";
        canvas.appendChild(gridRow);
        for (let j = 0; j < gridSize; j++) {
            const gridColumn = document.createElement("div");
            gridColumn.style.flexGrow = "1";
            gridColumn.style.borderTop = "1px solid black";
            gridColumn.style.borderBottom = "1px solid black";
            gridColumn.style.borderCollapse = "collapse";
            gridColumn.style.backgroundColor = "white";
            gridColumn.setAttribute("draggable", "false");
            gridRow.appendChild(gridColumn);
        }
    }
    
    const grid = document.querySelector(".canvas").querySelectorAll("div");
    grid.forEach(column => {
        const gridBlocks = column.querySelectorAll("div");
        gridBlocks.forEach(gridBlock => {
            gridBlock.addEventListener("mouseover", () => {
                setTimeout(() => {
                    if (gridBlock.style.backgroundColor !== "white") return;
                    if (randomizeColor) {
                        color = getRandomHexColor();
                    }
                    gridBlock.style.backgroundColor = color;
                    setTimeout(() => {
                        gridBlock.style.backgroundColor = "white";
                    }, 300);
                }, 50);
            });

            gridBlock.addEventListener("mousedown", (e) => {
                e.preventDefault();
                painting = true;
            });
            gridBlock.addEventListener("mouseup", () => {painting = false});

            gridBlock.addEventListener("mousemove", () => {
                if (!painting) return;
                if (randomizeColor) {
                    color = getRandomHexColor();
                    gridBlock.style.backgroundColor = color;
                }
                gridBlock.style.backgroundColor = color;
            });
        })
    })
}

document.addEventListener('DOMContentLoaded', gridBuilder(16));

const colorInput = document.querySelector("#color");
let color = "#000000";
colorInput.addEventListener('input', () => {color = colorInput.value});

const changeSize = document.querySelector("#change-size");
changeSize.addEventListener('click', () => {gridBuilder(prompt("Ukuran Grid (Max 100)"))});

function destroy() {
    const blocks = canvas.querySelectorAll("div");
    blocks.forEach(block => block.remove());
}

const clearCanvas = document.querySelector("#clear-canvas");
clearCanvas.addEventListener('click', () => {
    const blocks = canvas.querySelectorAll("div");
    blocks.forEach((block) => {
        block.style.backgroundColor = "white";
    })
});

function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

const randomColorBtn = document.querySelector("#random-color");
randomColorBtn.addEventListener('click', () => {
    if(!randomizeColor) {
        randomizeColor = true;
        randomColorBtn.style.backgroundColor = "lightgrey";
    } else {
        randomizeColor = false;
        randomColorBtn.style.backgroundColor = "white";
        color = colorInput.value;
    }
});