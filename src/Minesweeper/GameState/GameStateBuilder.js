
function gameStateBuilder() {

     function buildNewGame(rows, columns, bombs){
        
        console.log(`Building New Game with ${rows} rows, ${columns} columns, and ${bombs} bombs`);
        
        const board = new Array(rows);
        for(let i = 0; i < rows; i++){
            board[i] = new Array(columns);
            
            for(let j = 0; j < columns; j++){
                board[i][j] = buildNonBombGameCell(i, j, 0, false);
            }
            
        }

        //place the bombs
        for(let i = getRandomIndex(rows), j = getRandomIndex(columns); 
                bombs > 0; i = getRandomIndex(rows), j = getRandomIndex(columns)){
            if(!isBombGameCell(board[i][j])){
                board[i][j] = buildBombGameCell(i, j, false);
                bombs -= 1;
            }
        }

        //count neighboring bombs
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                if(!isBombGameCell(board[i][j])){
                    let sum = 0;
                    getCellNeighborsByIndex(board, i, j).forEach( elem => {
                        if(isBombGameCell(elem)){
                            sum += 1;
                        }
                    });
                    board[i][j] = buildNonBombGameCell(i, j, sum, false);
                }         
            }
        }

        printBoard(board);

        return board;
    };



    function getCellNeighbors(board, cell){
        return getCellNeighborsByIndex(board, cell.row, cell.colum);
    }

    function getCellNeighborsByIndex(board, row, column){
        let ret = [];
        if(!isRowMinEdge(row)){
            ret.push(board[row - 1][column]);
            if(!isColumnMinEdge(column)){
                ret.push(board[row - 1][column - 1]);
            }
            if(!isColumnMaxEdge(board, column)){
                ret.push(board[row - 1][column + 1]);
            }
        }
        if(!isRowMaxEdge(board, row)){
            ret.push(board[row + 1][column]);
            if(!isColumnMinEdge(column)){
                ret.push(board[row + 1][column - 1]);
            }
            if(!isColumnMaxEdge(board, column)){
                ret.push(board[row + 1][column + 1])
            }
        }
        if(!isColumnMinEdge(column)){
            ret.push(board[row][column - 1]);
        }
        if(!isColumnMaxEdge(board, column)){
            ret.push(board[row][column + 1]);
        }

        return ret;
    }

    function isRowMinEdge(row){
        return row === 0;
    }

    function isColumnMinEdge(column){
        return column === 0;
    }

    function isColumnMaxEdge(board, column){
        if(board[0]){
            return column === (board[0].length - 1);
        }else return true;     
    }

    function isRowMaxEdge(board, row){
        if(board[0]){
            return row === (board.length - 1);
        }else return true;       
    }
    
    function printBoard(board){
        let rowVals = board.map(row => {
            let vals = row.map(elem => {
                if(isBombGameCell(elem)){
                    return 'B';
                }else return elem.value;
            });
            return "[" + vals.join(" ") + "]";
        });
        console.log(rowVals.join('\n'));
    }

    /**
     * @param {*} val zero-based
     */
    function getRandomIndex(val){
        return Math.floor(Math.random() * val);
    };

    function isBombGameCell(cell){
        if(cell){
            return cell.value < 0;
        }else return false;
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
        buildNewGame : buildNewGame,
    };
}




export default gameStateBuilder;

