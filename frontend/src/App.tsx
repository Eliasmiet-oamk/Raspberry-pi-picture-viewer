import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
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

  return (
    <div className="background">
      <header className="centerHeader"  >
        <div className="div-header">
     <p >Raspberry pi camera viewer </p>
       </div>
      </header>
      <div className="center"></div>
      <div className="center">
        <img className="imageStyle" src={image} alt="Images from raspberry" />
      </div>
      <div className="center" >
        <button  className="button button2" onClick={takePhoto}> take photo</button>
        <button className="button button2" onClick={fetchImage}>  see Photo</button>
        <button className="button button2" onClick={take60s}>  Take photo every 60s</button>
        <button  className="button button2"onClick={stop60s}>  stop</button>
      </div>
      <div className="center"><p>{messages}</p></div>
    </div>
  );
}

export default App;
