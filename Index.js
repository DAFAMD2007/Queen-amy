const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Initialize the WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Generate QR Code for authentication
client.on('qr', (qr) => {
    console.log('👑 Scan this QR code with your WhatsApp to log in as Queen Amy:');
    qrcode.generate(qr, { small: true });
});

// Successful login
client.on('ready', () => {
    console.log('👑 Queen Amy is now ready to rule the WhatsApp kingdom!');
});

// Event listener for incoming messages
client.on('message', async (msg) => {
    const command = msg.body.toLowerCase();

    // Respond to greetings
    if (command === 'hello' || command === 'hi') {
        msg.reply('👑 Greetings! I am Queen Amy. How can I assist you today?');
    }

    // Help command
    else if (command === '!help') {
        msg.reply(`
👑 *Queen Amy Commands* 👑

1. *!help* - Displays this help menu.
2. *!joke* - Get a funny joke to brighten your day.
3. *!quote* - Receive an inspirational quote.
4. *!meme* - Get a random meme.
5. *!remindme <time> <message>* - Set a reminder.
6. *!weather <city>* - Check the weather in your city.
7. *!funfact* - Learn a fun fact.
8. *!gif <search term>* - Get a random GIF.
9. *!motivate* - Receive some motivation!
        `);
    }

    // Joke command
    else if (command === '!joke') {
        const jokes = [
            "Why don’t skeletons fight each other? They don’t have the guts. 😂",
            "I told my wife she should embrace her mistakes. She hugged me. 😆",
            "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾"
        ];
        msg.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    // Quote command
    else if (command === '!quote') {
        const quotes = [
            "“The greatest glory in living lies not in never falling, but in rising every time we fall.” - Nelson Mandela",
            "“The way to get started is to quit talking and begin doing.” - Walt Disney",
            "“Don’t watch the clock; do what it does. Keep going.” - Sam Levenson"
        ];
        msg.reply(quotes[Math.floor(Math.random() * quotes.length)]);
    }

    // Meme command (send an image)
    else if (command === '!meme') {
        const memePath = './memes/meme.jpg'; // Replace with the path to a meme image
        const memeMedia = MessageMedia.fromFilePath(memePath);
        client.sendMessage(msg.from, memeMedia);
    }

    // Fun fact command
    else if (command === '!funfact') {
        const funFacts = [
            "Did you know? The shortest war in history lasted only 38 minutes!",
            "Honey never spoils. Archaeologists have found pots of honey over 3,000 years old in ancient Egyptian tombs.",
            "A single strand of Spaghetti is called a Spaghetto. 🍝"
        ];
        msg.reply(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }

    // GIF command
    else if (command.startsWith('!gif ')) {
        const searchTerm = command.replace('!gif ', '');
        // You would need to use an API like GIPHY to fetch GIFs dynamically
        msg.reply(`👑 Sorry, this feature isn't live yet. Imagine a GIF about *${searchTerm}*!`);
    }

    // Weather command (mock response, replace with real API)
    else if (command.startsWith('!weather ')) {
        const city = command.replace('!weather ', '');
        msg.reply(`👑 The weather in *${city}* is currently sunny with a slight chance of fabulousness. ☀️🌈`);
    }

    // Reminder command (simple, without persistence)
    else if (command.startsWith('!remindme ')) {
        const reminderDetails = command.replace('!remindme ', '').split(' ');
        const time = parseInt(reminderDetails[0], 10);
        const reminderMessage = reminderDetails.slice(1).join(' ');

        if (!isNaN(time) && reminderMessage) {
            msg.reply(`👑 Reminder set for ${time} minutes: "${reminderMessage}"`);
            setTimeout(() => {
                msg.reply(`👑 Reminder: ${reminderMessage}`);
            }, time * 60000);
        } else {
            msg.reply('👑 Please provide a valid time in minutes and a message. Example: *!remindme 5 Take a break*');
        }
    }

    // Motivate command
    else if (command === '!motivate') {
        const motivations = [
            "👑 Believe in yourself. You are braver than you think, stronger than you seem, and smarter than you think.",
            "👑 Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "👑 Your limitation—it’s only your imagination."
        ];
        msg.reply(motivations[Math.floor(Math.random() * motivations.length)]);
    }

    // Unknown command handler
    else if (command.startsWith('!')) {
        msg.reply(`👑 I'm not sure what you mean. Type *!help* to see what I can do!`);
    }
});

// Start the client
client.initialize();
