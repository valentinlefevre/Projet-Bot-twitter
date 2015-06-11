var botTwitter = require('./botTwitter.js');

var bot = new botTwitter();
bot.presentYourself();
bot.getStatusesMentionsTimeline();