import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { StartButton, renderFEBoard } from "./web_components"
import { start } from 'repl';


enum Colors { 
  Red,
  Black,
  White,
  Orange
}

interface CheckersPiece {
  color: Colors
  kinged: boolean

}

export interface BoardRow {
  row_number: number
  spaces: Array<BoardSpace>
}

export interface BoardSpace {
  color: Colors
  occupied: boolean
  piece?: CheckersPiece
  row_number: number
  space_number: number

}

export interface CheckersBoard {
  rows:  Array<BoardRow>
} 

function createRow(start_black:boolean, row_number: number): BoardRow{
  let row: BoardRow = {'spaces': [], 'row_number': row_number}
  for(let j=0; j<=7; j++){
      if (start_black === true) {
        let new_space: BoardSpace = {color: Colors.Black, occupied: false, row_number: row_number, space_number: j}
        row['spaces'][j] = new_space
      }
      else if (start_black === false) {
        let new_space: BoardSpace = {color: Colors.Red, occupied: false, row_number: row_number, space_number: j}
        row['spaces'][j] = new_space
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

let empty_board: CheckersBoard = {'rows': []}

let full_board: CheckersBoard = createBoard(empty_board)

export type GameProps = {
  started: boolean;
  active_player: string;
  backend_board: CheckersBoard
}

let active_props: GameProps = {started: false, active_player:'', backend_board: full_board}

export type FullBoardProps = {
  active_board: CheckersBoard
  refresh: boolean
}

export function highlightValidMoves(board: CheckersBoard, active_space: BoardSpace): CheckersBoard{
  let new_board: CheckersBoard = structuredClone(board)
  let valid_rows: Array<number> = [active_space.row_number + 1, active_space.row_number -1]
  let valid_spaces: Array<number> = [active_space.space_number + 1, active_space.space_number - 1]
  for(let r=0; r<2; r++){
    let valid_row: number = valid_rows[r]
    if(valid_row > 7 || valid_row < 0){
      return new_board
    }
    for(let s=0; s<2; s++){
      if(valid_spaces[s] > 7 || valid_spaces[s] < 0){
        continue;
      }
      let potential_valid: BoardSpace = new_board.rows[valid_row].spaces[valid_spaces[s]]
      if (potential_valid.occupied !== undefined && potential_valid.occupied === false){
        potential_valid.color = Colors.Orange
        console.log('Valid spot!')
        console.log(potential_valid.row_number, potential_valid.space_number)
      }
    }
  }
  return new_board
}


let starting_props: FullBoardProps = {'active_board': full_board, 'refresh': true}


function App() {
  return (
    <div className="App">
      <header>
        <h2> Welcome to Typescript Checkers!</h2>
      </header>
      <div className='PlayersTurn'>
        { StartButton(active_props) }
      </div>
      <div className='Board'>
        <table>
          { renderFEBoard(starting_props.active_board) }
        </table>
      </div>
    </div>
  );
}

export default App;
