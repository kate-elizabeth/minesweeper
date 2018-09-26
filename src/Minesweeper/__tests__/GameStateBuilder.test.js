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
    const board = gameStateBuilder.buildNewGame(5,5,3);
    expect(game.verifyBombCount(board, 3)).toBeTruthy();
});

it('builds a board with more columns than rows', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(5,7,3);
    expect(game.verifyBombCount(board, 3)).toBeTruthy();
});

it('builds a board with more rows than colums', () => {
    const game = Game();
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(7,5,5);  
    expect(game.verifyBombCount(board, 5)).toBeTruthy();  
});

