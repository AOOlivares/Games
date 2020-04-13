import React from 'react';
import { EMPTY, HIT } from './Constants';

const headersWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "3px",
    height: "100%",
    boxSizing: "border-box",
}

const subHeaderWrapperStyle = {
    display: "grid",
    gridGap: "3px",
    height: "100%",
    boxSizing: "border-box",
}

const subRowHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const getAllIndexes = (arr, val) => {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const isUserSolutionPotentiallyValid = (userInput, posibilities) => {
    const userSolutionJoined = userInput.join('');
    const userSolutionJoinedString = userSolutionJoined.toString()
    const bitUser = parseInt(userSolutionJoinedString, 2);
    const userHitIndexs = getAllIndexes(userSolutionJoinedString, HIT);

    return posibilities.some(posibility => {
        const bitPos = parseInt(posibility, 2);
        const or = bitPos | bitUser;
        const xor = or ^ bitPos;
        let xorStringAgain = xor.toString(2);
        while (posibility.length > xorStringAgain.length) {
            xorStringAgain = EMPTY + xorStringAgain;
        }

        return userHitIndexs.every(x => xorStringAgain[x] === EMPTY);
    });
}

const Header = ({ backgroundColor, value, }) => <div style={{ ...subRowHeaderStyle, backgroundColor: backgroundColor }}>{value}</div>

const Headers = ({ values, userSolution, possibleSolutions, flow }) => {
    const areTheSameStyle = isUserSolutionPotentiallyValid(userSolution, possibleSolutions);
    const backgroundColor = areTheSameStyle ? "#79d279" : "#ff6363";
    return (
        <div style={{ ...subHeaderWrapperStyle, ...flow }}>
            {values.map((value, index) => (
                <Header key={index} backgroundColor={backgroundColor} value={value} />
            ))}
        </div>
    )
}

const Panels = ({ headerValues, userSolution, potentialSolutions, gridTemplate, flow }) => (
    <div style={{ ...headersWrapperStyle, ...gridTemplate }}>
        {headerValues.map((values, index) => (
            <Headers
                flow={flow}
                key={index}
                values={values}
                userSolution={userSolution[index]}
                possibleSolutions={potentialSolutions[index]}
            />
        ))}
    </div>
)

export default function HeaderPanels({ flow, headerValues, gridTemplate, userSolution, potentialSolutions }) {
    return (
        <Panels
            flow={flow}
            headerValues={headerValues}
            gridTemplate={gridTemplate}
            userSolution={userSolution}
            potentialSolutions={potentialSolutions}
        />
    )
}