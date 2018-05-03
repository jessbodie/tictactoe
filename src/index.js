console.log('Index.js started');
import Tictactoe from './models/Tictactoe';
import * as tictactoeView from './views/tictactoeView';
import * as base from './views/base';


const state = {};

// TODO ASYNC AWAIT
const controlPlay = async () => {

    state.tictactoe = new Tictactoe();
    // const allSpaces = state.tictactoe;

    // Get input
    const getInput = (el) => {
        if (el.value === "o" || el.value === "O" || el.value === "0") {
            return [el.id, el.value];
        } else {
            console.log('Your turn! Please enter a O to keep playing.');
        }
    };

    const computerTurn = () => {
        const newX = state.tictactoe.fillSpace('x');
        tictactoeView.showXSpace(newX[0], newX[1]);
    };

    // Get and store new space 
    const newSpace = (e) => {
        // For IE compatibility
        // e = e || window.event;
        // e.target = e.target || e.srcElement;
        let newRow = '';
        let newCol = '';
        let newVal = '';
        if (e) {
            const newSpaceInput = getInput(e.target);
            console.log(newSpaceInput[0]);
            newCol = newSpaceInput[0].slice(3, 4);
            newRow = newSpaceInput[0].slice(7, 8);
            newVal = newSpaceInput[1];
            state.tictactoe.fillSpace(newVal, newCol, newRow); 
            console.log('state after: ', state.tictactoe.game);
        }
        computerTurn();
    }

    try {
        tictactoeView.setup(base.axes);
        state.tictactoe.setup();
        console.log('state setup: ', state.tictactoe.game);
        // Populate with first "X"
        computerTurn();
        console.log('state setup: ', state.tictactoe.game);

        // Add listeners to handle user input
        var inputsDivArr = document.querySelectorAll('.board__space');
        for  (let i = 0; i < inputsDivArr.length; i++) {
            inputsDivArr[i].children[0].addEventListener('input', (e) => newSpace(e));
        }
    } catch (err) {
        console.log(err);
    }


    return;

}

window.addEventListener('load', controlPlay);





// Display congrats/sorry UI

// Play again



// 0,0  1,0  2,0  3,0
// 0,1  1,1  2,1  3,1
// 0,2  1,2  2,2  3,2
// 0,3  1,3  2,2  3,3
