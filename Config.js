// config.js

const commands = {
    greet: {
        trigger: ['hello', 'hi', 'hey'],
        response: "Hello! I am Queen Amy, your WhatsApp assistant. How can I help you today?"
    },
    howAreYou: {
        trigger: ['how are you', 'how is it going'],
        response: "I'm just a bot, but I'm here to assist you!"
    },
    help: {
        trigger: ['help', 'commands', 'what can you do'],
        response: "Here are some things I can help you with:\n" +
                  "1. Say 'hello' to greet me.\n" +
                  "2. Ask 'how are you' to check my status.\n" +
                  "3. Type 'joke' for a fun joke!\n" +
                  "4. Ask 'quote' for a motivational quote."
    },
    joke: {
        trigger: ['joke'],
        response: "Why did the scarecrow win an award? Because he was outstanding in his field!"
    },
    quote: {
        trigger: ['quote'],
        response: "Believe you can and you're halfway there. – Theodore Roosevelt"
    },
    goodbye: {
        trigger: ['bye', 'goodbye'],
        response: "Goodbye! Have a great day!"
    }
};

module.exports = commands;
