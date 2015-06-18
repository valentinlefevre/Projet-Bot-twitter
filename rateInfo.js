var Twit = require('twit');

var T = new Twit({
    consumer_key:         'pnEfCx9oVRVn6SOHWkcH38PGB'
  , consumer_secret:      'BGbVoycIcp9M0D0c9pTTL0eXezwktjCdvq1qHBsWvydczHu6hw'
  , access_token:         '2893323477-eHi0UgrJyjzLvAAYvfzrEKSTL7AmIVB8ADfosxM'
  , access_token_secret:  'L0EvqRCx2kzczdzqMSi5WWy1QfrNHIJRHuNSYRKG4S8Aj'
});

var i = 1;
console.log('Initialisation Bot twitter');
var idLastTwitAnswered = 0;

setInterval(function(){
	console.log("Boucle "+1);
	T.get('statuses/mentions_timeline', {count: 1}, function(err, data, response){
		if(err){
			console.log('Erreur dans statuses/mentions_timeline')
			console.log(handleError(err))
		}else{
			var nbTweetInMentionsTimeline = data.length
			console.log('Nb tweets dans time line : '+nbTweetInMentionsTimeline)
			for(i = 0; i < data.length; i++){
				
				var destinataire = data[i].user.screen_name
				var textMessage = '@'+destinataire+'Coucou ça gaze?'
				var inReplyToStatusId = data[i].id
				var parameters = {
					status: textMessage,
					in_reply_to_status_id: inReplyToStatusId
				}
				var parametersRetweet = {
					id: data[i].id_str
				}
				console.log('Twit n°'+i)
				console.log(parameters)
				
				if(idLastTwitAnswered != data[i].id_str){
					postStatusesUpdate(parameters);
					postStatusesRetweet(parametersRetweet);
				}else{
					console.log("J'ai déjà répondu à ce twit");
				}
				idLastTwitAnswered = data[i].id_str;
				T.get('friendships/show', {source_screen_name: 'Voilou01', target_screen_name: data[i].user.screen_name}, function(err, data, response){
					if(err){
						console.log('Erreur dans friendships/show')
						console.log(handleError(err))
					}else{
						if(!data.relationship.source.following){
							//console.log(JSON.stringify(data, null, 2))
							console.log(JSON.stringify(data, null, 2))
							postFriendshipsCreate(data[i].user.screen_name);
						}else{
							//console.log(JSON.stringify(data, null, 2))
							console.log('l\'utilisateur '+destinataire+' est déjà dans vos amis')
						}
					}
				})
				
			}
		}
	})
}, 120000);


/*
* La fonction crée une nouvelle relation avec l'utilisateur en question 
*/
function postFriendshipsCreate(screenName){
	T.post('friendships/create', {screen_name: screenName}, function(err, data, response){
		if(err){
			console.log('Erreur dans friendships/create')
			console.log(handleError(err))
		}else{
			console.log(' L\'utilisateur '+screenName+' a été ajouté à vos amis!')
		}
	})
}

/*
* La fonction permet de poster un nouveau statut twitter
*/
function postStatusesUpdate(parameters){
	T.post('statuses/update', parameters, function(err, data, response) {
		if(err){
			console.log('Erreur dans statuses/update')
			console.log(handleError(err))
		}else{
			console.log('Tweet posté');
			//console.log(data)
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