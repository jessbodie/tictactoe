console.log('Let\'s play Tic Tac Toe!');
import Tictactoe from './models/Tictactoe';
import * as tictactoeView from './views/tictactoeView';
import * as base from './views/base';
import './scss/main.scss';
require.context('./favicon', false, /^\.\//);

const state = {};

const controlPlay = async () => {

    state.tictactoe = new Tictactoe();

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
        el.removeEventListener('click', newSpace);
        el.removeEventListener('focus', tictactoeView.makeSpaceWhite); 
        el.removeEventListener('mouseover', tictactoeView.makeSpaceWhite); 
        el.addEventListener('focus', () => {
            el.blur();
        });
        el.addEventListener('input', () => {
            el.value = keepVal;
            el.setAttribute('readonly', true);
            tictactoeView.displayMess(base.msgs.cheaterText, 'OK');
        });
    }


    // Get, store, and show new space 
    const newSpace = (e) => {
        // For IE compatibility
        // e = e || window.event;
        // e.target = e.target || e.srcElement;
        e.target.blur();
        let newRow = '';
        let newCol = '';
        let newVal = '';
        if (e) {
            // Get user's space and update board data and UI
            newCol = e.target.id.slice(3, 4);
            newRow = e.target.id.slice(7, 8);
            newVal = 'o';
            state.tictactoe.fillSpace(newVal, newCol, newRow).then();
            tictactoeView.showSpace(newCol, newRow, newVal);
             
            // Call error handling, UI for filled in spaces
            prevOverwrite(e.target);
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
            inputsDivArr[i].children[0].addEventListener('click', newSpace);

            // UI Listeners
            inputsDivArr[i].children[0].addEventListener('focus', tictactoeView.makeSpaceWhite); 
            inputsDivArr[i].children[0].addEventListener('mouseover', tictactoeView.makeSpaceWhite); 
            inputsDivArr[i].children[0].addEventListener('blur', () => {
                inputsDivArr[i].children[0].parentNode.classList.remove('board__space--white');
            }); 
            inputsDivArr[i].children[0].addEventListener('mouseleave', () => {
                inputsDivArr[i].children[0].parentNode.classList.remove('board__space--white');
            }); 
        }
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
// WINNING SPACES SHOULD HAVE WINNER UI EFFECT

// 2.0 IDEAS
// "AI" So computer makes smart decisions if it has 2 in a row
// ComputerTurn takes 2nd turn, depending on winner
// Track consecutive wins by user
// Add more rows/cols:
// 0,0  1,0  2,0  3,0
// 0,1  1,1  2,1  3,1
// 0,2  1,2  2,2  3,2
// 0,3  1,3  2,2  3,3
    