document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("etch-a-sketch-container");
    const resetButton = document.getElementById("reset-button");
    const eraserButton = document.getElementById("eraser-button");
    const rainbowButton = document.getElementById("rainbow-button");
    const resizeButton = document.getElementById("resize-button");

    let isDrawing = false; // Track if mouse is down
    let isEraserActive = false; // Track if eraser is active
    let currentColor = "black"; // Default drawing color
    let isRainbowMode = false; // Track if rainbow mode is active

    function createGrid(n) { // function to create grid
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
        const cells = document.querySelectorAll(".grid-cell"); // select all grid cells
    
        // Function to determine the color to apply
        function getColor() {
            if (isEraserActive) return "white"; // set color to white when eraser mode is active
            if (isRainbowMode) return randomColor(); // set color to random when rainbow mode is active
            return currentColor; // other wise use black as the default color
        }
    
        cells.forEach(cell => {  // add event listeners to each cell
            cell.addEventListener("mousedown", () => { // click to draw
                isDrawing = true;
                cell.style.backgroundColor = getColor();
            });
    
            cell.addEventListener("mouseover", () => { // drag to draw
                if (isDrawing) {
                    cell.style.backgroundColor = getColor();
                }
            });

            document.addEventListener("mouseup", () => {  // stop drawing when mouse is up
                isDrawing = false;
            });
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

    function toggleRainbowMode(){ // rainbow mode
        isRainbowMode = !isRainbowMode; 
        rainbowButton.classList.toggle("active", isRainbowMode);  

    }

    function randomColor() {
        let r, g, b; // RGB values
        do {
            r = Math.floor(Math.random() * 256); // generate random number between 0 and 255
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        } while (r > 240 && g > 240 && b > 240); // ensure color is not too light

        return `rgb(${r}, ${g}, ${b})`;
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
    rainbowButton.addEventListener("click", toggleRainbowMode);

    setup();
});
