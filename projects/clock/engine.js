$(document).ready(function () {
    var newBreakTime = parseInt($('#breakTime').text());
    var newPomTime = parseInt($('#pomTime').text());
    var play = false;
    var myInterval;
    var breakBool = false;

    function updateText(element, text) {
        element.text(text);
    }

    function reduceTime() {
        if (play) {
            var minutes = parseInt($('#minutes').text());
            var seconds = parseInt($('#seconds').text());

            if (minutes > 0 || seconds > 0) {
                if (seconds == 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                var formattedSeconds = ("0" + seconds).slice(-2);
                $('#minutes').text(minutes);
                $('#seconds').text(formattedSeconds);
            } else {
                if (!breakBool) {
                    $('#minutes').text($('#breakTime').text());
                    breakBool = true;
                } else {
                    $('#minutes').text($('#pomTime').text());
                    breakBool = false;
                }
            }
        }
    }

    //BREAK
    $('#minusBreak').on('click', function () {
        if (!play) {
            if (newBreakTime > 0) {
                newBreakTime -= 5;
                updateText($('#breakTime'), newBreakTime);
            }
        }
    });
    $('#plusBreak').on('click', function () {
        if (!play) {
            newBreakTime += 5;
            updateText($('#breakTime'), newBreakTime);
        }
    });
    //POMODORO
    $('#minusPom').on('click', function () {
        if (!play) {
            if (newPomTime > 0) {
                newPomTime -= 5;
                updateText($('#pomTime'), newPomTime);
                if(!breakBool){
                    updateText($('#minutes'), newPomTime);       
                    $('#seconds').text("00");
                }
            }
        }
    });
    $('#plusPom').on('click', function () {
        if (!play) {
            newPomTime += 5;
            updateText($('#pomTime'), newPomTime);
            if(!breakBool){
                updateText($('#minutes'), newPomTime);
                $('#seconds').text("00");
            }
        }
    });


    //RESET
    $('#reset').on('click', function () {
        newBreakTime = 5;
        newPomTime = 25;
        updateText($('#breakTime'), newBreakTime);
        updateText($('#pomTime'), newPomTime);
        updateText($('#minutes'), 25);
        updateText($('#seconds'), "00")
        play = false;
        breakBool = false;
        clearInterval(myInterval);
    });
    //PLAY
    $('#play').on('click', function () {
        if (!play) {
            play = true;
            myInterval = setInterval(reduceTime, 1000);
        }
    });
    //PAUSE
    $('#pause').on('click', function () {
        play = false;
        clearInterval(myInterval);
    });

});