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
            cell["id"] = i + "/" + j
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
    calculateMineCount(grid, size)
}

function placeMines(mines, size, grid) {
    for (let placedMines = 0; placedMines < mines;) {
        let x = randomNumber(size)
        let y = randomNumber(size)
        let cell = grid[x + "/" + y]
        if (!cell["mined"]) {
            cell["mined"] = true
            ++placedMines
        }
    }
    //return grid
} 

function calculateMineCount(grid, size) {
    for (let [, value] of Object.entries(grid)) {
        let neighbours = findNeighbours(value, size)
        value["neighbours"] = neighbours
        
        if(!value["mined"]) {
            let adjacentMines = 0 
            neighbours.forEach(neighbour => {
                if(grid[neighbour]["mined"]) {
                    adjacentMines++
                }
            })            
            value["adjacentMines"] = adjacentMines
        }
    }
}

function findNeighbours(cell, size) {
    let x = Number(cell.id.match(/\d+/)[0])
    let y = Number(cell.id.match(/\d+$/)[0])
    let neighbours = []

    if(x != 0) {
        if(y != 0) {
            neighbours.push((x - 1) + "/" + (y - 1))
        }
        neighbours.push((x - 1) + "/" + y)
        if(y != (size - 1)) {
            neighbours.push((x - 1) + "/" + (y + 1))
        }        
    }
    if (y != 0) {
        neighbours.push(x + "/" + (y - 1))
    }
    if (y != (size - 1)){
        neighbours.push(x + "/" + (y + 1))    
    }
    if(x != (size - 1)) {
        if(y != 0) {
            neighbours.push((x + 1) + "/" + (y - 1))
        }
        neighbours.push((x + 1) + "/" + y)
        if(y != (size - 1)) {
            neighbours.push((x + 1) + "/" + (y + 1))
        }        
    }

    return neighbours
}

function clickCell(cell) {
    if (cell["mined"]) {
        cell["graphic"].innerHTML = "X"
    } else {
        cell["graphic"].innerHTML = cell["adjacentMines"]
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}