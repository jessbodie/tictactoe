console.log('Index.js started');
import Tictactoe from './models/Tictactoe';
import * as tictactoeView from './views/tictactoeView';
import * as base from './views/base';
import './scss/main.scss';


const state = {};

const controlPlay = async () => {

    state.tictactoe = new Tictactoe();
    // const allSpaces = state.tictactoe;

    // Get user's "O" input
    const getInput = (el) => {
        if (el.value === "o" || el.value === "O" || el.value === "0") {
            prevOverwrite(el);
            return [el.id, el.value];
        }
    };

    // Computer outputs an "X" in a random empty space
    const computerTurn = () => {
        const newX = state.tictactoe.fillSpace('x');
        tictactoeView.showXSpace(newX[0], newX[1]);
        let el = document.getElementById(`col${newX[0]}row${newX[1]}`);
        prevOverwrite(el);
    };

    // Prevent changes to already existing entries
    const prevOverwrite = (el) => {
        let keepVal = el.value;
        el.removeEventListener('input', (e) => newSpace(e));
        el.addEventListener('input', (e) => {
            el.value = keepVal;
            el.setAttribute(readonly, 'readonly');
            console.log('Hey tricky... what are you up to? Please enter an O in an empty space for your turn.');

        });
    }


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
            if (newSpaceInput[1] === 'o' || 
                newSpaceInput[1] === 'O' || 
                newSpaceInput[1] === '0' ) {
                newVal = newSpaceInput[1];
            }
            state.tictactoe.fillSpace(newVal, newCol, newRow); 
            console.log('state after: ', state.tictactoe.game);
        }
        computerTurn();
    }

    const newGame = () => {
        tictactoeView.setup(base.axes);
        state.tictactoe.setup();
    }

    try {
        newGame();
        // Populate with first "X"
        computerTurn();
        // console.log('state setup: ', state.tictactoe.game);

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
