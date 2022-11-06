import React from 'react';
import logo from './logo.svg';
import './App.css';

enum Colors {
  Red,
  Black
}

interface CheckersPiece {
  color: Colors
  kinged: boolean

}

interface BoardRow {
  spaces: Array<BoardSpace>
}

interface BoardSpace {
  color: Colors
  occupied: boolean
  piece?: CheckersPiece

}

const emptyBlackSpace: BoardSpace = {color: Colors.Black, occupied: false}

const emptyRedSpace: BoardSpace = {color: Colors.Red, occupied: false}

interface CheckersBoard {
  rows:  Array<BoardRow>
} 

function createRow(start_black:boolean): BoardRow{
  let row: BoardRow = {'spaces': []}
  for(let j=0; j<=7; j++){
      if (start_black === true) {
        row['spaces'][j] = emptyBlackSpace
      }
      else if (start_black === false) {
        row['spaces'][j] = emptyRedSpace
      }
    start_black = !start_black
  }
  return row
}


function fillRow(occupied:boolean, color: Colors, row: BoardRow): BoardRow{
  // what the fuck was happening here?
  // let new_row = row
  let new_row = structuredClone(row)
  for(let k=0; k<=7; k++){
    if(occupied === true){
      let new_piece: CheckersPiece = {'color': color, kinged: false}
      new_row['spaces'][k].occupied = true
      new_row['spaces'][k].piece = new_piece
    }
    occupied = !occupied
  }
  return new_row
}

function createBoard(new_board: CheckersBoard): CheckersBoard{
  let occupied_rows: number[] = [0, 1, 2, 5, 6, 7]
  let start_black = true;
  let start_occupied = true;
  for (let i= 0; i < 8; i++) {
      let starting_row = createRow(start_black);
    if (occupied_rows.indexOf(i) >= 0 && i <= 3){
      // red half of board
      new_board['rows'][i] = fillRow(start_occupied, Colors.Red, starting_row) 
      start_occupied = !start_occupied
    }
     else if (occupied_rows.indexOf(i) >= 0 && i > 4){
      // black half of board
      new_board['rows'][i] = fillRow(start_occupied, Colors.Black, starting_row)
      start_occupied = !start_occupied

    } else{
      new_board['rows'][i] = starting_row

    }
    start_black = !start_black
  }

  return new_board
}
  
let empty_board: CheckersBoard = {'rows': []}

let full_board: CheckersBoard = createBoard(empty_board)


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          I made this variable: {new_var}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
