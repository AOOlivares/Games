export const HIT = '1';
export const EMPTY = '0';
export const END_OF_HIT = HIT + EMPTY;
export const MATRIX = [
    [HIT, EMPTY, HIT],
    [HIT, EMPTY, EMPTY]
];
export const CLICKTYPES = {
    Hit: 'hit',
    Cross: 'X',
    Unknown: '?',
    Clear: 'clear'
}