import React from "react";
import './Tile.css';

const Tile = ({num}) => {
    return (<div className={num?'x'+num:'x'}>{num?num:null}</div>);
};

export default Tile;