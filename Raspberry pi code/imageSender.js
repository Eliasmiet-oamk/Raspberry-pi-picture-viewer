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
client.subscribe("start60s");
client.subscribe("stop60s");

client.on("message", function (topic, message) {
  if (topic === "start") {
    takeImage();
  } else if (topic === "start60s") {
    takeImage60s();
  } else if (topic === "stop60s") {
    return false;
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
      console.log("Image sent");
    })
    .then(function () {
      console.log("end");
    });
}

function takeImage60s() {
  raspistill
    .timelapse(60000, 0, function (image) {
      var imageData = {
        data: {
          image: image,
          id: crypto.randomBytes(8).toString("hex"),
        },
      };

      client.publish("image", JSON.stringify(imageData));
      console.log("Image60s sent");
    })
    .then(function () {
      console.log("end");
    });
}
