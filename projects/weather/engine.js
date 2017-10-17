$(document).ready(function(){
	var lat = 0;
	var long = 0;
	var locUrl = "";
	
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(pos){
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
			$("#coordinates").html(lat + " " + long);			
			locUrl = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
			storeData();
		});
	} else {
		alert("not supported");
	};
		
	var dataLocal = {
		"coord" : {"lon":null, "lat":null},
		"weather" : [{"id":null, "main":null, "description":null, "icon":null}],
		"base" : null,
		"main" : {"temp":null, "pressure":null, "humidity":null, "temp_min":null, "temp_max":null},
		"visibility" : null,
		"wind" : {"speed":null, "deg":null},
		"clouds" : {"all":null},
		"dt" : null,
		"sys" : {"type":null,"id":null,"message":null,"country":null,"sunrise":null,"sunset":null},
		"id" : null,
		"name" : null,
		"cod" : null
	};

	function storeData() {
		$.getJSON(locUrl, function(data){
			dataLocal.main.temp = data.main.temp;
			dataLocal.name = data.name;
			dataLocal.weather[0].main = data.weather[0].main;
			dataLocal.weather.icon = data.weather.icon;
			$("#name").html(dataLocal.name);
			$("#temp").html(dataLocal.main.temp + "<a href='#' id = 'deg' class ='cel'> °C</a>");
			$("#desc").html(dataLocal.weather[0].main);
			$("img").attr("src", data.weather[0].icon);
			$(document).on("click", "#deg", function(){	
				console.log("click");	
				if ($("#deg").hasClass("cel")){
					var farenheit = dataLocal.main.temp * 9/5 + 32;
					$("#temp").html(farenheit + "<a href='#' id = 'deg'> °F</a>");
					$("#deg").addClass("far");
					$("#deg").removeClass("cel");
			} else if ($("#deg").hasClass("far")){
				$("#temp").html(dataLocal.main.temp + "<a href='#' id = 'deg' class ='cel'> °C</a>");
				$("#deg").addClass("cel");
				$("#deg").removeClass("far");
			}; 
			
			});

			if (dataLocal.main.temp > 20) {
				$("body").css({
					"background": "-webkit-linear-gradient(to right, #f7b733, #fc4a1a)",
					"background": "linear-gradient(to right, #fc4a1a, #f7b733)"
			});  
			} else if (dataLocal.main.temp <= 20 && dataLocal.main.temp > 10) {
				$("body").css({
					"background": "#22c1c3",  
					"background": "-webkit-linear-gradient(to right, #fdbb2d, #22c1c3)",  
					"background": "linear-gradient(to right, #fdbb2d, #22c1c3)" 	
				});
			} else {
				$("body").css({
					"background": "#000046",  
					"background": "-webkit-linear-gradient(to right, #1CB5E0, #000046)",
					"background": "linear-gradient(to right, #1CB5E0, #000046)" 
						
				});
			}
			
		});
		
	};
	
});







