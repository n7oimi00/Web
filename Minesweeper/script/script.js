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
        }
    }
    
    placeMines()
}

function placeMines(mines) {

} 

function clickCell(cell) {
    console.log(cell)
    console.log(event)
}

function randomNumber(max) {
    return 
}