

function Game(){

    function gameWon(rows, columns, bombs, numCells){
        console.log(`${rows} ${columns} ${bombs} ${numCells}`);
        let totalCells = rows*columns;
        return ((totalCells - bombs) === numCells);
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

    function buildIndexKey(row, column){
        return `${row}-${column}`;
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

    function stringifyBoard(board){
        let rowVals = board.map(row => {
            let vals = row.map(elem => {
                if(isBombGameCell(elem)){
                    return `B-${elem.isClicked ? 1 : 0}`;
                }else return `${elem.value}-${elem.isClicked ? 1 : 0}`;
            });
            return "[" + vals.join(" ") + "]";
        });
        rowVals = rowVals.join('\n');
        return rowVals;
    }
    
    function printBoard(board){
       console.log(stringifyBoard(board));
    }

    function isBombGameCell(cell){
        if(cell){
            return cell.value < 0;
        }else return false;
    }

    function isNumberGameCell(cell){
        if(cell){
            return cell.value > 0;
        }else return false;
    }

    function isEmptyGameCell(cell){
        if(cell){
            return cell.value === 0;
        }else return false;
    }

    function verifyBombCount(board, num){
        return verifyCellCount(board, /B/g, num);
    }

    function verifyClickedCellCount(board, num){
        return verifyCellCount(board, /-1/g, num);      
    }

    function verifyClickedBombCount(board, num){
        return verifyCellCount(board, /B-1/g, num )
    }

    function verifyCellCount(board, regex, num){
        let boardStr = stringifyBoard(board);
        let matches = boardStr.match(regex);
        if(matches){
            return matches.length === num
        }else return num === 0;        
    }

    function findRandomNumberCell(board){
        return findRandomCell(board, isNumberGameCell);
    }

    function findRandomBombCell(board){
        return findRandomCell(board, isBombGameCell);
    }

    /**
     * 
     * @param {*} board 
     * @param {*} testFunc isNumberGameCell | isBombGameCell | isEmptyGameCell
     */
    function findRandomCell(board, testFunc){

        let randCell, randRow, filteredRow = [];
        while(filteredRow.length === 0){
            randRow = board[getRandomIndex(0, board.length-1)];
            filteredRow = randRow.filter((elem) => {
                return testFunc(elem);
            });
    
            randCell = filteredRow[getRandomIndex(0, filteredRow.length - 1)];
        }

        return randCell;
    }

    /**
     * @param {*} min <int> inclusive
     * @param {*} max <int> inclusive
     */
    function getRandomIndex(min, max){
        const rand = (Math.floor(Math.random() * (max - min + 1)) + min);
        //console.log(`Rand: ${rand} with min ${min} and max ${max}`);
        return rand;
    };

    return {
        getCellNeighborsByIndex: getCellNeighborsByIndex,
        printBoard: printBoard,
        verifyBombCount: verifyBombCount,
        verifyClickedCellCount: verifyClickedCellCount,
        stringifyBoard: stringifyBoard,
        isBombGameCell: isBombGameCell,
        isNumberGameCell: isNumberGameCell,
        isEmptyGameCell: isEmptyGameCell,
        buildIndexKey: buildIndexKey,
        gameWon: gameWon,
        findRandomNumberCell:findRandomNumberCell,
        findRandomBombCell: findRandomBombCell,
        getRandomIndex: getRandomIndex,
        verifyClickedBombCount:verifyClickedBombCount,
    };
}


export default Game;

