import * as base from '../views/base';

export default class Tictactoe {
    constructor() {
            this.game = [[]];
            this.newX = [];
            this.game.length = base.axes;
            this.status = {
                x: [[]],
                o: [[]]
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
        this.status = {
            x: [[]],
            o: [[]]
        };    
    }

    // Update how close to winning user and computer is
    updateStatus(val) {
        console.log('inside updateStatus fn');
        // Reset prev winning array
        this.resetStatus(val);
        let curDiagPos = []; 
        let curDiagNeg = []; 
        let curAcross = [[]];
        let curDown = [[]];
        
        // Loop through data to check for ACROSS winners
        for (let r = 0; r < this.game[0].length; r++) {
            curAcross[r] = [];
            for (let c = 0; c < this.game[r].length; c++) {
                if (this.game[r][c] === val) {
                    curAcross[r].push([r,c]);
                } 
                // Check for DIAGONOL (negative slope) winner   
                if (this.game[r][c] === val && r === c) {
                    curDiagNeg.push([r,c]);
                    } 
            }    
            if (this.checkWinner(val, curAcross[r])) {
                return;
            }
        }
        if (this.checkWinner(val, curDiagNeg)) {
            return;
        }
        console.log('curAcross: ', val, curAcross);
        console.log('curDiagNeg: ', val, curDiagNeg);
        
        // Redo loop in column format to check for DOWN winner
        for (let c = 0; c < this.game[0].length; c++) {
            // Reset down winner count
            curDown[c] = [];
            for (let r = 0; r < this.game[c].length; r++) {
                // Check for down winner and update win count
                if (this.game[r][c] === val) {
                    curDown[c].push([r,c]);
                } 
            }
            if (this.checkWinner(val, curDown[c])) {
                return;
            }
        }    
        console.log('curDown: ', val, curDown);

        // Check for DIAGONOL (positive slope) winner
        let c = this.game[0].length - 1;
        for (let r = 0; r < this.game[0].length; r++) {
            if (this.game[r][c] === val) {
                curDiagPos.push([r,c]);
            } 
            c--;
        }        
        console.log('curDiagPos: ', val, curDiagPos);
        if (this.checkWinner(val, curDiagPos)) {
            return;
        }
    }

    // Check winners 
    checkWinner(val, arr) {
        if (arr.length === 3) {
            this.status[val] = arr;
            console.log('3 met: ', val, this.status[val]);
            return true;
        }
        return false;
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

