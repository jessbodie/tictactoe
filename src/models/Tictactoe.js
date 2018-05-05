import * as base from '../views/base';

export default class Tictactoe {
    constructor() {
            this.game = [[]];
            this.newX = [];
            this.game.length = base.axes;
            this.status = {
                x: [
                    ['across', 0],
                    ['down', 0],
                    ['diagNeg', 0],
                    ['diagPos', 0]
                ], 
                o: [
                    ['across', 0],
                    ['down', 0],
                    ['diagNeg', 0],
                    ['diagPos', 0]
                ] 
            }    
        }

    setup() {
        // Set empty tic-tac-toe board
        return new Promise ((resolve, reject) => {
            for (var i = 0; i < base.axes; i++) {
                this.game[i] = ['', '', ''];
            }

            resolve(this.game);
        });
    }

    updateStatus(val) {
        console.log('update status');
        for (let r = 0; r < this.game[0].length; r++) {
            // Reset across winner count
            this.status[val][0][1] = 0;
            for (let c = 0; c < this.game[r].length; c++) {
                if (this.game[r][c] === val) {
                    this.status[val][0][1]++;
                    console.log(this.status[val][0][1]);
                    // Check for across winner
                    // if (winCountY === 3) {
                    //     console.log(`${val} is the WINNER ACROSS!`);
                    //     return; 
                //     } else if (x === y) {
                //     // Check for diagonol with negative slope winner
                //         winCountDiagNeg++;
                //         // console.log(' 1st: ', y, ' 2nd: ', x, ' val: ', val);
                //         if (winCountDiagNeg === 3) {
                //             console.log(`${val} is the WINNER DIAGONOL NEGATIVE!`);
                //             return;
                //         }
                    // }
                }    
                // if (this.game[y][x] === val) {
                // // Check for down winner
                //     winCountX++;
                //     if (winCountX === 3) {
                //         console.log(`${val} is the WINNER DOWN!`);
                //         return;
                //     }    
                // } 
            }    
        }        
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
        // If no row or col specified, assign a random
        if (row === undefined) {
            row = Math.floor(Math.random() * Math.floor(this.game.length));
        }
        if (col === undefined) {
            col = Math.floor(Math.random() * this.game[row].length);
        }
 
        console.log(`FILLSPACE FN: Row: ${row} Col: ${col} Val: ${val}`);
        console.log('FILLSPACE FN: ', this.game);
        if (this.game[row][col] === '') {
            this.game[row][col] = val;
            this.newX = [row, col];
            return this.game;
        } else {
            console.log(`Row: ${row} Col: ${col} space taken, redoing`);
            this.game = this.fillSpace(val);
        }

        // this.updateStatus(val);
        // this.isWinner(val);

        // return new Promise (resolve => {
        //     resolve(this.game);
        // });
    }
}   

