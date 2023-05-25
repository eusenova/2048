import { clearGame, setRandomNum } from "../slices/gameSlice";

export const resetGame = () => {
    return async(dispatch) =>{
        await dispatch(clearGame());
        await dispatch(setRandomNum());
        dispatch(setRandomNum());
    }
}