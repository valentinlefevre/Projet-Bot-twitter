var botTwitter = require('./botTwitter.js');

var bot = new botTwitter();
bot.presentYourself();
bot.getStatusesMentionsTimeline();
bot.postStatusesRetweet(bot.getStatusesMentionsTimeline());
/*var i = 0;
setInterval(function(){
		
	i++;
	bot.postStatusesRetweet(bot.getStatusesMentionsTimeline());
	console.log("C'est l'itération "+i);
},120000);
*/