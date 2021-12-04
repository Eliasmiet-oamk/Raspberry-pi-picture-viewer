import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchImage();
  }, []);

  function takePhoto() {
    fetch("http://localhost:8000/picture");
  }

  function fetchImage() {
    fetch("http://localhost:8000/images").then((data) =>
      setImage(`${data.url}?${new Date().getTime()}`)
    );
  }

  return (
    <div>
      <header className="center">
        <h1>Picture from raspberry</h1>
      </header>
      <div className="center"></div>
      <div className="center">
        <img src={image} alt="Images from raspberry" />
      </div>
      <div className="center">
        <button onClick={takePhoto}> take photo</button>
        <button onClick={fetchImage}>  see Photo</button>
      </div>
    </div>
  );
}

export default App;
