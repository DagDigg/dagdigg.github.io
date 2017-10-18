$(document).ready(function () {
    var play = false;
    var strict = false;
    var correct = true;
    var arr = [];
    var yourArr = [];
    var timeOut;
    var score = 0;
    function loadSounds(url) {
        $.ajax({
            url: url,
            success: function() {
                $('.btns').toggle();
                alert('complete');
            }
        });
    }
    loadSounds('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    function yourTurn() {
        $('.box').on('click', function (event) {
            event.stopPropagation();
            var currentBox = this.id;
            var audio = $('#' + currentBox).children();
            audio[0].play();
            yourArr.push(parseInt(currentBox.slice(currentBox.length - 1)));
            changeColor(currentBox);
            console.log(yourArr);
            
            for(var i = 0; i < yourArr.length; i++) {
                if(yourArr[i] != arr[i]) {
                    $('.score').text('WRONG');
                    setTimeout(playCPU, 2000);
                    if(strict) {
                        arr = [];
                        score = 0;
                    } else { 
                        correct = false;
                        score--;
                        return;
                    }
                }
            }
            if(yourArr.length == arr.length){
                correct = true;
                setTimeout(playCPU, 2000);
            }
        });
    }

    $('.strict').on('click', function () {
        strict = !strict;
        if(strict) {
            $('.onoff').text('ON');
        } else {
            $('.onoff').text('OFF');
        }
    });

    function changeColor(id) {
        var bg = $('#' + id).css('background-color');
        var newBG;
        switch (bg) {
            case 'rgb(134, 26, 26)':
                newBG = '#C72727';
                break;
            case 'rgb(35, 35, 88)':
                newBG = '#3333CE';
                break;
            case 'rgb(150, 150, 30)':
                newBG = '#E9E918';
                break;
            case 'rgb(182, 123, 20)':
                newBG = '#F89F05';
                break;
        }
        $('#' + id).css({ 'background-color': newBG });
        window.setTimeout(function () {
            $('#' + id).css({ 'background-color': bg });
        }, 500);

    }

    function playAudio() {
        for (var i = 0; i <= arr.length; i++) {
            (function (i) {
                timeOut = setTimeout(function () {
                    var parentDiv = $('#audio_' + arr[i]).parent().attr('id');
                    $('#audio_' + arr[i])[0].play();
                    changeColor(parentDiv);
                    if (i == (arr.length - 1)) {
                        yourArr = [];
                        yourTurn();
                    }
                }, i * 1000);
            })(i);
        }
        clearTimeout(timeOut);
        return true;
    }

    function playCPU() {
        $('.box').off('click');
        if(correct){
            arr.push(Math.floor(Math.random() * 4) + 1);
        }
        var firstAudio = $('#audio_' + arr[0])[0];
        score++;
        $('.score').text(score);
        playAudio();
    }

    $('.play').on('click', function () {
        arr = [];
        yourArr = [];
        score = 0;
        
        playCPU();
    });


});