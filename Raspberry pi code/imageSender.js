const mqtt = require("mqtt");
const Raspistill = require('node-raspistill').Raspistill;
const crypto = require("crypto"); 

const client = mqtt.connect("", {   
        username: "",  
        password: "",   
      }); 



      
const raspistill = new Raspistill({
  width: 640,
  height: 480,
  noFileSave: true,
  encoding: 'jpg'
});




function takeImage() { 
    raspistill 
        .timelapse(5000, 0, function(image) { 
            const imageData = { 
                data: { 
                    image: image, 
                    id: crypto.randomBytes(8).toString("hex") 
                }, 
            }; 
 
            client.publish("image", JSON.stringify(imageData)); 
            console.log( JSON.stringify(imageData)); 

        }) 
      

} 

takeImage()