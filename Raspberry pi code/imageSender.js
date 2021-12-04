const mqtt = require("mqtt");
const Raspistill = require("node-raspistill").Raspistill;
const crypto = require("crypto");

const client = mqtt.connect("", {
  username: "",
  password: "",
});

client.on("connect", function () {
  console.log("connected to Mqtt client");
});

client.subscribe("start");

client.on("message", function (topic, message) {
  if (topic === "start") {
    takeImage();
  }
});

const raspistill = new Raspistill({
  width: 640,
  height: 480,
  noFileSave: true,
  encoding: "jpg",
});

function takeImage() {
  raspistill
    .takePhoto()
    .then((image) => {
      const imageData = {
        data: {
          image: image,
          id: crypto.randomBytes(8).toString("hex"),
        },
      };

      client.publish("image", JSON.stringify(imageData));
      console.log(JSON.stringify(imageData));
    })
    .then(function () {
      console.log("end");
    });
}
