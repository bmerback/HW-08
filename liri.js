var key = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');


var myTweets = function () {

	var client = new Twitter(key);
	
	var params = {screen_name: 'PixieSput', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		
    		for (var i = 0; i < tweets.length; i +=1) {
    			console.log("Tweet: " + tweets[i].text);
    			console.log("Created: " + tweets[i].created_at);
    			console.log(" ---------------------------------");
    		}
  		}
  		else {
  			console.log(error);
  		}
	});
}


var mySpotify = function(title) {

	var spotify = new Spotify({
		id: "584bdb8f924246d183432bbf2cfe4fc1",
		secret: "d0974c3068694cdb8692898f055886c8"
	});

	if (title == undefined) {
		spotify
  		.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
  		.then(function(data) {
 				console.log("Song: " + data.name);
 				console.log("Album: " + data.album.name);
				console.log("Artist: " + data.album.artists[0].name);
				console.log("---------------------------------------");
  		})
  		.catch(function(err) {
    		console.error('Error occurred: ' + err); 
  		});
  		return;
	}
 
		spotify
		.search({ type: 'track', query: title })
	 	.then(function(response) {
 			var info = response.tracks.items;
 			for (var i = 0; i < info.length; i+=1) {
 				console.log("Artist: " + info[i].artists[0].name);
				console.log("Song: " + info[i].name);
				console.log("Preview: " + info[i].preview_url);
				console.log("Album: " + info[i].album.name);
				console.log("---------------------------------------");
			}
		})
	 
	 	.catch(function(err) {
	 		console.log(err);
	 	});
}	 	


var myMovie = function(title) {
	
	if (title == undefined) {
		var query = "http://www.omdbapi.com/?apikey=40e9cece&t=Mr+Nobody";
	}
	else {
	var query = "http://www.omdbapi.com/?apikey=40e9cece&t=" + title;
	}
	
	request(query, function(error, response, body) {

  		if (!error && response.statusCode === 200) {

    	console.log("Title: " + JSON.parse(body).Title);
    	console.log("Release Year: " + JSON.parse(body).Year);
    	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    	console.log("Country: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Actors: " + JSON.parse(body).Actors);;
  	}
	});
}


var myFile = function () {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
    		return console.log(error);
  		}

  		var x = data.split(",");
  		console.log(x[0]);
  
  		if (x[0] == "my-tweets") {
  			myTweets();
  			return;
  		}
  		if (x[0] == "spotify-this-song") {
  			mySpotify(x[1]);
  			return;
  		}
  		if (x[0] == "movie-this") {
  			myMovie(x[1]);
  			return;
  		}
  		else {
  			console.log("Use one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");
		}
  	});
}


var command = process.argv[2];
var title = process.argv[3];

	
switch(command) {
	case "my-tweets" :
		myTweets();
		break;

	case "spotify-this-song" :
		mySpotify(title);
		break;

	case "movie-this" :
		myMovie(title);
		break;

	case "do-what-it-says" :
		myFile();
		break;

		default:
		console.log("Use one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says");
}

	


