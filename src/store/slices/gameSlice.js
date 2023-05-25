import {createSlice} from "@reduxjs/toolkit";
const name = 'game';
const initialState = {
    matrix:[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
],
isWinning:false,
isLosing:false};

const rows = 4;
const columns = 4;
const getRandom = () => {
    return Math.random()>0.5?2:4;
};

const gameSlice = createSlice({
    name,
    initialState,
    reducers: {
        clearGame(state) {
                state.matrix = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
                state.isWinning = false;
                state.isLosing = false;
        },
        setRandomNum(state) {
            const hasEmpty = () =>{
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < columns; c++) {
                        if(state.matrix[r][c]){
                            return true;
                        }
                        
                    }
                }
                return false;
            };
            if (!hasEmpty){
                state.isWinning=true;
                state.isWinning=true;
                return;
            }
            let found = false;
            while(!found){
                let r = Math.floor(Math.random()*rows);
                let c = Math.floor(Math.random()*columns);
                if(state.matrix[r][c]===0){
                    state.matrix[r][c] = getRandom();
                    found = true;
                }
            }
        }
    }
});

export const {
    clearGame,
    setRandomNum,
} = gameSlice.actions;

export default gameSlice;