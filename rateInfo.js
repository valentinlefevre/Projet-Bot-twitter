var Twit = require('twit');

var T = new Twit({
    consumer_key:         'pnEfCx9oVRVn6SOHWkcH38PGB'
  , consumer_secret:      'BGbVoycIcp9M0D0c9pTTL0eXezwktjCdvq1qHBsWvydczHu6hw'
  , access_token:         '2893323477-eHi0UgrJyjzLvAAYvfzrEKSTL7AmIVB8ADfosxM'
  , access_token_secret:  'L0EvqRCx2kzczdzqMSi5WWy1QfrNHIJRHuNSYRKG4S8Aj'
});

// affiche le dernier tweet reçu
/*
T.get('statuses/mentions_timeline', {count: 1}, function(err, data, response){
		if(err){
			console.log(handleError(err))
		}else{
			console.log(JSON.stringify(data, null, 2))
		}
})
*/

// affiche les limites de requêtes exécutables
/*T.get('application/rate_limit_status', function(err, data, response) {
  console.log(JSON.stringify(data, null, 2))
})*/
/*
// Si il n'y a pas de relation entre les 2 utilisateurs il en crée une de la source vers la target
T.get('friendships/show', {source_screen_name: 'Voilou01', target_screen_name: 'LeParisienTV'}, function(err, data, response){
	if(!data.relationship.source.following){
		//console.log(JSON.stringify(data, null, 2))
		console.log(JSON.stringify(data, null, 2))
		T.post('friendships/create', {screen_name: 'LeParisienTV'}, function(err, data, response){
			if(err){
				console.log(handleError(err))
			}else{
				console.log(' L\'utilisateur LeParisienTV a été ajouté à vos amis!')
			}
		})
	}else{
		console.log('l\'utilisateur est déjà dans vos amis')
	}
})
*/


setInterval(function(){
	T.get('statuses/mentions_timeline', {count: 1}, function(err, data, response){
		if(err){
			console.log('Erreur dans statuses/mentions_timeline')
			console.log(handleError(err))
		}else{
			var nbTweetInMentionsTimeline = data.length
			console.log('Nb tweets dans time line : '+nbTweetInMentionsTimeline)
			for(i = 0; i < data.length; i++){
				
				var destinataire = data[i].user.screen_name
				var textMessage = 'Coucou @'+destinataire+' ça gaze?'
				var inReplyToStatusId = data[i].id
				var parameters = {
					status: textMessage,
					in_reply_to_status_id: inReplyToStatusId
				}
				
				console.log('Twit n°'+i)
				console.log(parameters)
				
				T.post('statuses/update', parameters, function(err, data, response) {
					if(err){
						console.log('Erreur dans statuses/update')
						console.log(handleError(err))
					}else{
						console.log('Tweet posté');
						//console.log(data)
					}
				})
				
				T.get('friendships/show', {source_screen_name: 'Voilou01', target_screen_name: data[i].user.screen_name}, function(err, data, response){
					if(err){
						console.log('Erreur dans friendships/show')
						console.log(handleError(err))
					}else{
						if(!data.relationship.source.following){
							//console.log(JSON.stringify(data, null, 2))
							console.log(JSON.stringify(data, null, 2))
							T.post('friendships/create', {screen_name: data[i].user.screen_name}, function(err, data, response){
								if(err){
									console.log('Erreur dans friendships/create')
									console.log(handleError(err))
								}else{
									console.log(' L\'utilisateur '+data[i].user.screen_name+' a été ajouté à vos amis!')
								}
							})
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

