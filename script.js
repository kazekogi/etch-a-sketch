document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("etch-a-sketch-container"); // get key elements
    const resetButton = document.getElementById("reset-button");

    let isDrawing = false; // flag to check if mouse is down

    function createGrid(n) { // function to create grid
        container.innerHTML = ""; // Clear previous grid
        container.style.display = "grid"; // make container a css grid
        container.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // create rows and columns with equal width and height
        container.style.gridTemplateRows = `repeat(${n}, 1fr)`;
        container.style.width = "80vh"; // fill the grid 80% of the page
        container.style.height = "80vh"; 
        container.style.border = "2px solid black"; // add black border to grid

        for (let i = 0; i < n * n; i++) {   // create cells in grid
            let cell = document.createElement("div"); // create div element
            cell.classList.add("grid-cell"); // add class to div element for styling

            // click and hold to draw
            cell.addEventListener("mousedown", () => {
                isDrawing = true;
                cell.style.backgroundColor = "black"; // Start drawing on click
            });
            
            cell.addEventListener("mouseover", () => {
                if (isDrawing) {
                    cell.style.backgroundColor = "black"; // Continue drawing when dragging
                }
            });

            container.appendChild(cell);  // append cell to container
            
        }
        // stop drawing when mouse is released
        document.addEventListener("mouseup", () => {
            isDrawing = false;
        });
    }

    function setup() {
        let gridSize = prompt("Enter grid size (e.g., 16 for a 16x16 grid):"); // prompt user for size and convert to int
        gridSize = parseInt(gridSize);

        if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) { // check if input is valid
            alert("Please enter a number between 1 and 100.");
            return;
        }

        createGrid(gridSize);
    }

    resetButton.addEventListener("click", setup);       // Add event listener to reset button

    setup(); // Initialize grid on load
});
