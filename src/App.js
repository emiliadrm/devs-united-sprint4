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
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore.collection("tweets")
    .onSnapshot((snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        const valor = doc.data();
        return valor;
      })

      setMessages(tweets);
    });
    return unsubscribe;
  }, []);

   const handleButton = (e) => {
    e.preventDefault();
    firestore.collection("tweets").add(messages);
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