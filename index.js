const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios');
const countries = require("./countries.json");
const url = 'https://api.covid19api.com/total/country/';


const prefix = ">"

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag} :)`);
});

bot.on('message', async (message) => {

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let com = command.toLowerCase();
    let content = message.content.split(/[ ,]+/);

    if (message.author.bot) return;
    //Will return if the user is a bot
    //if(message.author.id === client.user.id) return; This is gonna return if the message author is the bot, it will keep going if its another bot.

    if (message.channel.type === "dm") return;
    //Return if its a dm to the bot

    if (com === `${prefix}covid`) {
        if (content.length > 2) {
            message.reply("Too many arguments")
        }
        else if (content.length === 1) {
            message.reply(`Specify a country`)
        }
        else if (!countries[content[1]]) {
            message.reply("Country not found")
        }
        else {
            const slug = content[1]
            const payload = await axios.get(`${url}${slug}`)
            const covidData = payload.data.pop();
            var cov = new Discord.MessageEmbed()
                .addField(`**Covid cases for ${content[1]}**`, "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
                .addField(":microbe: Confirmed", `${covidData.Confirmed}`, true)
                .addField(":skull: Deaths", `${covidData.Deaths}`, true)
                .addField(":mask: Recovered", `${covidData.Recovered}`, true)
                .addField(":syringe: Active", `${covidData.Active}`, true)
                .setColor('RANDOM')
                .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`)
                .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "[Stay safe :)](https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public)", false)
            message.channel.send(cov)
                .catch(err => message.reply(`Something went wrong... ${err}`));
        }
        return;
    }
});

bot.login('Njc3ODE3ODAxMTU4Njg4ODA5.XkZxBQ.MXFAzeMyBnn-4n1Lp96WAAYkLt8'); //token goes here, unless your using heroku