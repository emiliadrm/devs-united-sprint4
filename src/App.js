import React, { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { firestore } from "./firebase"

function App() {
const [message, setMessage] = useState([]);

  useEffect(() => {
    firestore.collection("tweets")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        setMessage(doc.data());
      })
    })    
  }, [message]);

  console.log('TESTING');
  console.log('MENSAJE',message);

  return (
    <div className="App">
      <div>
        <p>Este es un mensaje</p>
        <p>{message.tweet}</p>
        <p>{message.mensaje}</p>
      </div>
    </div>
  );
}

export default App;
