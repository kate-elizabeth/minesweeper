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
    const board = gameStateBuilder.buildNewGame(12,10, 5, 3, 2);  
    expect(game.verifyBombCount(board, 5)).toBeTruthy();  
});

it('builds a board successfully when first clicked is on the 0,0 boarder', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(12,10, 5, 0, 0);  
    expect(game.verifyBombCount(board, 5)).toBeTruthy(); 
});

it('builds a board successfully when first clicked is on the max,max boarder', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(12,10, 8, 11, 9);  
    expect(game.verifyBombCount(board, 8)).toBeTruthy(); 
});

it('builds a board successfully when there are many bombs', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(20,30, 300, 11, 9);  
    expect(game.verifyBombCount(board, 300)).toBeTruthy(); 
});

