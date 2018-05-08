console.log('Let\'s play Tic Tac Toe!');
import Tictactoe from './models/Tictactoe';
import * as tictactoeView from './views/tictactoeView';
import * as base from './views/base';
import './scss/main.scss';


const state = {};

const controlPlay = async () => {

    state.tictactoe = new Tictactoe();

    // Get user's "o" input
    const getInput = (el) => {
        if (el.value === 'o' || el.value === 'O' || el.value === '0') {
            let userVal = 'o';
            prevOverwrite(el);
            return [el.id, userVal];
        }
    };

    // Check state for winners in any direction
    const isWinner = (val) => { 
        let statusVal = state.tictactoe.getStatus(val);
        // If any in status are 3, return true, else return false
        for (let [direction, total] of statusVal) {
            if (total === 3) {
                // TODO Show Winning UI
                console.log(`WINNER: ${val}: ${direction}, ${total}`);
                return true;
            }
        }
        return false;
    }

    // Computer outputs an "X" in a random empty space
    const computerTurn = () => {
        // Timer for improved UX
        setTimeout(() => {
            // fillspace() returns promise, .then gets value 
            state.tictactoe.fillSpace('x').then();

            // Display - Location for new "X"
            let newXrow = state.tictactoe.newX[0];
            let newXcol = state.tictactoe.newX[1];
            tictactoeView.showXSpace(newXcol, newXrow);

            let el = document.getElementById(`col${newXcol}row${newXrow}`);
            prevOverwrite(el);

            // Check if winner 
            if (isWinner('x')) {
                return;
            }

            return (state.tictactoe.game);
        }, 1000);
    };

    // Prevent changes to already existing entries (prevent cheating)
    const prevOverwrite = (el) => {
        let keepVal = el.value;
        el.removeEventListener('input', (e) => newSpace(e));
        el.addEventListener('input', (e) => {
            el.value = keepVal;
            el.setAttribute('readonly', true);
            // TODO UI
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
            // Get user's input and the space they input to
            const newSpaceInput = getInput(e.target);
            newCol = newSpaceInput[0].slice(3, 4);
            newRow = newSpaceInput[0].slice(7, 8);
            newVal = newSpaceInput[1];
            state.tictactoe.fillSpace(newVal, newCol, newRow).then(); 
            // Check if winner 
            if (isWinner(newVal)) {
                return;
            }
        }
        computerTurn();
    }

    // Draw grid and reset data grid
    const newGame = () => {
        return new Promise ((resolve, reject) => {
                tictactoeView.setup(base.axes);
                resolve(state.tictactoe.setup());
        });
    }

    try {
        // Return promises of updated data set 
        state.tictactoe.game = await newGame(); 

        // Add listeners to handle user input
        var inputsDivArr = document.querySelectorAll('.board__space');
        for  (let i = 0; i < inputsDivArr.length; i++) {
            inputsDivArr[i].children[0].addEventListener('input', (e) => newSpace(e));
        }

        // Populate with first "X"
        computerTurn(); 

    } catch (err) {
        console.log(err);
    }

    return;
}

window.addEventListener('load', controlPlay);




// 2.0 IDEAS
// "AI" So computer makes smart decisions if it has 2 in a row
// ComputerTurn takes 2nd turn, depending on winner
// Track consecutive wins by user
// Presumed data model (potentially add more rows/cols)
// 0,0  1,0  2,0  3,0
// 0,1  1,1  2,1  3,1
// 0,2  1,2  2,2  3,2
// 0,3  1,3  2,2  3,3
