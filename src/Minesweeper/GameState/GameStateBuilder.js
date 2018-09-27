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
            row: Game.getRandomIndex(0, rows - 1),
            column: getBombableIndex(columns - 1, offLimitsJ),
        });
        ret.push({
            row: getBombableIndex(rows - 1, offLimitsI),
            column: Game.getRandomIndex(0, columns - 1),
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
            indexOptions.push(Game.getRandomIndex(0, offLimits - 2));
        }
        if((offLimits + 2) <= max){
            indexOptions.push(Game.getRandomIndex(offLimits + 2, max));
        }
        choice = indexOptions[Game.getRandomIndex(0, indexOptions.length - 1)];
        
        return choice;  
    }

    function updateBoardForClickedGameCell(board, row, column){
        let cell = buildClickedGameCell(board, row, column)
        board[row][column] = cell;
        return {
            board: board,
            cellsUpdated: 1,
        };
    }

    function updateBoardForClickedBomb(board){
        let cellsUpdated = 0;
        board.forEach((rowArr, i) => {
            rowArr.forEach((elem, j) => {
                if(Game.isBombGameCell(elem)){
                    board[i][j] = buildClickedGameCell(board, i, j);
                    cellsUpdated += 1;
                }
            });
        });
        return {
            board: board,
            cellsUpdated: cellsUpdated,
        };
    }

    function updateBoardForClickedEmptyCell(board, row, column){
        let neighbors = [] ; let indicesSeen; 
        board[row][column] = buildClickedGameCell(board, row, column);
        indicesSeen = new Set(); //items will be stored as strings "i-j"
        indicesSeen.add(Game.buildIndexKey(row, column));
        neighbors = addUnseenNeighbors(neighbors, indicesSeen, board, row, column);
        while(neighbors.length > 0){
            let cell = neighbors.pop();

            //add its indices to the set
            let key = Game.buildIndexKey(cell.row, cell.column);
            indicesSeen.add(key);
            
            //if is an empty cell, add its neighbors
            if(Game.isEmptyGameCell(cell)){
                neighbors = addUnseenNeighbors(neighbors, indicesSeen, board, cell.row, cell.column);
            }

            //if it is a number cell, only update it
            board[cell.row][cell.column] = buildClickedGameCell(board, cell.row, cell.column);
        }

        return {
            board: board,
            cellsUpdated: indicesSeen.size,
        }
    }

    function addUnseenNeighbors(neighbors, indicesSeen, board, row, column){
        const currentNeighbors = Game.getCellNeighborsByIndex(board, row, column);
        currentNeighbors.forEach((neighbor) => {
            let key = Game.buildIndexKey(neighbor.row, neighbor.column);
            if(!indicesSeen.has(key)){
                indicesSeen.add(key);
                neighbors.push(neighbor);
            }
        });
        return neighbors;
    }

    function buildClickedGameCell(board, row, column){
        let cell = board[row][column];
        return {...cell, isClicked: true};
    }

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
        updateBoardForClickedGameCell: updateBoardForClickedGameCell,
        updateBoardForClickedBomb: updateBoardForClickedBomb,
        updateBoardForClickedEmptyCell: updateBoardForClickedEmptyCell,
    };
}


export default gameStateBuilder;

