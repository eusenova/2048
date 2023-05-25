import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tile from "./components/Tile/Tile";
import './App.css';
import Modal from "./components/UI/Modal";
import { resetGame } from "./store/actions/gameActions";

const App  = () => {
  const game = useSelector(state => state.game.matrix);
  const isWinning = useSelector(state => state.game.isWinning);
  const dispatch = useDispatch();
  const board = [...game[0],...game[1],...game[2],...game[3]];


  
  return (<>
    <Modal show={isWinning}/>
    <button className="reset-button button" type="button" onClick={()=> dispatch(resetGame())}>reset game</button>
    <div className="App">
      {board.map((item, i)=>(<Tile key={i} num={item}/>))}
    </div>
  </>
      
  );
};

export default App;
