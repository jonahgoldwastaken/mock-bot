const TelegramBot = require('node-telegram-bot-api')

const botToken = '669342127:AAFExLVizilRvdZt5O01Ut3KQIns6Q41hkw'
const mockBot = new TelegramBot(botToken, {polling: true});

mockBot.onText(/\/(mock|auti) (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const text = match[1].split('')
    const mockedText = text
        .map((val, i) => i % 2 ? val.toUpperCase() : val)
        .join()
    mockBot.sendMessage(chatId, mockedText)
})
