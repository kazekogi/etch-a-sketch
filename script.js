document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("etch-a-sketch-container");
    const resetButton = document.getElementById("reset-button");
    const eraserButton = document.getElementById("eraser-button");
    const rainbowButton = document.getElementById("rainbow-button");
    const resizeButton = document.getElementById("resize-button");

    let isDrawing = false;
    let isEraserActive = false; // Track if eraser is active
    let currentColor = "black"; // Default drawing color

    function createGrid(n) {
        container.innerHTML = "";
        container.style.display = "grid";
        container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
        container.style.width = "80vh";
        container.style.height = "80vh";
        container.style.border = "2px solid black";

        for (let i = 0; i < n * n; i++) {
            let cell = document.createElement("div");
            cell.classList.add("grid-cell");
            container.appendChild(cell);
        }

        enableDrawing();
    }

    function enableDrawing() {
        const cells = document.querySelectorAll(".grid-cell");

        cells.forEach(cell => {
            cell.addEventListener("mousedown", () => {
                isDrawing = true;
                cell.style.backgroundColor = isEraserActive ? "white" : currentColor;
            });

            cell.addEventListener("mouseover", () => {
                if (isDrawing) {
                    cell.style.backgroundColor = isEraserActive ? "white" : currentColor;
                }
            });
        });

        document.addEventListener("mouseup", () => {
            isDrawing = false;
        });
    }

    function toggleEraser() {
        isEraserActive = !isEraserActive; // Toggle eraser state
        eraserButton.classList.toggle("active", isEraserActive); // Toggle button style

        if (isEraserActive) {
            currentColor = "white"; // Set color to erase
        } else {
            currentColor = "black"; // Revert to drawing color
        }
    }

    function setup() {
        let gridSize = prompt("Enter grid size (e.g., 16 for a 16x16 grid):");
        gridSize = parseInt(gridSize);

        if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
            alert("Please enter a number between 1 and 100.");
            return;
        }

        createGrid(gridSize);
    }

    resetButton.addEventListener("click", setup);
    eraserButton.addEventListener("click", toggleEraser);

    setup();
});
