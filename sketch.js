const cellsX = 13;
const cellsY = 7;
const cells = [];
let cellWidth = 0;
let cellHeight = 0;
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
function keyPressed() {
    if (keyCode === ENTER)
        toggleCells();
}
function toggleCells() {
    const cellsToToggle = getCellsToToggle();
    for (const cell of cellsToToggle)
        cell.click();
}
function getCellsToToggle() {
    const cellsToToggle = [];
    for (const col of cells)
        for (const cell of col)
            if (cellNeedsToToggle(cell))
                cellsToToggle.push(cell);
    return cellsToToggle;
}
function cellNeedsToToggle(cell) {
    const aliveNeighbours = getAliveNeighbours(cell);
    return cell.clicked ? aliveNeighbours != 2 && aliveNeighbours != 3 : aliveNeighbours == 3;
}
function getAliveNeighbours({ x, y }) {
    let aliveNeighbours = 0;
    for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++)
            if (i || j)
                if (cells[(y + i + cellsY) % cellsY][(x + j + cellsX) % cellsX].clicked)
                    aliveNeighbours++;
    return aliveNeighbours;
}