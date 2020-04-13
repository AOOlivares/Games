import React, { useState } from 'react';
import * as Constants from './Constants';

const boardStyle = {
    gridColumn: "2 / 4",
    gridRow: "2 / 4",
    boxSizing: "border-box",
}

const boardWrapperStyle = {
    display: "grid",
    gridGap: "3px",
    height: "100%"
}

const boardItemStyle = {
    boxSizing: "border-box",
    height: "100%"
}

const hitColors = {
    hit: '#75daad',
    empty: '#ffc299'
}

const NonoBox = ({ setHit, index }) => {
    const [color, setColor] = useState(hitColors.empty);
    function handleClick() {
        if (color === hitColors.empty) {
            setHit({ type: 'active', index: index })
            setColor(hitColors.hit);
        } else {
            setHit({ type: 'inactive', index: index })
            setColor(hitColors.empty);
        }
    }

    return <div onClick={handleClick} style={{ ...boardItemStyle, backgroundColor: color }} />;
}

export default function Board({ numberOfRows, numberOfColumns, setHit }) {
    return (
        <div style={boardStyle}>
            <div style={{ ...boardWrapperStyle, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`, gridTemplateRows: `repeat(${numberOfRows}, 1fr)` }}>
                {Constants.BOARD_CELLS.map((cell, index) => <NonoBox setHit={setHit} index={index} key={index} />)}
            </div>
        </div>
    )
}
