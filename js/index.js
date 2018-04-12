//Break buttons
const breakAddTimeButton = $('#breakAdd');
const breakRemoveTimeButton = $('#breakRemove');
//Session buttons
const sessionAddTimeButton = $('#sessionAdd');
const sessionRemoveTimeButton = $('#sessionRemove');
//Break set time display
const breakSetDisplay = $('#breakSet');
//Session set time display
const sessionSetDisplay = $('#sessionSet');
//Session/break timer
const sessionTimeDisplay = $('#sessionTime');
const statusText = $('#statusText');
//Buttons
const startButton = $('#start');
const pauseButton = $('#pause');
const resetButton = $('#reset');
let breakMin = 5;
let breakSec = 0;
let sessionMin = 25;
let sessionSec = 0;
let currMin = sessionMin;
let currSec = sessionSec;
let isRunning = false;
let intID;
let session = true;
//Increment/decrement break length
$(function () {
    breakAddTimeButton.on('click', function (e) {
        e.preventDefault();
        if (!isRunning) {
            let curr = parseInt(breakSetDisplay.text());
            if(curr < 60){
                curr++;
            }
            breakMin = curr;
            breakSetDisplay.text(curr);
        }
    });
    breakRemoveTimeButton.on('click', function (e) {
        e.preventDefault();
        if (!isRunning) {
            let curr = parseInt(breakSetDisplay.text());
            if (curr > 1) {
                curr--;
            }
            breakMin = curr;
            breakSetDisplay.text(curr);
        }
    });
    //Increment/decrement session length
    sessionAddTimeButton.on('click', function (e) {
        e.preventDefault();
        if (!isRunning) {
            let curr = parseInt(sessionSetDisplay.text());
            if(curr < 60){
                curr++;
            }
            sessionSetDisplay.text(curr);
            sessionTimeDisplay.text(curr);
            sessionMin = curr;
            reset();
        }
    });
    
    sessionRemoveTimeButton.on('click', function (e) {
        e.preventDefault();
        if (!isRunning) {
            let curr = parseInt(sessionSetDisplay.text());
            if (curr > 1) {
                curr--;
            }
            sessionSetDisplay.text(curr);
            sessionTimeDisplay.text(curr);
            sessionMin = curr;
            reset();
        }
    });

    function startTimer() {
        //Disable start button after click
        startButton.prop('disabled', true);
        let min = currMin;
        let sec = currSec;
        intID = setInterval(function () {

            if (sec > 0) {
                sec--;
                if (sec < 10) {
                    $('#sec').text('0' + sec);
                } else {
                    $('#sec').text(sec);
                }
            } else {
                min--;
                sec = 59;
                $('#sec').text(sec);
                $('#min').text(min);
            }

            if (min === 0 && sec === 0) {
                if (session) {
                    statusText.text('Break');
                    session = false;
                    min = breakMin;
                    sec = breakSec;
                } else {
                    statusText.text('Session');
                    session = true;
                    min = sessionMin;
                    sec = sessionSec;
                }
            }
        }, 1000);
    }
    //Stop timer
    function stopTimer() {
        clearInterval(intID);
        currMin = parseInt($('#min').text());
        currSec = parseInt($('#sec').text());
        startButton.prop('disabled', false);
    }
    //Reset timer
    function reset() {
        if (isRunning) {
            stopTimer();
            isRunning = false;
        }
        currSec = 0;
        currMin = sessionMin;
        session = true;
        $('#sec').text('00');
        $('#min').text(currMin);
        startButton.prop('disabled', false);
        statusText.text('Session');
    }
    startButton.on('click', function (e) {
        e.preventDefault();
        startTimer();
        isRunning = true;
        pauseButton.removeClass('active');
        startButton.addClass(' active');
    });

    pauseButton.on('click', function (e) {
        e.preventDefault();
        if (isRunning) {
            stopTimer();
            isRunning = false;
        }
        startButton.removeClass('active');
        pauseButton.addClass(' active');
    });
    
    resetButton.on('click', function (e) {
        e.preventDefault();
        if (isRunning) {
            reset();
        } else if (!isRunning) {
            reset();
        }
        pauseButton.removeClass('active');
        startButton.removeClass('active');
    });
});