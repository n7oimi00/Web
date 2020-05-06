drawBoard(10)

function drawBoard(size) {
    let board = document.getElementById("board")
    let grid = {}

    for (let i = 0; i < size; i++) {
        let row = document.createElement("div")
        row.classList.add("row")
        board.appendChild(row)
        for (let j = 0; j < size; j++) {
            let cell = {}
            cell["id"] = i + "" + j
            cell["mined"] = false
            let graphic = document.createElement("div")
            graphic.classList.add("cell")
            graphic.addEventListener("click", () => clickCell(cell))
            row.appendChild(graphic)
            cell["graphic"] = graphic
            grid[cell["id"]] = cell
        }
    }
    
    placeMines(30, size, grid)
}

function placeMines(mines, size, grid) {
    for (let placedMines = 0; placedMines <= mines;) {
        let x = randomNumber(size)
        let y = randomNumber(size)
        let cell = grid[x + "" + y]
        if (!cell["mined"]) {
            cell["mined"] = true
            ++placedMines
        }
    }
} 

function clickCell(cell) {
    console.log(cell)
    console.log(event.which)
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}