$(document).ready(function () {
    $(".sbx-custom__submit").on("click", function () {
        var encoded = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="
            + encodeURIComponent($(".sbx-custom__input").val()) + "&namespace=0&limit=10&callback=?";
        if ($(".contentBox").length) {
            $(".contentBox").remove();
        }
        $.getJSON(encoded, function (data) {
            var cleanData = iterateArr(data);
            for (var i = 0; i < 10; i++) {
                var element = "<div class='contentBox' style='cursor:pointer;' onclick=\"window.location='" + cleanData[3][i] + "';\"><p class='title'>" + cleanData[1][i] + "</p><p class='desc'>" + cleanData[2][i] + "</p></div>";
                $("body").append($(element).hide().fadeIn(1000));

            };
        });
    });

    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1", function (data) {
        var randomArr = iterateObj(data);
        $("#randomWiki").attr("href", "http://en.wikipedia.org/?curid=" + randomArr[2][0][0]).trigger("click");

    });

    document.querySelector('.searchbox [type="reset"]').addEventListener('click', function () { this.parentNode.querySelector('input').focus(); });

    function iterateObj(obj) {
        const arr = [];
        for (const prop in obj) {
            const value = obj[prop];
            if (typeof value == 'object') {
                arr.push(iterateObj(value));
            } else if ($.isArray(value)) {
                iterateArr(value);
            } else {
                arr.push(value);
            }
        };
        return arr;
    };

    function iterateArr(arr) {
        const cleanArr = [];
        for (var i = 0; i < arr.length; i++) {
            cleanArr.push(arr[i]);
        };
        return cleanArr;
    };


});