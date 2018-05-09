import * as base from './base';
import { elements } from './base';

export const setup = (num) => {
    var spaceMarkup;
    // Draw the grid/board
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

// Show value in specified space
export const showSpace = (col, row, spaceVal) => {
    document.getElementById(`col${col}row${row}`).value = spaceVal;
    if (spaceVal === 'x') {
        document.getElementById(`col${col}row${row}`).className='board__space--anim';
    }
};

// Show Game Over/Winner message
export const displayMess = (text, btnText) => {
    btnText = btnText || 'Play Again';
    var messageMarkup; 
    messageMarkup = `
        <div class="message message--anim" id="message">
            <div class="message__text" id="message__text">
            ${text}
            </div>
            <div class="message__close" id="message__close"></div>
            <div class="message__play" id="message__play">${btnText}</div>
        </div>
       `;
    elements.content.insertAdjacentHTML('afterend', messageMarkup);

    return true;
};

