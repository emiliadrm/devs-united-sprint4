import React, { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { firestore } from "./firebase";
import TextField  from "./components/InputComponent";
import TweetField from "./components/TweetComponent";

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
      < TextField />
      < TweetField />
    </div>
  );
}

export default App;
