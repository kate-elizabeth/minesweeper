import GameStateBuilder from '../GameState/GameStateBuilder';
import Game from '../GameState/Game';

it('returns a empty board', () => {
    const gameStateBuilder = GameStateBuilder();
    const emptyBoard = gameStateBuilder.buildNewGame(0,0,0);
    expect(emptyBoard).toEqual([]);
});

it('builds a small board', () => {
    const gameStateBuilder = GameStateBuilder();
    const game = Game();
    const board = gameStateBuilder.buildNewGame(5,5,1, 2, 2);
    expect(game.verifyBombCount(board, 1)).toBeTruthy();
});

it('builds a board with more columns than rows', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(5,7,1, 2, 2);
    expect(game.verifyBombCount(board, 1)).toBeTruthy();
});

it('builds a board with more rows than colums', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(12, 10, 5, 3, 2);  
    expect(game.verifyBombCount(board, 5)).toBeTruthy();  
});

it('builds a board successfully when first clicked is on the 0,0 boarder', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(12, 10, 5, 0, 0);  
    expect(game.verifyBombCount(board, 5)).toBeTruthy(); 
});

it('builds a board successfully when first clicked is on the max,max boarder', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(12, 10, 8, 11, 9);  
    expect(game.verifyBombCount(board, 8)).toBeTruthy(); 
});

it('builds a board successfully when there are many bombs', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(20, 30, 300, 11, 9);  
    expect(game.verifyBombCount(board, 300)).toBeTruthy(); 
});

it('updates neighbors for the first click', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    let row = 9, column = 13;
    let boardN = gameStateBuilder.buildNewGame(15, 25, 93, row, column);
    let {board, cellsUpdated} = gameStateBuilder.updateBoardForClickedEmptyCell(boardN, row, column);
    expect(board[row][column].isClicked).toBeTruthy();
    
    expect(game.verifyClickedCellCount(board, cellsUpdated)).toBeTruthy();
});

it('updates one cell when clicking on a number cell', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    let row1 = 9, column1 = 13;
    let boardIntro = gameStateBuilder.buildNewGame(15, 25, 93, row1, column1);
    let boardData1 = gameStateBuilder.updateBoardForClickedEmptyCell(boardIntro, row1, column1);
    let {row, column} = game.findRandomNumberCell(boardData1.board);
    let boardData2 = gameStateBuilder.updateBoardForClickedGameCell(boardData1.board, row, column);
    let totalCellsClicked = boardData1.cellsUpdated + boardData2.cellsUpdated;
    expect(game.verifyClickedCellCount(boardData2.board, totalCellsClicked)).toBeTruthy();

});

it('displays all bomb cells when one bomb cell is clicked', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    let row1 = 9, column1 = 13, bombs = 93;
    let boardIntro = gameStateBuilder.buildNewGame(15, 25, bombs, row1, column1);
    let boardData1 = gameStateBuilder.updateBoardForClickedEmptyCell(boardIntro, row1, column1);
    let {row, column} = game.findRandomBombCell(boardData1.board);
    let boardData2 = gameStateBuilder.updateBoardForClickedBomb(boardData1.board, row, column);
    let totalCellsClicked = boardData1.cellsUpdated + boardData2.cellsUpdated;
    expect(game.verifyClickedCellCount(boardData2.board, totalCellsClicked)).toBeTruthy();
    expect(game.verifyClickedBombCount(boardData2.board, bombs)).toBeTruthy();

});



