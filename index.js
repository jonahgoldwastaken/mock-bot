process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api')

const botToken = process.env.TELEGRAM_TOKEN
const mockBot = new TelegramBot(botToken, {polling: true});

const mockifyText = text => text
    .split('')
    .map((val, i) => i % 2 ? val : val.toUpperCase())
    .join('')

mockBot.onText(/\/(mock|auti) (.+)/, ({ text, chat: { id: chatId }}) => {
    const mockedText = mockifyText(text.substring(6))
    mockBot.sendMessage(chatId, mockedText)
})

mockBot.on('inline_query', e => {
    const mockedText = mockifyText(e.query) || 'Type something!'
    const answer = [{
        type: 'article',
        id: '1',
        title: 'MoCkIfIeD tExT',
        input_message_content: {
            message_text: mockedText,
            parse_mode: 'Markdown'
        },
        description: mockedText
    }]
    mockBot.answerInlineQuery(e.id, answer)
})

mockBot.on('polling_error', err => { console.log(err) })
