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
            cells[y].push(new Cell(y, x));
            cells[y][x].show(cellWidth, cellHeight);
        }
    }
}
function mouseClicked() {
    let x = Math.floor(mouseX / cellWidth);
    let y = Math.floor(mouseY / cellHeight);
    cells[y][x].click();
}
function iterate() {
    let cellsToToggle = [];
    for (const col of cells) {
        for (const cell of col) {
            let aliveNeighbours = 0;
            const neighbours = adjacent(cell);
            for (const neighbour of neighbours) {
                if (cells[neighbour[0]][neighbour[1]].clicked)
                    aliveNeighbours++;
            }
            if (cell.clicked) {
                //Cell is ALive
                if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                    //Lives next round
                }
                else {
                    //Dies next round
                    cellsToToggle.push(cell);
                }
            } else {
                //Cell is Dead
                if (aliveNeighbours == 3) {
                    //Cell gets born
                    cellsToToggle.push(cell);
                }
            }
        }
    }
    toggleCells(cellsToToggle);
}
function adjacent({ x, y }) {
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
    let output = [];
    for (const cell of cells) {
        if (cellExists(cell)) {
            output.push(cell);
        }
    }
    return output;
}
function cellExists(cell) {
    let y = cell[0], x = cell[1];
    if (y >= 0 && y < cellsY && x >= 0 && x < cellsX)
        return true;
    return false;
}
function toggleCells(cells) {
    for (const cell of cells) {
        cell.click();
    }
}
function keyPressed() {
    if (keyCode === ENTER)
        iterate();
}