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
            // If there is a winner, show winner/loser message
            if (total === 3) {
                if (val === 'x') {
                    tictactoeView.displayMess(base.msgs.loserText);
                } else if (val === 'o') {
                    tictactoeView.displayMess(base.msgs.winnerText);
                }
                // console.log(`WINNER: ${val}: ${direction}, ${total}`);
           
                return true;
            }
        }
        // If no winner, but board is full
        if (state.tictactoe.getNumPlays() === 9) {
            tictactoeView.displayMess(base.msgs.drawText);
            return true;
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
            tictactoeView.showSpace(newXcol, newXrow, 'x');

            let el = document.getElementById(`col${newXcol}row${newXrow}`);
            prevOverwrite(el);

            // Check if winner 
            if (isWinner('x')) {
                return;
            }

            return (state.tictactoe.game);
        }, 250);
    };

    // Prevent changes to already existing entries (prevent cheating)
    const prevOverwrite = (el) => {
        let keepVal = el.value;
        el.removeEventListener('input', (e) => newSpace(e));
        el.addEventListener('input', (e) => {
            el.value = keepVal;
            el.setAttribute('readonly', true);
            // TODO UI
            console.log('Hey tricky... what are you up to? Please enter an "O" in an empty space for your turn.');
            console.log(base.msgs.cheaterText);
            tictactoeView.displayMess(base.msgs.cheaterText, 'OK');
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

    const addSpaceListeners = () => {
        // Add listeners to handle user input
        var inputsDivArr = document.querySelectorAll('.board__space');
        for  (let i = 0; i < inputsDivArr.length; i++) {
            inputsDivArr[i].children[0].addEventListener('input', (e) => newSpace(e));
        };
    }

    // Draw grid and reset data grid
    const newGame = () => {
        return new Promise ((resolve, reject) => {
                tictactoeView.setup(base.axes);
                resolve(state.tictactoe.setup());
        });
    }

    // Remove Message, clear data, clear UI
    const resetGame = async () => {
        // Remove message
        document.getElementById('message').remove();
        // Clear Status data to track next winner
        state.tictactoe.resetStatus();

        // Clear UI
        while(document.querySelector('.board__space')) {
            document.querySelector('.board__space').remove();
        }

        // Reset data and UI of game
        state.tictactoe.game = await newGame(); 
        addSpaceListeners();
        return new Promise ((resolve, reject) => {
            resolve(state.tictactoe.game);
        });
    }

    try {
        // Return promises of updated data set 
        state.tictactoe.game = await newGame(); 

        // Listeners to handle user input
        addSpaceListeners();

        // Listeners for Win/Lose Message Box
        document.getElementById('cont').addEventListener('click', async (e) => {
            if (e.target.id === 'message__play' || 
                e.target.id === 'message__close') {
                    state.tictactoe.game = await resetGame();
                    // Populate with first "X"
                    computerTurn(); 
            }
        });       

        // Populate with first "X"
        computerTurn(); 

    } catch (err) {
        console.log(err);
    }

    return;
}


window.addEventListener('load', controlPlay);

// TODO 1.0
// WHERE CURSOR IS SHOULD HAVE HOVER EFFECT
// WINNING SPACES SHOULD HAVE WINNER UI EFFECT
// PUT ON HEROKU
// FAVICON

// 2.0 IDEAS
// "AI" So computer makes smart decisions if it has 2 in a row
// ComputerTurn takes 2nd turn, depending on winner
// Track consecutive wins by user
// Presumed data model (potentially add more rows/cols)
// 0,0  1,0  2,0  3,0
// 0,1  1,1  2,1  3,1
// 0,2  1,2  2,2  3,2
// 0,3  1,3  2,2  3,3
    