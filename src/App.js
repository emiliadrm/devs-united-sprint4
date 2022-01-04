import React, { useContext, useEffect, /*useState*/ } from "react"
import { Route, Routes } from "react-router-dom"

/*ESTILOS*/
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';

/*CONTEXTO Y FIREBASE CONECTION*/
import { firestore, auth } from "./firebase";
import { AppContext } from "./context/AppProvider"

/*IMPORTACION DE PAGINAS PARA LAS RUTAS*/
import LoginPage from "./pages/LoginPage";
import Perfil from "./pages/UserProfile"
import Feed from "./pages/FeedPage"
import Config from "./pages/ConfigPage"


function App() {
  const context = useContext(AppContext)
 
   useEffect(() => {
     const unsubscribe = firestore.collection("tweets")
     .onSnapshot((snapshot) => {
       const tweets = snapshot.docs.map((doc) => {
         return {
           user: doc.data().user,
           color: doc.data().color,
           likes: doc.data().likes,
           tweetMessage: doc.data().tweetMessage,
           id: doc.id
         };
       });
      auth.onAuthStateChanged((user) => {
         context.setUser(user);
         console.log(user); });
       context.setMessages(tweets);

     });
     return unsubscribe;
   }, []);
 
    const handleButton = (e) => {
     e.preventDefault();
     firestore.collection("tweets").add(context.messages);
   }

  return (
    <div className="App">
      <Routes>
        {context.user ? (<Route path="/" element={<Feed handleButton={handleButton}/>}/>) 
        : 
        (<Route path="/" element={<LoginPage />} />)}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </div>
  );
}


export default App;