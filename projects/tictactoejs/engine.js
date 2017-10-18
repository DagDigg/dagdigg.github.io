$(document).ready(function () {
    var isPlayerX = true;
    var board = Array(9).fill(null);
    var conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function stall(arr) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i] == null) {
                return false;
            }
        }
        return true;
    }

    function isEmpty(arr) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i]) {
                return false;
            }
        }
        return true;
    }

    function aiTurn() {
        var rand = Math.floor(Math.random() * 8);

        while (board[rand]) {
            rand = Math.floor(Math.random() * 8);
        }
        board[rand] = (isPlayerX ? 'O' : 'X');
        $('.box[value=' + rand + ']').text(isPlayerX ? 'O' : 'X');
        if (checkWinner(board)) {
            return;
        }
    }

    function tryToWin(arr) {
        var sym = isPlayerX ? 'O' : 'X';
        for (var i = 0; i < conditions.length; i++) {
            var [a, b, c] = conditions[i];
            if (arr[a] == null && arr[b] === sym && arr[c] === sym) {
                board[a] = sym;
                $('.box[value=' + a + ']').text(sym);
                return true;
            } else if (arr[b] == null && arr[a] === sym && arr[c] === sym) {
                board[b] = sym;
                $('.box[value=' + b + ']').text(sym);
                return true;
            } else if (arr[c] == null && arr[a] === sym && arr[b] === sym) {
                board[c] = sym;
                $('.box[value=' + c + ']').text(sym);
                return true;
            }
        }
        return null;
    }

    function block(arr) {
        for (var i = 0; i < conditions.length; i++) {
            var [a, b, c] = conditions[i];
            if (arr[a] == null && arr[b] === arr[c] && arr[b]) {
                board[a] = (isPlayerX ? 'O' : 'X');
                $('.box[value=' + a + ']').text(isPlayerX ? 'O' : 'X');
                return;
            } else if (arr[b] == null && arr[a] === arr[c] && arr[a]) {
                board[b] = (isPlayerX ? 'O' : 'X');
                $('.box[value=' + b + ']').text(isPlayerX ? 'O' : 'X');
                return;
            } else if (arr[c] == null && arr[a] === arr[b] && arr[a]) {
                board[c] = (isPlayerX ? 'O' : 'X');
                $('.box[value=' + c + ']').text(isPlayerX ? 'O' : 'X');
                return;
            }
        }
        var rand = Math.floor(Math.random() * 8);

        while (board[rand]) {
            rand = Math.floor(Math.random() * 8);
        }
        board[rand] = (isPlayerX ? 'O' : 'X');
        $('.box[value=' + rand + ']').text(isPlayerX ? 'O' : 'X');
        return;
    }

    function aiTurnHard() {
        if(tryToWin(board)) {
            return;
        } else {
            block(board);
        }
    }

    $('.box').on('click', function () {
        var value = $(this).attr('value');
        if ($(this).text() || checkWinner(board)) {
            return;
        }
        board[value] = (isPlayerX ? 'X' : 'O');
        $(this).text(isPlayerX ? 'X' : 'O');
        if (checkWinner(board) || stall(board)) {
            return;
        }
        aiTurnHard(board);
        if (checkWinner(board)) {
            return;
        }
    })

    $('.reset').on('click', function(){
        board = Array(9).fill(null);
        for(var i = 0; i < board.length; i++) {
            $('.box[value=' + i + ']').text('');
        }
    })

    $('.btnX').on('click', function() {
        if(isEmpty(board)){
            isPlayerX = true;
        } else {
            alert('To change symbol, the board should be empty. Try to hit reset.')
        }
    })
    $('.btnO').on('click', function() {
        if(isEmpty(board)){
            isPlayerX = false;
        } else {
            alert('To change symbol, the board should be empty. Try to hit reset.')
        }
    })
    function checkWinner(arr) {
        for (var i = 0; i < conditions.length; i++) {
            if (arr[conditions[i][0]] && arr[conditions[i][0]] == arr[conditions[i][1]] && arr[conditions[i][0]] == arr[conditions[i][2]]) {
                alert('Winner is: ' + arr[conditions[i][0]]);
                return true;
            }
        }
    }
});