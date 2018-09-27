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
       
        let board = buildStarterGameBoard(rows, columns);

        //randomly place the bombs
        board = randomlyPlaceBombs(board, rows, columns, bombs, offLimitsI, offLimitsJ);

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

    function randomlyPlaceBombs(board, rows, columns, bombs, offLimitsI, offLimitsJ){
        let bombableCellIndices = getNextBombableCellOptions(rows, columns, offLimitsI, offLimitsJ);
        let current;
        while(bombs > 0){
            current = bombableCellIndices.pop();
            if(!Game.isBombGameCell(board[current.row][current.column])){
                board[current.row][current.column] = buildBombGameCell(current.row, current.column, false);
                bombs -= 1;
            }
            if(bombableCellIndices.length === 0){
                bombableCellIndices = getNextBombableCellOptions(rows, columns, offLimitsI, offLimitsJ);
            }
        }
        return board;
    }

    function getNextBombableCellOptions(rows, columns, offLimitsI, offLimitsJ){
        var ret = [];
        ret.push({
            row: getBombableIndex(rows - 1, offLimitsI),
            column: getBombableIndex(columns - 1, offLimitsJ),
        });
        ret.push({
            row: getRandomIndex(0, rows - 1),
            column: getBombableIndex(columns - 1, offLimitsJ),
        });
        ret.push({
            row: getBombableIndex(rows - 1, offLimitsI),
            column: getRandomIndex(0, columns - 1),
        });
        return ret;
    }

    /**
     * Randomly and efficiently choose an index that avoids the 
     * offlimits indices and their neighbors 
     * @param {*} max 
     * @param {*} offLimits 
     */
    function getBombableIndex(max, offLimits){
        const indexOptions = []; 
        let choice;    
        if((offLimits - 2) >= 0){
            indexOptions.push(getRandomIndex(0, offLimits - 2));
        }
        if((offLimits + 2) <= max){
            indexOptions.push(getRandomIndex(offLimits + 2, max));
        }
        choice = indexOptions[getRandomIndex(0, indexOptions.length - 1)];
        //console.log(`Bombable index between offlimits ${offLimits} and max ${max} : ${choice}`);
        return choice;  
    }

    /**
     * 
     * @param {*} min <int> inclusive
     * @param {*} max <int> inclusive
     */
    function getRandomIndex(min, max){
        const rand = (Math.floor(Math.random() * (max - min + 1)) + min);
        //console.log(`Rand: ${rand} with min ${min} and max ${max}`);
        return rand;
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

