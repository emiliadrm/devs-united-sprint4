import React, { useContext, useEffect } from "react"
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
import UserProfile from "./pages/UserProfile"
import FeedPage from "./pages/FeedPage"
import ConfigPage from "./pages/ConfigPage"


function App() {

  const context = useContext(AppContext)
 
  // OBTENER INFORMACION DE LOS TWEETS INDIVIDUALMENTE
  useEffect(() => {

    const unsubscribe = firestore.collection("tweets"); // Para desuscribirse y no se actualiza a cada rato

    console.log('Se debe ejecutar una sola vez 1');

    firestore.collection("tweets").onSnapshot((snapshot) => {
      const result = [];
      snapshot.forEach((d) => {
        const data = {
          id: d.id,
          ...d.data(),
        }
        result.push(data);
      });
      const tweets = result.map((doc) => {
        return {
          id: doc.id,
          uid: doc.uid,
          username: doc.username,
          photoURL: doc.photoURL,
          email: doc.email,
          color: doc.color,
          likes: doc.likes,
          tweetMessage: doc.tweetMessage,
        };
      })
      console.log('Se debe ejecutar una sola vez cada vez que actualiza/crea un tweet', result);
      console.log(tweets)
      context.setMessages(tweets);
    });
    auth.onAuthStateChanged((user) => {
      context.setUser(user); // user.uid
    });
    return unsubscribe;
  }, []); //eslint-disable-line
 
  
  // OBTENER INFORMACION DEL PERFIL LOGEADO
  useEffect(() => {

    const unsubscribe = firestore.collection("profile");

    firestore.collection("profile").onSnapshot((snapshot) => {
      const result2 = [];
      snapshot.forEach((d) => {
        const data = {
          uid: d.id,
          ...d.data(),
         }
         result2.push(data);
      });
        const profilesFromDB = result2.map((doc) => {
          return {
            uid: doc.id,
            id: doc.id,
            photoURL: doc.photoURL,
            email: doc.email,
            username: doc.username,
            color: doc.color,
            likes: doc.likes
          };
        });
        context.setProfiles(profilesFromDB);
        console.log('EXECUTE', profilesFromDB);
    });
    return unsubscribe;
  }, []); //eslint-disable-line 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        {context.user ? (<>
          <Route path="/" element={<FeedPage/>}/>
          <Route path="/home" element={<FeedPage/>}/>
          <Route path="/settings" element={<ConfigPage />} />
          <Route path="/user/:username" element={<UserProfile/>} />   
        </>) : <Route path="/" element={<LoginPage/>}/>} 
        <Route path="*" element={(<div>Not Found Page</div>)} />
      </Routes>
    </div>
  );
} 


export default App;