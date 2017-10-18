
$(document).ready(function () {
    var arr = [];
    var re = /\./g;
    var re2 = /\.$/g;

    $(".btn").on("click", function () {
        switch (this.id) {
            case "ce":
                arr.pop();
                if (arr.length == 0) {
                    $("#current").text("");
                }
                break;

            case "ac":
                arr = [];
                $("#current").text("");
                break;

            case ".":
                if (arr.length > 0 && re.test(arr[arr.length - 1]) == false) {
                    arr[arr.length - 1] += ".";
                }
                break;

            case "=":
                var tot = eval(arr.join("")).toFixed(2);
                arr = [];
                arr.push(tot);
                break;

            default:
                if (arr.length == 0 || arr[arr.length - 1].toString().length < 11) {
                    if (!isNaN(this.id)) {
                        if (re2.test(arr[arr.length - 1]) == false) {
                            if (isNaN(arr[arr.length - 1])) {
                                arr.push(this.id);
                            } else {
                                arr[arr.length - 1] += this.id;
                            }
                        } else {
                            arr[arr.length - 1] += this.id;

                        }
                    } else {
                        if (isNaN(arr[arr.length - 1])) {
                            arr.pop();
                            arr.push(this.id);
                        } else {
                            arr.push(this.id);
                        }
                    }
                }
                break;
        }
        if (!isNaN(arr[arr.length - 1])) {
            if(arr[arr.length-1].toString().length < 11){
                $("#current").text(arr[arr.length - 1]);
            } else {
                $("#current").html("max digits");
                arr = [];
            }
        } else {
            $("#current").text(arr[arr.length - 2]);
        }
        $("#exp").text(arr.join(""));
    });
});