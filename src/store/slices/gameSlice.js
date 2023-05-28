import {createSlice, current} from "@reduxjs/toolkit";
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
const filterZeros = arr => {
    return arr.filter(i => i!==0);
};
const has2048 = row => {
    for (let i = 0; i < row.length; i++) {
            if(row[i]===8){
                return true;
            }
    }
    return false
};
const slide = (row,state) => {
    row = filterZeros(row);
    for (let i = 0; i < row.length-1; i++) {
        if(row[i]===row[i+1]){
            row[i]*=2;
            row[i+1]=0;
        }
    }
    if(has2048(row)){
        state.isWinning=true;
    }
    row = filterZeros(row);
    while (row.length<columns) {
        row.push(0);
    }
    return row;
};
const hasEmpty = state =>{
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if(state.matrix[r][c]===0){
                return true;
            }
        }
    }
    return false;
};
const setRandomNum = (state) =>{
    if (!hasEmpty(state)){
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
                setRandomNum(state);
                setRandomNum(state);
                state.isWinning = false;
                state.isLosing = false;

        },
        slideUp(state){
            if(!hasEmpty(state)){
                state.isLosing=true;
                state.isWinning=true;
            }
        
            let arr1 = current(state.matrix);
            for (let c = 0; c < columns; c++) {
                let row = [state.matrix[0][c],state.matrix[1][c],state.matrix[2][c],state.matrix[3][c]];
                row = slide(row,state);
                state.matrix[0][c] = row[0];
                state.matrix[1][c] = row[1];
                state.matrix[2][c] = row[2];
                state.matrix[3][c] = row[3];
            }
            const arr2 = current(state.matrix);
            let counter = 0;
            for (let i = 0; i < columns; i++) {
                if(arr1[i].toString()===arr2[i].toString()){
                    counter++;
                }
            }
            if (counter!==4) {
            setRandomNum(state); 
            }
        },
        slideDown(state){
            if(!hasEmpty(state)){
                state.isLosing=true;
                state.isWinning=true;
            }
            let arr1 = current(state.matrix);
            for (let c = 0; c < columns; c++) {
                let row = [state.matrix[0][c],state.matrix[1][c],state.matrix[2][c],state.matrix[3][c]];
                row.reverse();
                row = slide(row,state);
                row.reverse();
                state.matrix[0][c] = row[0];
                state.matrix[1][c] = row[1];
                state.matrix[2][c] = row[2];
                state.matrix[3][c] = row[3];
            }
            const arr2 = current(state.matrix);
            let counter = 0;
            for (let i = 0; i < columns; i++) {
                if(arr1[i].toString()===arr2[i].toString()){
                    counter++;
                }
            }
            if (counter!==4) {
            setRandomNum(state); 
            }
        },
    }
});

export const {
    clearGame,
    slideUp,
    slideDown
} = gameSlice.actions;

export default gameSlice;