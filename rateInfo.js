var Twit = require('twit');

var T = new Twit({
    consumer_key:         'pnEfCx9oVRVn6SOHWkcH38PGB'
  , consumer_secret:      'BGbVoycIcp9M0D0c9pTTL0eXezwktjCdvq1qHBsWvydczHu6hw'
  , access_token:         '2893323477-eHi0UgrJyjzLvAAYvfzrEKSTL7AmIVB8ADfosxM'
  , access_token_secret:  'L0EvqRCx2kzczdzqMSi5WWy1QfrNHIJRHuNSYRKG4S8Aj'
});

botScreenName = 'Voilou01';
var i = 0;
console.log('Initialisation Bot twitter');
console.log ('Lancement du stream');
/*
* Création du stream
*/
var stream = T.stream('user', {track: botScreenName});

/*
* Lancement du stream, pour chaque tweet reçu dans le stream la fonction effectue le traitement décrit dans le readme
*/
stream.on('tweet', function(tweet) {
	i++;
    console.log('Lecture du twit n°'+i);
    //console.log(JSON.stringify(tweet, null, 2));
	if(tweet.text.indexOf(botScreenName) > 0){
		postStatusesRetweet({id: tweet.id_str});
		T.get('friendships/show', {source_screen_name: botScreenName, target_screen_name: tweet.user.screen_name}, function(err, data, response){
			if(err){
				console.log(handleError(err))
			}else{
				if(botScreenName != tweet.user.screen_name){
					if(!data.relationship.source.following){
						console.log(JSON.stringify(data, null, 2))
						postFriendshipsCreate(data.relationship.source.screen_name);
					}else{
						console.log(JSON.stringify(data, null, 2))
						console.log('l\'utilisateur '+tweet.user.screen_name+' est déjà dans vos amis')
					}
				}else{
					console.log("Tu ne peux pas te suivre toi-même!");
				}
			}
		});
		
		if(tweet.entities.hashtags.length > 0){
			console.log(tweet.entities.hashtags[0].text);
			T.get('search/tweets', {q: "#"+tweet.entities.hashtags[0].text, count: 1}, function(err, data, response){
				if(err){
					console.log(handleError(err));
				}else{
					console.log("longueur du texte du status cité : "+data.statuses[0].text.length);
					//console.log(JSON.stringify(data, null, 2));
					console.log(data.statuses[0].text);
					parameters = {
						status: data.statuses[0].text,
						in_reply_to_status_id: tweet.id_str
					}
					postStatusesUpdate(parameters);
				}
			});
		}else{
			console.log(tweet.user.screen_name+" n'a défini aucun contexte");
		}
	}
});

/*
* La fonction crée une nouvelle relation avec l'utilisateur en question 
*/
function postFriendshipsCreate(screenName){
	T.post('friendships/create', {screen_name: screenName}, function(err, data, response){
		if(err){
			console.log(err);
		}else{
			console.log(' L\'utilisateur '+screenName+' a été ajouté à vos amis!');
		}
	})
}

/*
* La fonction permet de poster un nouveau statut twitter
*/
function postStatusesUpdate(parameters){
	T.post('statuses/update', parameters, function(err, data, response) {
		if(err){
			console.log(err);
		}else{
			console.log('Tweet posté');
			//console.log(data);
		}
	})
}

function postStatusesRetweet(parameters){
	T.post('statuses/retweet/:id', parameters, function(err, data, response){
		if(err){
			console.log(JSON.stringify(err, null, 2));
		}else{
			console.log("J'ai retweeté");
		}
	});
}