import GameStateBuilder from '../GameState/GameStateBuilder';

it('returns a empty board', () => {
    const gameStateBuilder = GameStateBuilder();
    const emptyBoard = gameStateBuilder.buildNewGame(0,0,0);
    expect(emptyBoard).toEqual([]);
});

it('builds a small board', () => {
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(5,5,3);
});

it('builds a board with more columns than rows', () => {
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(5,7,3);
});

it('builds a board with more rows than colums', () => {
    const gameStateBuilder = GameStateBuilder();
    const board = gameStateBuilder.buildNewGame(7,5,3);    
});

