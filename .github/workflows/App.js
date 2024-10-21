const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const commands = require('./config'); // Importing the commands configuration

// Create a new WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth()
});

// Generate and display QR code for authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code to connect to WhatsApp.');
});

// Confirm connection to WhatsApp
client.on('ready', () => {
    console.log('Queen Amy is now online!');
});

// Listen for incoming messages
client.on('message', (message) => {
    console.log(`Message received from ${message.from}: ${message.body}`);

    // Loop through commands to find a match
    for (const command in commands) {
        const cmd = commands[command];
        if (cmd.trigger.some(trigger => message.body.toLowerCase().includes(trigger))) {
            message.reply(cmd.response);
            return; // Exit after responding to the first matched command
        }
    }

    // Default response for unrecognized messages
    message.reply("I'm not sure how to respond to that, but I'm here to help!");
});

// Handle client authentication
client.initialize();
