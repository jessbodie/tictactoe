// Number of axes
export const axes = 3;

export const elements = {
    board: document.getElementById('board'),
    // message: document.getElementById('message'),
    content: document.getElementById('content'),
    close: document.getElementById('message__close'),
    play: document.getElementById('message__play')
};

export const msgs = {
    winnerText: 'Congratulations! You\'re the big winner. Alert the twittersphere!',
    loserText: 'Oh man... You let a computer beat you. Demand justice!',
    drawText: 'Zoikes... a draw?! You can\'t let that stand...',
    cheaterText: 'Hey tricky... what are you up to? Please enter an "O" in an empty space for your turn.'
};
