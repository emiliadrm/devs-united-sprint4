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
 

  // OBTENER INFORMACION DE LOS TWEETS INDIVIDUALMENTE
  useEffect(() => {
    const unsubscribe = firestore.collection("tweets").onSnapshot((snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        return {
          username: doc.data().username,
          uid: doc.data().uid,
          mail: doc.data().mail,
          color: doc.data().color,
          likes: doc.data().likes,
          tweetMessage: doc.data().tweetMessage,
          id: doc.id
        };
      });

      context.setMessages(tweets);
    });
    
    auth.onAuthStateChanged((user) => {
      context.setUser(user);
      console.log(user);
    });
    
    return unsubscribe;
  }, );
 
  

// OBTENER INFORMACION DEL PERFIL LOGEADO
/*   useEffect(() => {
    const unsubscribe = firestore.collection("profile")
    .onSnapshot((snapshot) => {
      const profile = snapshot.docs.map((doc) => {
        return {
          uid: doc.data().uid,
          color: doc.data().color,
          username: doc.data().username,
        };
      });
        context.setProfile(profile);
    });
    return unsubscribe;
  },);*/

  return (
    <div className="App">
      <Routes>
        {context.user ? (<Route path="/" element={<Feed/>}/>) 
        : 
        (<Route path="/" element={<LoginPage />} />)}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </div>
  );
}


export default App;