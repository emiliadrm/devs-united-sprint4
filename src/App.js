import React, { useEffect, useState } from "react"
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';
import { firestore } from "./firebase";
import LoginPage from "./pages/LoginPage";

function App() {
const [message, setMessage] = useState([]);

  useEffect(() => {
    firestore.collection("tweets")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        /*console.log(doc.data());*/
        setMessage(doc.data());
      })
    })    
  }, [message]);

  /*console.log('TESTING');
  console.log('MENSAJE',message);*/

  return (
    <div className="App">
      < LoginPage />
    </div>
  );
}

export default App;
