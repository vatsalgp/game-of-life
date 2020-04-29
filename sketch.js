const cellsX = 13;
const cellsY = 7;

let cellWidth = 0;
let cellHeight = 0;
let cells = [];
let cellsToToggle = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let y = 0; y < cellsY; y++) {
        cells.push([]);
        for (let x = 0; x < cellsX; x++) {
            cells[y].push(new Cell(y, x));
        }
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    cellWidth = width / cellsX;
    cellHeight = height / cellsY;
    for (const col of cells) {
        for (const cell of col) {
            cell.show(cellWidth, cellHeight);
        }
    }
}
function mouseClicked() {
    let x = Math.floor(mouseX / cellWidth);
    let y = Math.floor(mouseY / cellHeight);
    cells[y][x].click();
}
function iterate() {
    for (const col of cells)
        for (const cell of col)
            cellToToggle(cell, aliveNeighbours(cell));
}
function aliveNeighbours(cell) {
    let aliveNeighbours = 0;
    const neighbours = adjacent(cell);
    for (const neighbour of neighbours)
        if (cells[neighbour[0]][neighbour[1]].clicked)
            aliveNeighbours++;
    return aliveNeighbours;
}
function cellToToggle(cell, aliveNeighbours) {
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
    let output = [];
    let cells = [
        [y - 1, x + 1],
        [y - 1, x],
        [y - 1, x - 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x + 1],
        [y + 1, x],
        [y + 1, x - 1],
    ];
    for (const cell of cells)
        if (cellExists(cell))
            output.push(cell);
    return output;
}
function cellExists([y, x]) {
    return positionExists(y, cellsY) && positionExists(x, cellsX);
}
function positionExists(position, limit) {
    return position >= 0 && position < limit;
}
function toggleCells() {
    for (const cell of cellsToToggle)
        cell.click();
    cellsToToggle = [];
}
function keyPressed() {
    if (keyCode === ENTER) {
        iterate();
        toggleCells();
    }
}