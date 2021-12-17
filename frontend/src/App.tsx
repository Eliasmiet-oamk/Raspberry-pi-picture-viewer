import React, { useState, useEffect  } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as blazeface from "@tensorflow-models/blazeface";
import "./App.css";

function App() {
  const [image, setImage] = useState("");
  const [messages, setMessage] = useState("");
  const [hidden,setHidden] = useState(false)
  const img = document.getElementById("img") as HTMLImageElement;
  useEffect(() => {
    fetchImage();
  }, []);

  function takePhoto() {
    fetch("http://localhost:8000/picture").then(async res => { 
      try {
          const jsonRes = await res.json();
  
          if (res.status !== 200) {
             
              setMessage("Error");
              
          } else {
              setMessage(   jsonRes.message)
          }
      } catch (err) {
          console.log(err);
      };
  }).catch (err => {console.log(err);setMessage("Error");})
  }

   function fetchImage() {
     fetch("http://localhost:8000/images").then(async data => { 
      try {
          if (data.status !== 200) {
             
              setMessage("Error");
              
          } else {
            setImage(`${data.url}?${new Date().getTime()}`)
            setMessage("Picture from raspberry")
          }
      }catch (err) {
          console.log(err);
      };
  }).catch (err => {console.log(err);setMessage("Error");})
  }

  function take60s() {
    fetch("http://localhost:8000/picture60s").then(async res => { 
      try {
          const jsonRes = await res.json();
  
          if (res.status !== 200) {
             
              setMessage("Error");
              
          } else {
              setMessage(   jsonRes.message)
          }
      } catch (err) {
          console.log(err);
      };
  }).catch (err => {console.log(err);setMessage("Error");})
  }

  function stop60s(){
    fetch("http://localhost:8000/stop60s")
  }



  async function faceDetection() {
    const model = await blazeface.load();
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    const returnTensors = false; 
    const predictions = await model.estimateFaces(img, returnTensors);
    if (predictions.length > 0) {
      
      ctx.drawImage(img,0,0)
      for (let i = 0; i < predictions.length; i++) {
      const start : any = predictions[i].topLeft;
      const end : any = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
 
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(start[0], start[1], size[0], size[1]);
      setMessage("Face detected")
    }
   }else{
    setMessage("No face detected")
    setHidden(false)
   }
  }
  
  
  

  return (
    <div className="background">
      <header className="centerHeader"  >
        <div className="div-header">
     <p >Raspberry pi camera viewer </p>
       </div>
      </header>
      <div ></div>
      <div className="center">
       { !hidden ? <img  src={image} id="img"  className="imageStyle2"  alt="Images from raspberry"  crossOrigin='anonymous'  /> : <canvas  id="canvas"  className="imageStyle2" width={640} height={480}/> }
      </div>
      <div className="center"><p>{messages}</p></div>
      <div className="center" >
        <button  className="button button2" onClick={takePhoto}> take photo</button>
        <button className="button button2" onClick={() => { setHidden(false); fetchImage();}}>  see Photo</button>
        <button className="button button2" onClick={take60s}>  Take photo every 60s</button>
        <button  className="button button2"onClick={stop60s}>  stop</button>
        <button  className="button button2" onClick={() => { setHidden(true); faceDetection();}}>  Face detection</button>
      </div>
    </div>
  );
}

export default App;
