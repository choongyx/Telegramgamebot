
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '729085676:AAEQFP1BRcCSlq7kvHeEreyzzbpGzuS_blM';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const gameName = "SLAPTHEENEMY"

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
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'YO U WANNA PLAY SLAPTHEENEMY?');
});

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a SLAPTHEENEMY game. Say /start (or /game) if you want to play."));

//show title, high score and play button
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, gameName));
