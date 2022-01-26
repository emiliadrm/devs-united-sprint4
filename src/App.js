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
import Perfil from "./pages/UserProfile"
import Feed from "./pages/FeedPage"
import Config from "./pages/ConfigPage"


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
      context.setUser(user);
    });
    return unsubscribe;
  }, []);
 
  
  // OBTENER INFORMACION DEL PERFIL LOGEADO
  useEffect(() => {

    const unsubscribe = firestore.collection("profile");

    firestore.collection("profile").onSnapshot((snapshot) => {
      const result2 = [];
      snapshot.forEach((d) => {
        const data = {
          uid: d.uid,
          ...d.data(),
         }
         result2.push(data);
      });
        const profile = result2.map((doc) => {
          return {
            uid: doc.uid,
            id: doc.id,
            photoURL: doc.photoURL,
            email: doc.email,
            username: doc.username,
            color: doc.color,
            likes: doc.likes
          };
        });
        context.setProfile(profile);
        console.log('EXECUTE', profile);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        {context.user ? (<>
          <Route path="/home" element={<Feed/>}/>
          <Route path="/settings" element={<Config />} />
          <Route path="/user/:username" element={<Perfil/>} />   
        </>) : <Route path="/" element={<LoginPage/>}/>} 
        <Route path="*" element={(<div>Not Found Page</div>)} />
      </Routes>
    </div>
  );
} 


export default App;