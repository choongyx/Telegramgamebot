var TelegramBot = require( "node-telegram-bot-api" );

var bot = new TelegramBot( "729085676:AAEQFP1BRcCSlq7kvHeEreyzzbpGzuS_blM", { polling: true } );

bot.onText( /\/start/, function( msg ) {

  bot.sendMessage(

      msg.from.id,

      "Hi <b>" + msg.from.first_name + "</> " + msg.from.last_name + "\nLet's play WiMi5 games!",

      {

          parse_mode: "HTML"

     }

  );

} );


bot.onText( /\/play (.+)/, function( msg, match ) {

  var fromId = msg.from.id;

  switch( match[1] ) {

      case "TestGame":

          bot.sendGame(

              fromId,

              "TestGame",

              {

                  reply_markup: JSON.stringify({

                      inline_keyboard: [

                          [ { text: "Play", callback_game: JSON.stringify( { game_short_name: "TestGame" } ) } ],

                          [ { text: "Share", url: "https://telegram.me/wimi5_bot?game=TestGame" } ]

                      ]

                  })

              }

          );

          break;

      default:

          bot.sendMessage( fromId, "Sorry " + msg.from.first_name + ", but this game doesn’t exist.." );

  }

} );

bot.on( "callback_query", function( cq ) {

  if ( cq.game_short_name ) {

      switch( cq.game_short_name ) {

          case "TestGame":

              bot.answerCallbackQuery( cq.id, undefined, false, { url: "URL_DE_NUESTO_JUEGO" } );

              return;

      }

      bot.answerCallbackQuery( cq.id, "Sorry, '" + cq.game_short_name + "' is not available.", true );

  }

} );

bot.on( "inline_query", function( iq ) {

  bot.answerInlineQuery( iq.id, [ { type: "game", id: "0", game_short_name: "TestGame" } ] );

} );

