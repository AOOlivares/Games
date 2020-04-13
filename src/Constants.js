export const HIT = '1';
export const EMPTY = '0';
export const END_OF_HIT = HIT + EMPTY;
export const MATRIX = [
    [HIT, HIT, HIT],
    [HIT, EMPTY, HIT],
    [EMPTY, HIT, HIT]
];
export const BOARD_CELLS = [].concat(...Object.freeze(MATRIX));