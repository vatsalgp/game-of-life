const cellsX = 13;
const cellsY = 7;

let cellWidth = 0;
let cellHeight = 0;
let cells = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let y = 0; y < cellsY; y++) {
        cells.push([]);
        for (let x = 0; x < cellsX; x++)
            cells[y].push(new Cell(y, x));
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    cellWidth = width / cellsX;
    cellHeight = height / cellsY;
    for (const col of cells)
        for (const cell of col)
            cell.show(cellWidth, cellHeight);
}
function mouseClicked() {
    let x = Math.floor(mouseX / cellWidth);
    let y = Math.floor(mouseY / cellHeight);
    cells[y][x].click();
}
function iterate() {
    let cellsToToggle = [];
    for (const col of cells)
        for (const cell of col)
            cellToToggle(cell, aliveNeighbours(cell), cellsToToggle);
    return cellsToToggle;
}
function aliveNeighbours(cell) {
    let aliveNeighbours = 0;
    const neighbours = adjacent(cell);
    for (const neighbour of neighbours)
        if (cells[neighbour[0]][neighbour[1]].clicked)
            aliveNeighbours++;
    return aliveNeighbours;
}
function cellToToggle(cell, aliveNeighbours, cellsToToggle) {
    if (cell.clicked) {
        //Cell is ALive
        if (!(aliveNeighbours == 2 || aliveNeighbours == 3))
            cellsToToggle.push(cell);
        //Dies next round
    } else {
        //Cell is Dead
        if (aliveNeighbours == 3)
            cellsToToggle.push(cell);
        //Cell gets born
    }
}
function adjacent({ x, y }) {
    const output = [];
    for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++)
            if (i || j)
                output.push([(y + i + cellsY) % cellsY, (x + j + cellsX) % cellsX]);
    return output;
}
function toggleCells(cellsToToggle) {
    for (const cell of cellsToToggle)
        cell.click();
    cellsToToggle = [];
}
function keyPressed() {
    if (keyCode === ENTER)
        toggleCells(iterate());
}