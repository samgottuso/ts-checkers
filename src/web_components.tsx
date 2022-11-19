import React, {useState} from 'react';
import { isContext } from 'vm';
import { GameProps, BoardSpace, BoardRow, CheckersBoard, highlightValidMoves, FullBoardProps  } from './App'

import red_piece from './red_check.png'
import white_piece from './white_check.png'


export function StartButton(props: GameProps): JSX.Element{
        const [started, startGame] = useState(props.started)
        if ( started === false ) {
            props.active_player = 'Player 1'
            return (
                <button type="button" onClick={()=> startGame(true)}> "Click here to start the game!" </button>
            )
        }
        return (<h2> {props.active_player}'s turn!</h2>)
}

function refreshBoard(space: BoardSpace, board: CheckersBoard): CheckersBoard {
    let new_board: CheckersBoard = highlightValidMoves(board, space)
    return new_board
}

function renderFECell(space: BoardSpace, board:CheckersBoard): JSX.Element {

    let space_color: string
    let piece: string
    if (space.color === 0){
      space_color = "checker-cell-red"
    }
    else if (space.color === 1){
      space_color = "checker-cell-black"
    }
    else if (space.color === 3){
        space_color = 'checker-cell-orange'
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
    let fe_space= <td className={space_color}> <img src={piece} alt="" onClick={() => refreshBoard(space, board)}/> </td>
    return fe_space
  }
  
function renderFERow(index: string, row: BoardRow, board:CheckersBoard): JSX.Element {
    return(
        <tr key={index}> 
        {row.spaces.map(
            function(space) {
                return(renderFECell(space, board))
            
            }
        )};
        </tr>
  
    )
  }

  
export function renderFEBoard(board: CheckersBoard): JSX.Element {
    return (
      <tbody key='boardbody'>
        {board.rows.map(row => renderFERow(row.row_number.toString(), row, board))}
      </tbody>
      )
  }
