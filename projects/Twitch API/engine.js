$(document).ready(function(){

    var streamersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    function iterateObj(obj){
        const arr = [];
        for (const prop in obj){
            const value = obj[prop];
            if (typeof value == 'object'){
                arr.push(iterateObj(value));
            } else {
                arr.push(value);
            };
        };
        return arr;
    };

    for (var i = 0; i < streamersArr.length; i++){
        var name = streamersArr[i];
        (function(i){
            $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + streamersArr[i], function(data){
                var userArr = iterateObj(data);
                if (userArr[0].length > 0){
                    var element = "<div class ='userBoxOn' style='cursor:pointer;' onclick=\"window.location='https://www.twitch.tv/" + streamersArr[i] + "';\"" + "><img src='" + userArr[0][10][12] + "'><p class='username'>" + userArr[0][10][8] + "</p><p class='desc'>" + userArr[0][1] + ": "+ userArr[0][10][2] +"</p></div>";
                    $("body").append(element);
                } else {
                    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + streamersArr[i], function(data){
                        var userArr = iterateObj(data);
                        var element = "<div class ='userBoxOff'><img src='" + userArr[11] + "'><p class='username'>" + userArr[3] + "</p><p class ='desc'>Offline</p></div>";
                        $("body").append(element);
                        
                    }); 
                }; 
            }); 
        })(i);
        
    }; 
});