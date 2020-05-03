import React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { newPuzzle } from '../features/gameSlice';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const NewGame = ({ completed }) => {
    const dispatch = useDispatch();
    const onClick = (e) => {
        e.preventDefault();
        dispatch(newPuzzle(e.currentTarget.id));
    }

    return (
        <div>
            <Modal
                isOpen={completed}
                style={customStyles}
                contentLabel="New Game label?"
            >
                <button id="easy" onClick={onClick}>Easy</button>
                <button id="medium" onClick={onClick}>Medium</button>
                <button id="hard" onClick={onClick}>Hard</button>
            </Modal>
        </div>
    );
}

export default NewGame;