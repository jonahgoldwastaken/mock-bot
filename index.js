process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require("node-telegram-bot-api");
const mock = require("mockbot-cli");

require("dotenv").config();
const botToken = process.env.TELEGRAM_TOKEN;
const mockBot = new TelegramBot(botToken, { polling: true, filepath: false });

mockBot.onText(
  /\/(mock)/,
  ({ from, chat: { id: chatId }, reply_to_message: reply }) => {
    if (typeof reply !== "undefined") {
      const mockedText = mock(reply.text);
      mockBot.sendMessage(chatId, mockedText);
    } else {
      mockBot.sendMessage(
        chatId,
        mock(`Vergeet je niet iets, ${from.first_name}?`)
      );
    }
  }
);

mockBot.on("inline_query", e => {
  const mockedText = e.query.length ? mock(e.query) : mock("Type something!");
  const answer = [
    {
      type: "article",
      id: String(Math.floor(Math.random() * 10000000000)),
      title: mock("KLIK HIER TRISTAN"),
      input_message_content: {
        message_text: mockedText,
        parse_mode: "Markdown"
      },
      description: mockedText
    }
  ];
  mockBot.answerInlineQuery(e.id, answer);
});

mockBot.on("polling_error", console.error);
