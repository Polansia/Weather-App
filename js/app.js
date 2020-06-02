const appKey = "c552393e1e71e281e66fbc324d052895"; 

var cities = ["New York", "Hartford", "Detroit", "Providence", "Houston"];

function makeSentenceCase(string) {
	let firstLetter = string.charAt(0);
	let cappedString = string.replace(firstLetter, firstLetter.toUpperCase());
	return cappedString;
}
var buttonClicked = false;;
var buttonCity;




$(function() {
	
	var uvColor = $("#uv-text");
	let resultCity = $("#temp-result h3"),
		resultIcon = $("#temp-result img"),
		resultTemp = $("#temp-result p"),
		resultHumidity = $("#humidity-result p"),
		resultWindspeed = $("#windspeed-result p"),
		resultUV = $("#uv-result p"),
		zipInput = $("#zip"),
		zipCode;
		
		
	$("#buttons-view").click(() => {

	buttonClicked = true
	buttonCity = event.srcElement.id
	weather()

	});

	$("#enter-zip").submit((e) => {
		e.preventDefault();
		e.stopPropagation();
		weather()

	});

	function weather(){
		
		resultTemp.text("");
		resultHumidity.text("");
		resultUV.text("");
		resultWindspeed.text("");
		if (buttonClicked === true){

			zipCode = buttonCity
		}
		else{

			zipCode = zipInput.val();
		}
		buttonClicked = false;

		
		$.get("https://api.openweathermap.org/data/2.5/weather?q=" + zipCode
			+ "&appid=" + appKey + "&units=imperial"
		).done((data) => {

			let city = data.name,
				temp = data.main.temp.toFixed(0),
				icon = data.weather[0].icon,
				desc = makeSentenceCase(data.weather[0].description),
				humidity = data.main.humidity,
				windspeed = data.wind.speed,
				longitude = data.coord.lon,
				latitude = data.coord.lat;


			resultCity.html(city);
			resultIcon.attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
			resultIcon.attr("alt", desc);
			resultIcon.show();
			resultTemp.html("Temperature= " + temp + "&deg;F. " + makeSentenceCase(desc) + ".");
			resultHumidity.html("Humidity= " + humidity + "%");
			resultWindspeed.html("Windspeed= " + windspeed + "MPH");
		$.get("https://api.openweathermap.org/data/2.5/uvi?appid=" + appKey + "&lat="+ latitude 
		+ "&lon="+ longitude
		).done((data) => {

		let value = data.value
		
		resultUV.html(value);
		if (value <= 2){

			uvColor.css("background-color", "green");
		}
		else if(value <= 5){

			uvColor.css("background-color", "yellow");
		}
		else if(value <= 7){

			uvColor.css("background-color", "orange");
		}
		else {

			uvColor.css("background-color", "red");
		}


		}
		
		)

		$.get("https://api.openweathermap.org/data/2.5/forecast?q=" + zipCode
		+ "&appid=" + appKey + "&units=imperial" 
		).done((data) => {
			var tempArray = []
			var iconArray = []
			var length = data.list
			var x;
			for (x = 0; x < length.length; x++){
			var tempList = data.list[x].main.temp
			var iconList = data.list[x].weather[0].icon
			tempArray.push(tempList)
			iconArray.push(iconList)
			}
			
			var i;
		
			for (i = 0; i < 5; i++) {
				var timedate =new Date();
				var tomorrow = '' + new Date(timedate.getTime() + 1 + i * 24 * 60 * 60 * 1000) + ''
				var tomorrowString = tomorrow.split('2020')[0]
				var date = $("#tomorrow" + i)
				tomorrowIcon = document.getElementById("#iconTomorrow" + i)
				var index = i * 8 
				var tomorrowTemp = tempArray [index]
				var tomorrowIconContent = iconArray [index]
				var tomorrowIcon = $("#tomorrow" + i + " img")
				
               var iconSource = "http://openweathermap.org/img/w/" + tomorrowIconContent + ".png"
		     	
			   

				date.html(tomorrowString + "<br>" + "Temp: " + tomorrowTemp + "&deg;F. ")

				var img = document.createElement('img'); 
				img.src = iconSource
				date.append(img); 
				
				
				tomorrowIcon.show();
			  }


		});



		}).fail((err) => {
			resultCity.text("Error");
			resultIcon.hide();
			resultTemp.text("Sorry, we're unable to get your weather. Please try again.");
		
		}).always(() => {
			
			$("#temp-result").show();
			$("#humidity-result").show();
			$("#windspeed-result").show();
			$("#uv-result").show();
			$("#fiveday").show();
			$("#fiveday").show();
			$("#UVIndex").show();
			renderButtons();
		});
	};
});
function renderButtons() {


	$("#buttons-view").empty();


	for (var i = 0; i < cities.length; i++) {


	  var a = $("<button>");

	  a.attr("data-name", cities[i]);

	  a.attr("id", cities[i])

	  a.attr("class", "citybutton")

	  a.text(cities[i]);
	  

	  $("#buttons-view").append(a);
	}
  }

  
