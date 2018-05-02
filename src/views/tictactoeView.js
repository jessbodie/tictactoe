import * as base from './base';
import { elements } from './base';


export const setup = (num) => {
    var spaceMarkup;
    for (let x= 0; x < num; x++) {

        for (let y= 0; y < num; y++) {
            spaceMarkup = `
                <div class="board__space">
                    <input type="text" id="row${x}col${y}" value="row${x}col${y}">
                </div>
            `;
            elements.board.insertAdjacentHTML('beforeend', spaceMarkup);

        }
    }    
};