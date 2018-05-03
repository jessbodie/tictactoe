import * as base from './base';
import { elements } from './base';

export const setup = (num) => {
    var spaceMarkup;
    for (let x= 0; x < num; x++) {

        for (let y= 0; y < num; y++) {
            spaceMarkup = `
                <div class="board__space">
                    <input type="text" maxlength="1" id="col${y}row${x}">
                </div>
            `;
            elements.board.insertAdjacentHTML('beforeend', spaceMarkup);
        }
    }
    return true;
};

export const showXSpace = (col, row) => {
    document.getElementById(`col${col}row${row}`).value = 'x';
    console.log('col: ', col, 'row: ', row);
};