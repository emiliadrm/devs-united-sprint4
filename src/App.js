import React, { useEffect, useState } from "react"
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';
import { firestore } from "./firebase";
import TextField  from "./components/InputComponent";
import TweetField from "./components/TweetComponent";
import TestComponent from "./TestComponent";

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
      {/*<div>
        <p>Este es un mensaje</p>
        <p>{message.tweet}</p>
        <p>{message.mensaje}</p>
      </div>
      < TextField/>
      < TweetField/>*/}
      < TestComponent />
    </div>
  );
}

export default App;
