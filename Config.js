const fs = require('fs');
const { color } = require('./lib/myfunc');

// Owner Information
global.owner = '94724087485';
global.nomerowner = ["94724087485"];

// API Keys
global.skizo = 'Queen Amy';
global.casterix = 'AmyTheQueen';

// Watermark
global.packname = '*QUEEN AMY*';
global.author = 'king vic';

// Control Panel
global.domain = 'https://'; // Custom domain
global.apikey2 = 'queenapi'; // Queen Amy's API key
global.capikey2 = 'amyxqueen'; // Alternative API key
global.eggsnya = '10'; // Egg ID, keep as is unless specified
global.location = '1'; // Location ID, keep as is

global.apilinode = ''; // VPS Account Linode API Key
global.apitokendo = ''; // Optional

// Database Configuration
global.urldb = ''; // Leave empty or use MongoDB URL if needed

// Initial Limits & Settings
global.limitawal = {
    premium: "Unlimited",
    monayawal: 0,
    free: 200
};

// RPG Configuration
global.buruan = {
    fish: 7,
    chicken: 7,
    rabbit: 7,
    sheep: 7,
    cow: 7,
    elephant: 7
};
global.rpg = {
    healthInitial: 120,
    energyInitial: 300,
    ironInitial: 7,
    goldInitial: 2,
    emeraldInitial: 2,
    baitInitial: 2,
    potionInitial: 2
};

// Auto Features
global.autoTyping = true ;        // Enable auto typing when true
global.autoRecord = true ;        // Enable auto recording when true
global.autoViewStatus = true;     // Enable viewing statuses when true
global.unavailable = true;        // Show as unavailable when true
global.available = false;         // Show as always online when true
global.autoreadmessages = false;  // Auto read messages when true
global.chatbot = false;           // Enable chatbot when true
global.autoreact = false;         // Auto react to messages when true

// Community Settings
global.welcome = true ;           // Enable welcome messages when true

// General Configuration
global.prefix = '/';              // Command prefix
global.autobio = false;           // Enable auto bio when true

// Anti-Link Settings
global.antilink = false;          // Enable anti-link when true
global.antilinkkick = false;      // Kick users who share links when true
global.antilinkwarn = false;      // Warn users who share links when true

// Other Protections
global.antibot = false;           // Enable anti-bot when true

// Monitor & Update
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(color(`Update Detected: '${__filename}'`));
    delete require.cache[file];
    require(file);
});
