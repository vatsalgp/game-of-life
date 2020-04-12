const cellsX = 20;
const cellsY = 10;
let cellWidth = 0;
let cellHeight = 0;
let cells = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    cellWidth = width / cellsX;
    cellHeight = height / cellsY;
    for (let y = 0; y < cellsY; y++) {
        cells.push([]);
        for (let x = 0; x < cellsX; x++) {
            cells[y].push(new Cell(x, y));
            cells[y][x].show(cellWidth, cellHeight);
        }
    }
}
function mouseClicked() {
    let x = Math.floor(mouseX / cellWidth);
    let y = Math.floor(mouseY / cellHeight);
    cells[y][x].click();
}
