
let turn;
let winCombinations = [[1,2,3], [4,5,6], [7,8,9], 
                        [1,4,7], [2,5,8], [3,6,9], 
                        [1,5,9], [3,5,7]];
let table;
let gameStatus;

document.addEventListener("DOMContentLoaded", ()=>{
    initGame();
});

function initGame(){
    gameStatus = GameStatus.Running;
    turn = State.Empty;
    document.querySelector('.winner').textContent = "Reiniciar";
    initTable();
    newTurn();
}

function initTable(){
    table = [];
    let tiles = [];
    for(let i = 1; i <= 9; i++){
        table[i] = State.Empty;
        let tile = document.createElement("div");
        tile.id = i;
        tile.classList.add("tile");
        tile.addEventListener("click", checkTile);
        tiles.push(tile);
    }
    document.querySelector(".grid").replaceChildren(...tiles);
}

function newTurn(){
    if(turn === State.Empty){
        turn = Math.round(Math.random()) == 0 ? State.X : State.O;
    }else{
        turn = turn === State.X ? State.O : State.X;
    }

    document.querySelector('.icon-player-turn').textContent = turn;   
}

function checkTile(e){
    if(gameStatus === GameStatus.Stop) return;

    let tile = e.target;
    let id = tile.id;
    if(table[id] != State.Empty) return;
    table[id] = turn;
    tile.textContent = turn;

    checkWinnerOrWithdraw();
    newTurn();
}

function checkWinnerOrWithdraw(){
    for(comb of winCombinations){
        let firstState = table[comb[0]];
        if(firstState === State.Empty) continue;
        if(table[comb[1]] === firstState &&
            table[comb[2]] === firstState){
                endGame(firstState);
                return;
            }
    }

    let emptyTiles = 0;

    table.forEach((tile) => {
        if(tile === State.Empty) emptyTiles++;
    });

    if(emptyTiles == 0){
        endGame("Empate");
    }

}

function endGame(msg){
    gameStatus = GameStatus.Stop;
    document.querySelector('.winner').textContent = msg;
}

const State = {
    Empty: "Empty", 
    X: "X", 
    O: "O"
};

const GameStatus = {
    Running: "Running",
    Stop: "Stop"
}