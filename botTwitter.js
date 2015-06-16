

function botTwitter (){
	
	this.name = "Chappie";
	this.consumerKey =         'pnEfCx9oVRVn6SOHWkcH38PGB';
	this.consumerSecret =      'BGbVoycIcp9M0D0c9pTTL0eXezwktjCdvq1qHBsWvydczHu6hw';
	this.accessToken =        '2893323477-eHi0UgrJyjzLvAAYvfzrEKSTL7AmIVB8ADfosxM';
	this.accessTokenSecret =  'L0EvqRCx2kzczdzqMSi5WWy1QfrNHIJRHuNSYRKG4S8Aj';
	
	var Twit = require('twit');
	var T = new Twit({
		consumer_key: this.consumerKey,
		consumer_secret: this.consumerSecret,
		access_token: this.accessToken,
		access_token_secret: this.accessTokenSecret
	});
	
	this.presentYourself = function(){
		console.log("Salut, je m'appelle "+this.name);
	}
	
	this.postFriendshipsCreate = function(screenName){
		T.post('friendships/create', {screen_name: screenName}, function(err, data, response){
			if(err){
				console.log('Erreur dans friendships/create')
				console.log(handleError(err))
			}else{
				console.log(' L\'utilisateur '+screenName+' a été ajouté à vos amis!')
			}
		})
	}
	
	this.postStatusesUpdate = function(parameters){
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
	
	this.getStatusesMentionsTimeline = function(){
		T.get('statuses/mentions_timeline', {count: 2}, function(err, data, response){
			for(i=0; i<data.length; i++){
				console.log("Tweet n°"+(i+1));
				userScreenName = data[i].user.screen_name;
				contenu = data[i].text;
				if(data[i].entities.hashtags.length > 0){
					contexte = data[i].entities.hashtags[0].text;
				}else{
					contexte = "";
				}
				console.log(userScreenName+" m'a dit : '"+contenu+"' dans ce contexte : '"+contexte+"'"); 
			}
			//console.log(JSON.stringify(data, null, 2))
			return data;
		});
	}
	
	
}

module.exports = botTwitter;