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
  })
  }

  function fetchImage() {
    fetch("http://localhost:8000/images").then((data) =>
      setImage(`${data.url}?${new Date().getTime()}`)
    );
  }

  return (
    <div>
      <header className="centerHeader">
        <h1>Picture from raspberry</h1>
      </header>
      <div className="center"></div>
      <div className="center">
        <img className="imageStyle" src={image} alt="Images from raspberry" />
      </div>
      <div className="center">
        <button onClick={takePhoto}> take photo</button>
        <button onClick={fetchImage}>  see Photo</button>
      </div>
      <div className="center"><p>{messages}</p></div>
    </div>
  );
}

export default App;
