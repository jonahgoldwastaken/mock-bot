process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api')

const botToken = process.env.TELEGRAM_TOKEN
const mockBot = new TelegramBot(botToken, {polling: true});

const mapCharArray = (total = '', val) => {
    if (!total.length) return val
    else if (total[total.length - 1] === total[total.length - 1].toUpperCase()) return total.concat(val)
    else if (Math.random() < .7) return total.concat(val.toUpperCase())
    else return total.concat(val)
}

const mockifyText = text => text
    .split('')
    .reduce(mapCharArray)

mockBot.onText(/\/(mock|auti) (.+)/, ({ text, chat: { id: chatId }}) => {
    const mockedText = mockifyText(text.substring(6))
    mockBot.sendMessage(chatId, mockedText)
})

mockBot.on('inline_query', e => {
    const mockedText = e.query.length ? mockifyText(e.query) : mockifyText('Type something!')
    const answer = [{
        type: 'article',
        id: '1',
        title: mockifyText('Mocked text'),
        input_message_content: {
            message_text: mockedText,
            parse_mode: 'Markdown'
        },
        description: mockedText
    }]
    mockBot.answerInlineQuery(e.id, answer)
})

mockBot.on('polling_error', console.error)
