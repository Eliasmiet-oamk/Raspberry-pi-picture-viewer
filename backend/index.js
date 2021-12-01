
require('dotenv').config()
const fs = require('fs')
const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');




const app = express();
app.use(cors());



const client = mqtt.connect(process.env.CLIENT, { 
        username: process.env.USERN, 
        password: process.env.PASSWD,
      }); 

      client.on('connect', function() {
        console.log('connected to Mqtt client');
      });

  client.subscribe("image") 
  client.on("message", function (topic, message) {
    message = JSON.parse(message.toString()); 
        var image = Buffer.from(message.data.image, 'utf8');
        var filename = 'image.jpg';
        fs.writeFile(__dirname + '/image/' + filename, image, { encoding: 'binary' }, function(err) {
            if (err) {
                console.log('save failed', err);
            } else {
                console.log('saved');
            }
        });
        
  
   })


app.listen(8000, function() {
    console.log("Server listen on port 3001")
});