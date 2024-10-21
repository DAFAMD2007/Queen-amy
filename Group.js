// Import necessary modules
const { MessageMedia } = require('whatsapp-web.js');

// Export group features as a module
module.exports = (client) => {

    // Welcoming new members to the group
    client.on('group_join', async (notification) => {
        const chat = await notification.getChat();
        const contact = await notification.getContact();

        if (chat.isGroup) {
            chat.sendMessage(`👑 Welcome, *${contact.pushname || "new member"}*! Queen Amy is at your service. 🤖 Feel free to ask me for help!`);
        }
    });

    // Farewell message for members who leave
    client.on('group_leave', async (notification) => {
        const chat = await notification.getChat();
        const contact = await notification.getContact();

        if (chat.isGroup) {
            chat.sendMessage(`👑 Goodbye, *${contact.pushname || "member"}*! It was a pleasure having you. 👋`);
        }
    });

    // Handling commands in group chat
    client.on('message', async (msg) => {
        const chat = await msg.getChat();

        if (chat.isGroup) {
            const command = msg.body.toLowerCase();

            switch (true) {
                // Group Information
                case command === '!groupinfo':
                    const { name, description, participants } = chat;
                    msg.reply(`👑 *Group Name*: ${name}\n📋 *Description*: ${description}\n👥 *Participants*: ${participants.length}`);
                    break;

                // Kick out a member (Admin Only)
                case command.startsWith('!kick '):
                    if (msg.fromMe || chat.participants.find(participant => participant.id._serialized === msg.author && participant.isAdmin)) {
                        let number = command.split(' ')[1];
                        if (number) {
                            number = `${number}@c.us`;
                            chat.removeParticipants([number]).then(() => {
                                msg.reply(`👑 *${number}* has been banished from the group! 🚫`);
                            }).catch(() => {
                                msg.reply(`👑 I couldn't remove *${number}*. Make sure the number is correct, and I'm an admin.`);
                            });
                        } else {
                            msg.reply(`👑 Please specify the number to kick. Example: *!kick 1234567890*`);
                        }
                    } else {
                        msg.reply(`👑 Only an admin can use this command.`);
                    }
                    break;

                // Create a poll in the group
                case command.startsWith('!poll '):
                    const pollDetails = command.replace('!poll ', '').split('|');
                    if (pollDetails.length > 1) {
                        let pollMessage = `👑 *Queen Amy Poll*\n\n${pollDetails[0]}\n`;
                        pollDetails.slice(1).forEach((option, index) => {
                            pollMessage += `\n${index + 1}. ${option.trim()}`;
                        });
                        pollMessage += `\n\n*Reply with the option number to vote!*`;
                        chat.sendMessage(pollMessage);
                    } else {
                        msg.reply(`👑 Invalid poll format. Use: *!poll Question | Option1 | Option2 | Option3*`);
                    }
                    break;

                // Fun fact command
                case command === '!funfact':
                    const funFacts = [
                        "Did you know? The shortest war in history lasted only 38 minutes!",
                        "Honey never spoils. Archaeologists have found pots of honey over 3,000 years old in ancient Egyptian tombs.",
                        "Bananas are berries, but strawberries are not!",
                        "A group of flamingos is called a 'flamboyance'.",
                        "Octopuses have three hearts. 🐙"
                    ];
                    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
                    msg.reply(`👑 *Fun Fact*: ${randomFact}`);
                    break;

                // Unknown command handler
                default:
                    if (command.startsWith('!')) {
                        msg.reply(`👑 I didn't quite understand that command. Type *!help* to see what I can do!`);
                    }
            }
        }
    });

    // Greet when added to a new group
    client.on('group_update', async (notification) => {
        const chat = await notification.getChat();
        if (notification.type === 'add') {
            chat.sendMessage(`👑 *Greetings, Everyone!* Queen Amy has arrived to serve this group. 🏰 Type *!help* to see how I can assist!`);
        }
    });
};
