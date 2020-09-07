const Discord = require('discord.js');
const client = new Discord.Client();
const command = require('./command')
const welcome = require('./welcome')
const mute = require('./mute')

client.on('ready', () => {
    console.log('Logged in!')
    client.user.setPresence({
        activity: {
            name: 'Say +help for help!',
            type: 0,
        }
    })

    welcome(client)
    mute(client)

    command(client, 'test', message => {
        message.channel.send('Test concluded.')
    })

    command(client, 'kick', message => {
        const { member, mentions } = message

        if (member.hasPermission("ADMINISTRATOR") ||
            member.hasPermission("KICK_MEMBERS")
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${target} got kicked.`)


            } else {
                message.channel.send(`<@${member.id}> You need to mention someone to kick.`)
            }
        } else {
            message.channel.send(`<@${member.id}> You don't have the permission to preform that command. If you think this is a mistake please contact an Server Administrator.`)
        }
    })

    command(client, 'ban', message => {
        const { member, mentions } = message

        if (member.hasPermission("ADMINISTRATOR") ||
            member.hasPermission("BAN_MEMBERS")
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${target} got banned.`)


            } else {
                message.channel.send(`<@${member.id}> You need to mention someone to ban.`)
            }
        } else {
            message.channel.send(`<@${member.id}> You don't have the permission to preform that command. If you think this is a mistake please contact an Server Administrator.`)
        }
    })

    command(client, 'help', message => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setColor(4836355)
            .setDescription("This is the help command.")
            .addField("+ban (mention)", "This command will ban a member!", true)
            .addField("+kick (mention)", "This command will kick a member for you!", true)
            .addField("+mute (mention) (time) (time format m, h, d, life)", "This command will mute a member for you. (need Muted role created)", true)
            .setFooter("This bot was created to the Glide server.")
        message.channel.send(embed)
    })

    command(client, 'setwebhook', message => {

        const { channel, member } = message

        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('MANAGE_WEBHOOKS')) {
            channel.createWebhook('Event Webhook', {
                avatar: 'https://media.discordapp.net/attachments/746709876859863180/747104344293244959/glide.jpg',
            }).then(webhook => console.log(`Created webhook ${webhook}`)).catch(console.error);
        }
    })

    command(client, 'revival', async message => {

        const { member } = message
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('MANAGE_WEBHOOKS')) {
            //100 Member Special EVENT!
            // Art and story writing contest
            // How will you enter?
            //  DM me your art and stories and I will review them. The ones I liked the most will win a prize(later announced).
            const embed = new Discord.MessageEmbed()
                .setTitle('Revival Chat')
                .setColor('#0099ff')
                .addField('Howdy there fellars Humans!', "Wanna some1 talk in chat?")
                .setFooter('Thanks!!', 'https://media.discordapp.net/attachments/746709876859863180/747104344293244959/glide.jpg')


            const { channel } = message
            try {
                const webhooks = await channel.fetchWebhooks();
                const webhook = webhooks.first();

                await webhook.send('Revival', {
                    username: 'Glide',
                    avatarURL: 'https://media.discordapp.net/attachments/746709876859863180/747104344293244959/glide.jpg',
                    embeds: [embed],
                });
            } catch (error) {
                console.error('Error trying to send: ', error);
            }
        }
    })
})

command(client, 'send', async message => {

    const { member } = message
    if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('MANAGE_WEBHOOKS')) {
        //100 Member Special EVENT!
        // Art and story writing contest
        // How will you enter?
        //  DM me your art and stories and I will review them. The ones I liked the most will win a prize(later announced).
        const embed = new Discord.MessageEmbed()
            .setTitle('Bored')
            .setColor('#0099ff')
            .addField('I love to be bored.', "Yeet!! Lets be bored")
            .setFooter('Boredom.', 'https://media.discordapp.net/attachments/746709876859863180/747104344293244959/glide.jpg')


        const { channel } = message
        try {
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();

            await webhook.send('Bored', {
                username: 'Glide',
                avatarURL: 'https://media.discordapp.net/attachments/746709876859863180/747104344293244959/glide.jpg',
                embeds: [embed],
            });
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
})


client.login(process.env.token)