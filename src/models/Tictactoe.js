import * as base from '../views/base';

export default class Tictactoe {
    constructor() {
            this.game = [[]];
            this.game.length = base.axes;
    }

    setup() {
        // Set empty tic-tac-toe board

        return new Promise (resolve => {
            for (var i = 0; i < base.axes; i++) {
                this.game[i] = ['', '', ''];
            }

            resolve(this.game);
        });
    }


    isWinner(val) {
       
        let winCountDiagNeg = 0;
        let winCountDiagPos = 0;

        for (let x = 0; x < this.game[0].length; x++) {
            let winCountY = 0;
            let winCountX = 0;

            for (let y = 0; y < this.game[x].length; y++) {
                if (this.game[x][y] === val) {
                    winCountY++;
                    // Check for across winner
                    if (winCountY === 3) {
                        console.log(`${val} is the WINNER ACROSS!`);
                        return; 
                    } else if (x === y) {
                    // Check for diagonol with negative slope winner
                        winCountDiagNeg++;
                        // console.log(' 1st: ', y, ' 2nd: ', x, ' val: ', val);
                        if (winCountDiagNeg === 3) {
                            console.log(`${val} is the WINNER DIAGONOL NEGATIVE!`);
                            return;
                        }
                    }
                }    
                if (this.game[y][x] === val) {
                // Check for down winner
                    winCountX++;
                    if (winCountX === 3) {
                        console.log(`${val} is the WINNER DOWN!`);
                        return;
                    }    
                } 
                // TO DO
                // Check for positive-slope diagonol
                // else if (x === y + (this.game[x].length -1) ||  x === y - (this.game[x].length -1)) {
                //     winCountDiagPos++;
                //     console.log('x: ', x, 'y: ', y, 'wincount: ', winCountDiagPos);
                //     if (winCountDiagPos === 3) {
                //         console.log(`${val} is the WINNER DIAGONOL POSITIVE!`);
                //         return;
                //     }
                // }    
            }
        }    
    }

    fillSpace(val, col, row) {
        // If no row or col specified, place in random
        if (row === undefined) {
            row = Math.floor(Math.random() * Math.floor(this.game.length));
        }
        if (col === undefined) {
            col = Math.floor(Math.random() * this.game[row].length);
        }
 
        // If empty space, populate with "X" or "O"
        if (this.game[row][col] == '')  {
            this.game[row][col] = val;
        } else if (this.game[row][col] === 'x' || this.game[row][col] === 'o'){
            console.log('Hey tricky, no changing your entries. Let\'s play again.');
            // TODO
            this.setup();
        }

        this.isWinner(val);

        return [col, row];
        // return new Promise (resolve => {
        //     resolve(this.game);
        // });
    }

}   

