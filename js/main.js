const canvas = document.querySelector(".canvas");
let painting = false;

function gridBuilder (gridSize) {
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
}

document.addEventListener('DOMContentLoaded', gridBuilder(16));

const grid = document.querySelector(".canvas").querySelectorAll("div");

grid.forEach(column => {
    const gridBlocks = column.querySelectorAll("div");
    gridBlocks.forEach(gridBlock => {
        gridBlock.addEventListener("mouseover", () => {
            setTimeout(() => {
                if (gridBlock.style.backgroundColor !== "white") return;
                gridBlock.style.backgroundColor = "black";
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
            gridBlock.style.backgroundColor = "black";
        });
    })
})