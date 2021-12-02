import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';
import { firestore } from "./firebase";
import LoginPage from "./pages/LoginPage";
import Perfil from "./pages/UserProfile"
import Feed from "./pages/FeedPage"
import Config from "./pages/ConfigPage"

function App() {
const [message, setMessage] = useState([]);
const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('DEBUG');
    setTimeout(() => {
      setMessage('Hola');
    }, 5000);
    /*
    firestore.collection("tweets")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        setMessage(doc.data());
      })
    })    
    */
  }, [message]);

  /*console.log('TESTING');
  console.log('MENSAJE',message);*/

  const handleButton = (e) => {
    e.preventDefault();
     firestore.collection("tweets").add(message);
    }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/feed" element={<Feed handleButtonTweet={handleButton}/>} />
        <Route path="/config" element={<Config />} />
    </Routes>
    </div>
  );
}


export default App;