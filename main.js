
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '729085676:AAEQFP1BRcCSlq7kvHeEreyzzbpGzuS_blM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const gameName = "SlaptheEnermy";

const queries = {};

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'YO U WANNA PLAY SlaptheEnermy?');
// });

//HELP message
bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a SlaptheEnermy game. Say /start or /SlaptheEnermy if you want to play."));

//START or SlaptheEnermy message
//need changes
bot.onText(/start|SlaptheEnermy/, (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'YO U WANNA PLAY SlaptheEnermy? Type /play SlaptheEnermy');
});

//bot.onText(/test/, (msg) => bot.sendGame(msg.from.id, gameName));

bot.onText( /\/play (.+)/, function( msg, match ) {

  var fromId = msg.from.id;

  switch( match[1] ) {

      case "SlaptheEnermy":

          bot.sendGame(

              fromId,

              "SlaptheEnermy",

              {

                  reply_markup: JSON.stringify({

                      inline_keyboard: [

                          [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "SlaptheEnermy" } ) } ],
                        
                          [ { text: "Share", url: "http://t.me/Slapurface_bot?game=SlaptheEnermy" } ]

                      ]

                  })

              }

          );

          break;

      default:

          bot.sendMessage( fromId, "Sorry " + msg.from.first_name + ", but this game doesn’t exist.." );

  }

} );

bot.on("callback_query", function (query) {
  
  if (query.game_short_name != gameName) {
    bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
  } else {
    queries[query.id] = query;
    let gameurl = "http://t.me/Slapurface_bot?game=SlaptheEnermy";  //id="+query.id;
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      url: gameurl
    });
  }
});


bot.on( "inline_query", function( iq ) {

  bot.answerInlineQuery( iq.id, [ { type: "game", id: "0", game_short_name: "SlaptheEnermy" } ] );

} );