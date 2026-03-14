const TelegramBot = require("node-telegram-bot-api");

const token = "8672001788:AAFfchuzjilMUe5IKMINYIVh9c8uDylForc";

const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1];

//   console.log(resp)

//   bot.sendMessage(chatId, resp);
// });
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Getting started console logs!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Неявное приведение типов", callback_data: "types" }],
      ],
    },
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text && !msg.text.startsWith("/")) {
    const text = `\`\`\`javascript
console.log([] === ![])
    \`\`\``;
    console.log(eval("[] === ![]"));
    bot.sendMessage(chatId, text, {
      parse_mode: "MarkdownV2",
      reply_markup: {
        keyboard: [
          ["A", "B"],
          ["C", "D"],
        ],
      },
    });
  }
});
