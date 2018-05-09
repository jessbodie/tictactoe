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
            };    
            this.numPlays = 0;
        }

    // Set empty data for tic-tac-toe board
    setup() {
        return new Promise ((resolve, reject) => {
            for (var i = 0; i < base.axes; i++) {
                this.game[i] = ['', '', ''];
            }
            resolve(this.game);
        });
    }

    // Reset status/winnings data
    resetStatus() {
        this.status['x'].forEach((val, key) => {
            val[1] = 0;
        });
        this.status['o'].forEach((val, key) => {
            val[1] = 0;
        });
    }

    // Update how close to winning user and computer is
    updateStatus(val) {
        // Reset diagonol winners
        this.status[val][2][1] = 0;
        this.status[val][3][1] = 0;
        
        // Loop through data to check for ACROSS winners
        for (let r = 0; r < this.game[0].length; r++) {
            let curAcross = 0;
            for (let c = 0; c < this.game[r].length; c++) {
                if (this.game[r][c] === val) {
                    curAcross++;
                    if (curAcross > this.status[val][0][1]) {
                        this.status[val][0][1] = curAcross;
                    }
                } 
                // Check for DIAGONOL (negative slope) winner   
                if (this.game[r][c] === val && r === c) {
                    this.status[val][2][1]++;
                    } 
            }    
        }        
        // Redo loop in column format to check for DOWN winner
        for (let c = 0; c < this.game[0].length; c++) {
            // Reset down winner count
            let curDown = 0;
            for (let r = 0; r < this.game[c].length; r++) {
                // Check for down winner and update win count
                if (this.game[r][c] === val) {
                    curDown++;
                } 
            }
            if (curDown > this.status[val][1][1]) {
                this.status[val][1][1] = curDown;
            }
        }    
        // Check for DIAGONOL (positive slope) winner
        let max = this.game[0].length - 1;
        for (let r = 0; r < this.game[0].length; r++) {
            if (this.game[r][max] === val) {
                this.status[val][3][1]++;
            } 
            max--;
        }        
    }

    getStatus(val) {
        return this.status[val];
    }

    // Track number of plays (in case no winner)
    getNumPlays() {
        this.numPlays = 0;
        for (let r = 0; r < this.game[0].length; r++) {
            for (let c = 0; c < this.game[r].length; c++) {
                if (this.game[r][c] !== '') {
                    this.numPlays++;
                }
            }    
        }
        return this.numPlays;
    }

    fillSpace(val, col, row) {
        return new Promise ((resolve, reject) => {
            // If no row or col specified, assign a rand row/col
            if (row === undefined) {
                row = Math.floor(Math.random() * Math.floor(this.game.length));
            }
            if (col === undefined) {
                col = Math.floor(Math.random() * this.game[row].length);
            }
    
            // If empty space, fill in space in data set
            if (this.game[row][col] === '') {
                this.game[row][col] = val;
                this.newX = [row, col];
                // Track how close to winning
                this.updateStatus(val);
                resolve(this.game);
            } else {
                // Repeat until a space is filled
                this.fillSpace(val).then();
            }
        });
    }
}   

