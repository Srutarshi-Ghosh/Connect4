
function copy(x){
    return JSON.parse(JSON.stringify(x))
}

function setup(){
    var rows = document.getElementsByClassName("row")

    for(var i = 0; i < rows.length; i++){
        rows[i].setAttribute("row_no", String(i+1))
        var slot = rows[i].getElementsByClassName("square")

        for(var j = 0; j < slot.length; j++){
            slot[j].setAttribute("row", String(i+1))
            slot[j].setAttribute("col", String(j+1))
        }
    }

    var sp = document.getElementsByClassName("special_square")
    for(var i = 0; i < sp.length; i++){
        sp[i].setAttribute("col", String(i+1))
    }
    for(var i = 0; i < 6; i++){
        BOARD.push([])
        for(var j = 0; j < 7; j++){
            BOARD[i].push('-')
        }
    }
    
}

var ROWS = 6, COLUMNS = 7, TURN = 1
var BOARD = [], FILLED = []
var P1 = "Y", P2 = "R"
var PLAYER = P1
var WINNER = false
setup()
var RESET = copy(BOARD)


function getcolor(){
    if(TURN == 1)
        return "yellow"
    else
        return "red"
}

var hovershow = function(){
    if(!WINNER){
        console.log(1)
        var color = getcolor()
        var column = this.getAttribute("col")
        var sp = document.getElementsByClassName("special_square")
        var elem = sp[column-1]
        elem.style.opacity = "100%"
        elem.style.backgroundColor = color
    }
}

var hoverhide = function(){
    var sp = document.getElementsByClassName("special_square")
    for(let i = 0; i < sp.length; i++){
        sp[i].style.opacity = "0%"
    }
}


var makemove = function(){
    if(!WINNER){
        var column = Number(this.getAttribute("col"))
        var color = getcolor()
        if(!FILLED.includes(column)){
            var row = getPosistion(column, PLAYER)
            placestone(row, column, color)
            var val = checkwinner(row, column, PLAYER)
            console.log(val)
            if(val != false){
                WINNER = true
                highlight(val)
                alert("Player " + TURN + "Wins")
            }
            else
                changeturn()
        }
    }
    hoverhide()
}

var sq = document.getElementsByClassName("square")
for(var i = 0; i < sq.length; i++){
    sq[i].addEventListener("mouseover", hovershow)
    sq[i].addEventListener("mouseout", hoverhide)
    sq[i].addEventListener("click", makemove)
}


function getPosistion(col, player){
    for(var i = ROWS-1; i >= 0; i--){
        if(BOARD[i][col-1] == '-'){
            BOARD[i][col-1] = player
            if(i == 0)
                FILLED.push(col)
            return i+1
        }
    }
}


function changeturn(){
    if(TURN == 1){
        TURN = 2
        PLAYER = P2
    }
    else{
        TURN = 1
        PLAYER = P1
    }
}


function placestone(row, col, color){
    var row = document.getElementsByClassName("row")[row-1]
    var elem = row.getElementsByClassName("square")[col-1]

    elem.style.backgroundColor = color
}


function checkwinner(row, column, player){
    let dir_x = [-1, -1, 0, 1, 1, 1, 0, -1]
    let dir_y = [0, -1, -1, -1, 0, 1, 1, 1]
    let conn, pos_x, pos_y
    let pos

    for(var i = 0; i < dir_x.length; i++){
        conn = 1
        pos = [[row, column]]
        for(var j = 1; j < 4; j++){
            pos_x = column + (dir_x[i] * j) -1
            pos_y = row + (dir_y[i] * j) -1

            if(pos_x < 0 || pos_x >= COLUMNS || pos_y < 0 || pos_y >= ROWS)
                break

            if(BOARD[pos_y][pos_x] == player){
                pos.push([copy(pos_y+1), copy(pos_x+1)])
                conn++
            }
            else
                break
            if(conn == 4)
                return pos
        }
    }
    return false
}

var faderow = document.getElementsByClassName("row")

function highlight(pos){
    let x, y, r, elemlist = []    

    for(var i = 0; i < 4; i++){
        x = pos[i][0], y = pos[i][1]
        r = faderow[x-1]
        elemlist.push(r.getElementsByClassName("square")[y-1])
    }
    
    for(var i = 0; i < 4; i++){
        elemlist[i].style.backgroundColor = "blue"
    }
    
}

// $("#game").click(function(){
//     $("#game").fadeToggle("swing")
// })

function resetboard(){
    var rows = document.getElementsByClassName("row")
    for(var i = 0; i < rows.length; i++){
        var sq = rows[i].getElementsByClassName("square")
        for(var j = 0; j < sq.length; j++){
            sq[j].removeAttribute("style")
        }
    } 
    BOARD = copy(RESET)
    TURN = 1
    PLAYER = P1
    WINNER = false
}


// function vanish(elem){
//     if(elem.style.opacity == "80%" || elem.style.opacity == "100%"){
//         elem.style.opacity = "10%"
//     }
//     else{
//         elem.style.opacity = "80%"
//     }
// }