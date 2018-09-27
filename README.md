# Minesweeper Game

A single page React App that allows a single player to play the Minesweeper game with a configurable game board (rows and columns).

To ensure good game play, the game allows for any size board within a min and max
constraint. Either rows or columns can be:
    Min: 5
    Max: 50;

Additionally, it is worth noting that as of now the game does not support multiple skill levels in terms of number of bombs. 

For a given n rows and m columns, bombs are calculated as such:
```
bombs = rounded_down_to_nearest_integer ((n * m)/4)
```
I recommend adjusting difficulty in terms of number of rows or columns:

```
Introductory: row: 5, columns: 5
Beginner 1: row: 10, columns: 15
Beginner 2: row: 15, columns: 25
Intermediate: 20, columns: 45
Advanced: 40, 45
``` 

## Installing:

```
npm install
```

## To Run:

```
npm start
yarn start
```
## To Run Jest Tests:

```
yarn test
```

## Overview of Key Components 

### Game State Representation:
The game board is represented as an array of arrays where board[rowIndex][columnIndex] references a particular cell.  
    
```
An individual cell object stores this data:
{
        row: row,               //  <int> values: 0...(rowCount - 1)
        column: column,         //  <int> values: 0...(columnCount - 1)
        value: value,           //  <int> values: -1..8
        isClicked: isClicked,   //  <boolean>
}
```

Notably, the value represents "what sort of cell" it is:


#### -1  :    "a Bomb Cell"
#### 0   :    "A Empty Cell" has zero Bomb neighbors, so when its clicked, it's neighbors need to recursively be revealed till get to a neighbors that are touching a bomb ("Number Cell"s)
#### 1-8 :    "A Number Cell" has 1-8 Bomb Cell neighbors, when it's clicked, it simply shows its number N of bomb neighbors   


### Game Manager (React Component):
Keeper of the current state, but does not contain any logic towards actually modifying the game board.  Currently, this component does handle "game status" logic, ie - what to display when the game is at a certain status (ie 'IN PROGRESS, as well as handling the transitions between game statuses.  Other than this componenet, every other component follows functional programming practices in recognition of best practices, and so appropriately as to avoid state-sillyness bugs

### Game State Builder
Handles all the logic involved with actually building the game state, and updating the game given the sequence of transformations in accordance with the game play.

#### Key Methods:
##### buildStarterGameBoard(rows, columns):
The bombs are not actually placed till after the first click (no one wants to get a bomb on their first try!).  This board is mostly for show, but is important for registering the cell that the user first clicks.
    
##### function buildNewGame(rows, columns, bombs, offLimitsI, offLimitsJ):
This does the real work of building the starting game state. Trying to follow best practice of opting for immutability rather than mutation, a new starter game board is quickly constructed, after which bombs are placed in "random enough", efficiently avoiding the "offLimits" indexes from the user's first click. Then, the Number Cells are calculated and placed.

Just for fun, at this point the console *does* log the answer key, for sneaky purposes and shinanagans.

##### function updateBoardForClickedGameCell(board, row, column)
##### function updateBoardForClickedBomb(board)
##### function updateBoardForClickedEmptyCell(board, row, column)
These are the three means by when the board is updated with each user click.
They each return an object that looks as such:

#### boardData = {
####    board: board    // <arr[arr[Cell Object]]>
####    cellsUpdated:   // <int> represents the number of cells that were revealed during this update. This is used for checking for game end (winning state), as well as error checking in testing
#### }


Notably, updateBoardForClickedEmptyCell() "recursively" (actually, iteratively to avoid building up the call stack) checks the neighbors of the first empty clicked cell to see if they are also 'empty', if so, adds their neighbors to the list of cells to check, and if not empty (ie must be a 'number' cell), just sets them to be displayed and does not add its' neighbors. 

### Game 
You might note at this point the "Game" component, that currently is used to compartimentalize calculation-related tedium for things like gathering a cells neighbors or doing the official check for "what sort of cell" a cell is.  I'm not happy with this name, and re-thinking this component in general is a notable to-do.

## Notable To-Do's
### Snapshot Testing, DOM Testing
I currently provide some simplistic testing for the various algorithms, but admittedly the testing portion is a growth point.  I currently haven't had a chance to learn how to do Snapshot testing or real DOM testing, but it's high on my to-do list.

### "Game" Component
As mentioned earlier, I don't think this is a good name for this component, but I currently am blanking on a better one. Additionally, I'm not really happy with how it is currently accessed across the application and I think it likely needs to be re-thought as a sort of Game-Cell component.

### Place a "Flag" Functionality
It's useful when playing Minesweeper to be able to place a 'flag' over a cell that you know has a bomb.   

## Author
Kate Greenwood
