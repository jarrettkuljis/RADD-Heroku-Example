const SlackBot = require('slackbots');
const axios = require('axios')
const pingmydyno = require('pingmydyno');
require('dotenv').config();




const bot = new SlackBot({
    token: process.env.TOKEN,
    name: 'sarcasti'
})


// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Get inspired while working with @jarrettkuljis',
        params
    );
})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {

    console.log('DATA TYPE '+data.type);
    console.log('DATA TEXT '+data.text);
    console.log(data);

    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' inspire me')) {
        inspireMe()
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}

// inspire Me
function inspireMe() {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
      .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${quote} - *${author}*`,
                params
            );

      })
}

// Random Joke
function randomJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}

// Show Help
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@sarcasti* with *inspire me* to get a techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}


// Slack App directory submission 302 server
const http = require('http');
const fs = require('fs');
 
http.createServer(function (req, res) {

    console.log(req.url);
    
    if (req.url == '/') {
        res.writeHead(302, { "Location": "https://" + 'slack.com' });
        return res.end();
    } else {
        fs.readFile(req.url.substring(1),
            function(err, data) { 
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
        });
    } 
}).listen(`${process.env.PORT}`, () => {
    pingmydyno('https://happybot-radd-example.herokuapp.com');
});
