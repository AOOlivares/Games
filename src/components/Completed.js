import React from 'react';
import NewGame from './NewGame';

const style = {
    validationStyle: {
        gridColumn: "1",
        gridRow: "1",
        boxSizing: "border-box",
        backgroundColor: '#ffd31d'
    },
    buttonWrapper: {
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

export default function Completed() {
    return (
        <div style={style.validationStyle} >
            <div style={style.buttonWrapper}  >
                <NewGame completed={true} />
            </div>
        </div>
    )
}