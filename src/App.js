import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tile from "./components/Tile/Tile";
import './App.css';
import Modal from "./components/UI/Modal";
import { slideUp, clearGame, slideDown, check, slideLeft, slideRight } from "./store/slices/gameSlice";

const App  = () => {
  const game = useSelector(state => state.game.matrix);
  const isWinning = useSelector(state => state.game.isWinning);
  const dispatch = useDispatch();
  const board = [...game[0],...game[1],...game[2],...game[3]];
  
  useEffect(() => {
    dispatch(check());
  },[dispatch]);
  
  useEffect(() => {
    const keyHandler = e =>{
      switch (e.key) {
        case 'ArrowUp':
          dispatch(slideUp());
          break;
        case 'ArrowDown':
          dispatch(slideDown());
          break;
        case 'ArrowLeft':
          dispatch(slideLeft());
          break;
        case 'ArrowRight':
          dispatch(slideRight());
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [dispatch]);
  
  return (<>
    <Modal show={isWinning} closed={()=> dispatch(clearGame())}/>
    <button className="reset-button button" type="button" onClick={()=> dispatch(clearGame())}>reset game</button>
    <div className="App">
      {board.map((item, i)=>(<Tile key={i} num={item}/>))}
    </div>
  </>
      
  );
};

export default App;
