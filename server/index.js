const chat_id = 611290609;
const token = '679568383:AAGF2_Pr-vjAL1gM2jDDLCgN2Ap3OV-U9eE';
const Telegraf = require('telegraf');
const bot = new Telegraf(token);
bot.start((ctx, otro) => {
  console.log(ctx.chat.id);
  ctx.reply('Welcome')
});
bot.launch();

var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'PvayL616Pht2uS0tF15qpZRX8',
    consumer_secret: 'aEIO5wffBCSNBDXDFve03UCgMYNJwbQ2JuLb7jGrgqvq6zeBu5',
    access_token_key: '1091651314545840129-U89sJ3C2oJ7EYCuAk429m53oKcAbDe',
    access_token_secret: '6T5ZmKPU1UwWuRzD1CGr8cWXb58BOJCy7ezaSoxFlGNf2'
});

var express = require('express');
var app = express();
var bodyParser     =        require("body-parser");
var moment = require("moment");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
    //     if(error) throw error;
    //     console.log(tweet);  // Tweet body.
    //     console.log(response);  // Raw response object.
    //   });
      res.send('Hello world');
});

app.post('/fechas', (req, res)=> {
  //telegram
  let format = "HH:mm",
      dia = moment(req.body.fechaInicio).format("DD/MM/YYYY"),
      inicio = moment(req.body.fechaInicio).format(format),
      fin = moment(req.body.fechaFin).format(format),
      calidad = req.body.calidadAire;
  let msg = 'O mellor momento para correr o día '+ dia + ' é entre as ' + inicio + ' e ' + fin + '. ' + calidad;
  bot.telegram.sendMessage(chat_id, msg);

  // twitter
  client.post('statuses/update', {status:msg}, (err, tweet, res) => {
    if(err) console.log('err', err);
  })
  res.send('ok');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});