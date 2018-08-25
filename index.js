process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api')

const botToken = process.env.TELEGRAM_TOKEN
const mockBot = new TelegramBot(botToken, {polling: true, filepath: false});

const mapToLowerCase = val => val.toLowerCase()

const mapCharArray = (total = '', val) => {
    if (!total.length) return val
    else if (total[total.length - 1] === total[total.length - 1].toUpperCase()) return total.concat(val)
    else if (Math.random() < .7) return total.concat(val.toUpperCase())
    else return total.concat(val)
}

const mockifyText = text => text
    .split('')
    .map(mapToLowerCase)
    .reduce(mapCharArray)

mockBot.onText(/\/(mock|auti)/, ({from, chat: { id: chatId }, reply_to_message: reply}) => {
    if (typeof reply !== 'undefined') {
        const mockedText = mockifyText(reply.text)
        mockBot.sendMessage(chatId, mockedText)
    } else {
        mockBot.sendMessage(chatId, mockifyText(`Vergeet je niet iets, ${from.first_name}?`))
    }
})

mockBot.on('inline_query', e => {
    const mockedText = e.query.length ? mockifyText(e.query) : mockifyText('Type something!')
    const answer = [{
        type: 'article',
        id: String(Math.floor(Math.random() * 10000000000)),
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
