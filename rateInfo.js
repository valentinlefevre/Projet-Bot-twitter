

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'pnEfCx9oVRVn6SOHWkcH38PGB'
  , consumer_secret:      'BGbVoycIcp9M0D0c9pTTL0eXezwktjCdvq1qHBsWvydczHu6hw'
  , access_token:         '2893323477-eHi0UgrJyjzLvAAYvfzrEKSTL7AmIVB8ADfosxM'
  , access_token_secret:  'L0EvqRCx2kzczdzqMSi5WWy1QfrNHIJRHuNSYRKG4S8Aj'
})

// affiche les limites de requêtes exécutables
/*T.get('application/rate_limit_status', function(err, data, response) {
  console.log(JSON.stringify(data, null, 2))
})*/
T.get('friends/list', {screen_name: 'Voilou01'}, function(err, data, response){
	console.log(JSON.stringify(data, null, 2))
})
/*
T.get('statuses/mentions_timeline', {count: 20}, function(err, data, response){
	if(err){
		console.log(handleError(err))
	}else{
		for(i = 0; i < data.length; i++){
			var nbTweetInMentionsTimeline = data.length
			var textMessage = 'Coucou @'+data[i].user.screen_name+' ça gaze?'
			var inReplyToStatusId = data[i].id
			var parameters = {
				status: textMessage,
				in_reply_to_status_id: inReplyToStatusId
			}

			T.post('statuses/update', parameters, function(err, data, response) {
				console.log(data)
			})

			console.log('Twit n°'+i)
			console.log(parameters)
			
			//console.log(JSON.stringify(textMessage, null, 2))
			//console.log(JSON.stringify(data, null, 2))
		}
		console.log(nbTweetInMentionsTimeline)
	}
})
*/