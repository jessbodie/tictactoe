console.log('Index.js started');
import Tictactoe from './models/Tictactoe';
import * as tictactoeView from './views/tictactoeView';
import * as base from './views/base';


const state = {};

// TODO ASYNC AWAIT
const controlPlay = async () => {

    state.tictactoe = new Tictactoe();
    // const allSpaces = state.tictactoe;

    try {
        tictactoeView.setup(base.axes);
        state.tictactoe.setup();
        console.log(state.tictactoe);
        state.tictactoe.fillSpace('o', 1, 1);
        console.log(state.tictactoe);
        // await state.tictactoe.fillSpace('x');
        // state.tictactoe.fillSpace('o', 2, 1);
        // state.tictactoe.fillSpace('x');
        // // state.tictactoe.fillSpace('o', 0, 1);
        // state.tictactoe.fillSpace('o');
        // state.tictactoe.fillSpace('x');
        // state.tictactoe.fillSpace('o');
    
    } catch (err) {
        console.log(err);
    }

    return;

}

window.addEventListener('load', controlPlay);

// Generate view

// Get user input


// Display congrats/sorry UI

// Play again



// 0,0  1,0  2,0  3,0
// 0,1  1,1  2,1  3,1
// 0,2  1,2  2,2  3,2
// 0,3  1,3  2,2  3,3
