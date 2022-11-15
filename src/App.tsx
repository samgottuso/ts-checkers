import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import red_piece from './red_check.png'
import white_piece from './white_check.png'

enum Colors {
  Red,
  Black,
  White
}

interface CheckersPiece {
  color: Colors
  kinged: boolean

}

interface BoardRow {
  row_number: Number
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

function createRow(start_black:boolean, row_number: number): BoardRow{
  let row: BoardRow = {'spaces': [], 'row_number': row_number}
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
      let starting_row = createRow(start_black, i);
    if (occupied_rows.indexOf(i) >= 0 && i <= 3){
      // red half of board
      new_board['rows'][i] = fillRow(start_occupied, Colors.Red, starting_row) 
      start_occupied = !start_occupied
    }
     else if (occupied_rows.indexOf(i) >= 0 && i > 4){
      // white half of board
      new_board['rows'][i] = fillRow(start_occupied, Colors.White, starting_row)
      start_occupied = !start_occupied

    } else{
      new_board['rows'][i] = starting_row

    }
    start_black = !start_black
  }

  return new_board
}

function renderFECell(space: BoardSpace): JSX.Element {
  let space_color: string
  let piece: string
  if (space.color === 0){
    space_color = "checker-cell-red"
  }
  else if (space.color === 1){
    space_color = "checker-cell-black"
  }
  else{
    return <td></td>
  }
  if (space.occupied){
    if (space.piece != undefined && space.piece.color == 0){
      piece = red_piece
    }else{
      piece = white_piece
    }
  } else{
    piece = ""
  }
  let fe_space= <td className={space_color}> <img src={piece} alt="" /> </td>
  return fe_space
}

function renderFERow(index: string, row: BoardRow): JSX.Element {
  return(
      <tr key={index}> 
      {row.spaces.map((renderFECell))} 
      </tr>

  )
}

function renderFEBoard(board: CheckersBoard): JSX.Element {
  return (
    <tbody key='boardbody'>
      {board.rows.map(row => renderFERow(row.row_number.toString(), row))}
    </tbody>
    )
}

let empty_board: CheckersBoard = {'rows': []}

let full_board: CheckersBoard = createBoard(empty_board)


function App() {
  return (
    <div className="App">
      <header>
        <h2> Welcome to Typescript Checkers!</h2>
      </header>
      <div className='Board'>
        <table>
          {renderFEBoard(full_board)}
        </table>
      </div>
    </div>
  );
}

export default App;
