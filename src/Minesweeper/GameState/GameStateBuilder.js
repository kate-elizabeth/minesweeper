import GameMinesweeper from './Game';

function gameStateBuilder() {
    var Game = GameMinesweeper();

    function buildStarterGameBoard(rows, columns){
        const board = new Array(rows);
        for(let i = 0; i < rows; i++){
            board[i] = new Array(columns);
            
            for(let j = 0; j < columns; j++){
                board[i][j] = buildNonBombGameCell(i, j, 0, false);
            }       
        }
        return board;
    }

    function buildNewGame(rows, columns, bombs, offLimitsI, offLimitsJ){
        console.log(`Building New Game with ${rows} rows, ${columns} columns, and ${bombs} bombs`);
       
        const board = buildStarterGameBoard(rows, columns);

        //place the bombs
        for(let i = getRandomIndex(rows), j = getRandomIndex(columns); 
            bombs > 0; i = getRandomIndex(rows), j = getRandomIndex(columns)){
                if(i !== offLimitsI && j !== offLimitsJ){
                    if(!Game.isBombGameCell(board[i][j])){
                        board[i][j] = buildBombGameCell(i, j, false);
                        bombs -= 1;
                    }
                }
        }

        //count neighboring bombs
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                if(!Game.isBombGameCell(board[i][j])){
                    let sum = 0;
                    Game.getCellNeighborsByIndex(board, i, j).forEach( elem => {
                        if(Game.isBombGameCell(elem)){
                            sum += 1;
                        }
                    });
                    if(i === offLimitsI && j === offLimitsJ){
                        board[i][j] = buildNonBombGameCell(i, j, sum, true);
                    }else{
                        board[i][j] = buildNonBombGameCell(i, j, sum, false);
                    }             
                }         
            }
        }

        Game.printBoard(board);

        return board;
    };

    /**
     * @param {*} val zero-based
     */
    function getRandomIndex(val){
        return Math.floor(Math.random() * val);
    };


    function buildNonBombGameCell(row, column, numOfBombNeighbors, isClicked){
        return buildGameCell(row, column, numOfBombNeighbors, isClicked);
    }

    function buildBombGameCell(row, column, isClicked){
        return buildGameCell(row, column, -1, isClicked);
    }

    /**
     * @param {-1, 1-8, 0} value indicates whether it is:
     *  a bomb: -1,
     *  number of bombs in neighbors: 1-8, or 0 
     * @param {*} isClicked 
     */
    function buildGameCell(row, column, value, isClicked){
        return {
            row: row,
            column: column,
            value: value,
            isClicked: isClicked,
        }
    }

    return {
        buildNewGame: buildNewGame,
        buildStarterGameBoard: buildStarterGameBoard,
    };
}




export default gameStateBuilder;

