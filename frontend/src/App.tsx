import React, { useState, useEffect, useRef  } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as blazeface from "@tensorflow-models/blazeface";
import "./App.css";

function App() {
  const image12 = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  let ctx = CanvasRenderingContext2D
  const [image, setImage] = useState("");
  const [messages, setMessage] = useState("");

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



  async function main() {
    
    const model = await blazeface.load();
    const img = document.getElementById("img") as HTMLImageElement;
   
  
    const returnTensors = false; 
    const predictions = await model.estimateFaces(img, returnTensors);
    if (predictions.length) {
      console.log(predictions);
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
        <img className="imageStyle" src={image} id="img" alt="Images from raspberry" ref={image12} crossOrigin='anonymous' />
        <canvas className="imageStyle"  ref={canvas}/>
      </div>
      <div className="center" >
        <button  className="button button2" onClick={takePhoto}> take photo</button>
        <button className="button button2" onClick={fetchImage}>  see Photo</button>
        <button className="button button2" onClick={take60s}>  Take photo every 60s</button>
        <button  className="button button2"onClick={stop60s}>  stop</button>
        <button  className="button button2"onClick={main}>  machine</button>
      </div>
      <div className="center"><p>{messages}</p></div>
    </div>
  );
}

export default App;
