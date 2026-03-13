const TelegramBot = require("node-telegram-bot-api");

const token = "8672001788:AAFfchuzjilMUe5IKMINYIVh9c8uDylForc";

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1];

//   console.log(resp)

//   bot.sendMessage(chatId, resp);
// });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Received your message", {
    reply_markup: {
      keyboard: [
        ["A", "B"],
        ["C", "D"],
      ],
    },
  });
});

bot.onText;
