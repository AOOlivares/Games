import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CLICKTYPES } from '../utils/Constants';
import { setClickType } from '../features/userSlice';

const style = {
    wrapper: {
        gridColumn: "1",
        gridRow: "1",
        boxSizing: "border-box",
    },
    menu: {
        display: "grid",
        gridGap: "3px",
        height: "100%",
        gridTemplateRows: `repeat(auto, auto)`,
    },
    item: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        fontWeight: 'bold',
        backgroundColor: "#75daad",
        lineHeight: '10px'
    }
}

export default function Menu() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(CLICKTYPES.Hit)
    function onClick(e) {
        dispatch(setClickType(e.currentTarget.id));
        setSelected(e.currentTarget.id);
    }
    return (
        <div style={style.wrapper}>
            <div style={style.menu}>
                <div id={CLICKTYPES.Hit} onClick={onClick} style={{ ...style.item, backgroundColor: selected === CLICKTYPES.Hit ? "#1eb2a6" : "#75daad" }}></div>
                <div id={CLICKTYPES.Cross} onClick={onClick} style={{ ...style.item, backgroundColor: selected === CLICKTYPES.Cross ? "#1eb2a6" : "#75daad" }}>X</div>
                <div id={CLICKTYPES.Unknown} onClick={onClick} style={{ ...style.item, backgroundColor: selected === CLICKTYPES.Unknown ? "#1eb2a6" : "#75daad" }}>?</div>
            </div>
        </div>
    )
}