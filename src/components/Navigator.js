import React from 'react';
import { useSelector } from 'react-redux';
import Completed from './Completed';
import Menu from './Menu';
import { selectCompleted } from '../features/validationSlice';

export default function Navigator({ setClickType }) {
    const isValid = useSelector(selectCompleted);

    const child = isValid
        ? <Completed />
        : <Menu setClickType={setClickType} />
    return (
        <>
            {child}
        </>
    )
}