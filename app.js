const Discord = require('discord.js');
const bot = new Discord.Client();

var TOKEN = 'NjkyODI2NzIyNzgwODQwMDc4.Xn0LKg.W0ydUR179xToztFevo1FAv43QvY';

bot.login(TOKEN);
const request = require('request');
const logger = require(__dirname + '/util/logger');
const fs = require('fs');

const triesPerSecond = 0.0;

var working = [];

getGiftCode = function () {
    let code = '';
    let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(var i = 0; i < 19; i++){
        code = code + dict.charAt(Math.floor(Math.random() * dict.length));
    }
    return code;
}

checkCode = function (code) {
    request(`https://discord.com/api/v6/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, (error, res, body) => {
        if(error){
            logger.error(`Hata: ${error}`);
            return;
        }
        try {
            body = JSON.parse(body);
            if(body.message != "You are being rate limited."){
                logger.info(`Çalışan Kod Bulundu: https://discord.gift/${code}`);
                console.log(JSON.stringify(body, null, 4));
                working.push(`https://discord.gift/${code}`);
                fs.writeFileSync(__dirname + '/codes.json', JSON.stringify(working, null, 4));
                client.users.get('515307844900487188').send('I think this code works: https://discord.gift/${code}');
            }
            else {
                logger.info(`${code} geçersiz`);
            }
        }
        catch (error) {
            logger.error(`Hata:`);
            logger.error(error);
            return;
        }
    });
}
logger.info(`NitroGEN By GianC-Dev`);
logger.info(`Her saniye kod üretiyor.`)
logger.info(`-------------------------------------\n`);

checkCode(getGiftCode());
setInterval(() => {
    checkCode(getGiftCode());
}, (1/triesPerSecond) * 100);
