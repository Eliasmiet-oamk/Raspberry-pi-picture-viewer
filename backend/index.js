
require('dotenv').config()
const fs = require('fs')
const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');
const mongoose = require('mongoose')






const app = express();
app.use(cors());



mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


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
        const image = Buffer.from(message.data.image, 'utf8');
        const id = message.data.id
        const filename = 'image.jpg';
        fs.writeFile(__dirname + '/image/' + filename, image, { encoding: 'binary' }, function(err) {
            if (err) {
                console.log('save failed', err);
            } else {
                console.log('saved');
            }
        });


        delete message.data.image;
        message.data.filename = filename;
        



   })


      app.get('/images', function(req, res, next) {
        const filename = 'image.jpg';
        const streamDir = __dirname + '/image/';
        const img = streamDir + filename;
        fs.exists(img, function(exists) {
        	if (exists) {
                return res.sendFile(img);
            } else {
                
                return res.json({message:"nothing to send"})
            }
        });
    });


    app.get('/picture', function(req, res) {
    client.publish("start", JSON.stringify("lol"));
    res.json({ message: "works" })
    console.log("hey!")
    })

app.listen(8000, function() {
    console.log("Server listen on port 8000")
});