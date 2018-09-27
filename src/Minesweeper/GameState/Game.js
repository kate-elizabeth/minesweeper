
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
                    return 'B';
                }else return elem.value;
            });
            return "[" + vals.join(" ") + "]";
        });
        rowVals = rowVals.join('\n');
        return rowVals;
    }

    function verifyBombCount(board, num){
        let boardStr = stringifyBoard(board);
        let matches = boardStr.match(/B/g);
        if(matches){
            return matches.length === num
        }else return num === 0;
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

    return {
        getCellNeighborsByIndex: getCellNeighborsByIndex,
        printBoard: printBoard,
        verifyBombCount: verifyBombCount,
        stringifyBoard: stringifyBoard,
        isBombGameCell: isBombGameCell,
        isNumberGameCell: isNumberGameCell,
        isEmptyGameCell: isEmptyGameCell,
        buildIndexKey: buildIndexKey,
        gameWon: gameWon,
    };
}


export default Game;

