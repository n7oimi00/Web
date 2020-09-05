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
            let handleClick = function () {clickCell(cell, grid)}
            graphic.addEventListener("click", handleClick)
            row.appendChild(graphic)
            cell["graphic"] = graphic
            cell["eventRemover"] = () => {cell["graphic"].removeEventListener("click", handleClick)}
            grid[cell["id"]] = cell
        }
    }
    
    placeMines(20, size, grid)
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
    let x = Number(cell.id.match(/^\d+/)[0])
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

function clickCell(cell, grid) {
    if (cell["mined"] && !cell["clicked"]) {
        revealMines(grid)
    } else if (cell["adjacentMines"] > 0) {
        cell["clicked"] = true
        cell["graphic"].classList.add("clicked")
        cell["graphic"].innerHTML = cell["adjacentMines"]
    } else {
        cell["clicked"] = true
        cell["graphic"].classList.add("clicked")
        cell["neighbours"].forEach(neighbour => {
            let neighbourCell = grid[neighbour]

            if (neighbourCell["adjacentMines"] > 0) {
                neighbourCell["clicked"] = true
                neighbourCell["graphic"].classList.add("clicked")
                neighbourCell["graphic"].innerHTML = neighbourCell["adjacentMines"]                
            } 
            if (neighbourCell["adjacentMines"] == 0 && !neighbourCell["clicked"]) {
                clickCell(neighbourCell, grid)
            }
        })
    }
}

function revealMines(grid) {
    for (let [, value] of Object.entries(grid)) {
        value["eventRemover"]()
        if (value["mined"]) {
            value["graphic"].innerHTML = "¤"
        }
    }    
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}