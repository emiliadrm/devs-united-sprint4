import React, { useContext, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

/*ESTILOS*/
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';
import './pages/pages-css/user.css';
import './pages/pages-css/feed.css';
import './pages/pages-css/login.css';
import './pages/pages-css/config.css';
import './pages/pages-css/notfoundy.css';
import './components/style-components.css';
import './pages/pages-css/loading.css';

/*CONTEXTO Y FIREBASE CONECTION*/
import { firestore, auth } from "./firebase";
import { AppContext } from "./context/AppProvider"

/*IMPORTACION DE PAGINAS PARA LAS RUTAS*/
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import FeedPage from "./pages/FeedPage";
import ConfigPage from "./pages/ConfigPage";
import NotFound from "./pages/NotFound";
import SettingPage from "./pages/SettingPage";


function App() {

  const { user, setUser, setMessages, setProfiles, setFavoriteCounter} = useContext(AppContext)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user); // user.uid
    });
  }, []) //eslint-disable-line

  // Estoy usando "//eslint-disable-line" para evitar el warning de la falta de dependencia
  // Sin embargo, no necesito que se ejecute el UseEffect tantas veces, ya que me provoco errores de loops infinito en firebase
  // Haciendo que se limite mi uso de firebase. Hay funciones estables que no necesitan un listening constante.
 
  // OBTENER INFORMACION DE LOS TWEETS INDIVIDUALMENTE
  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore.collection("tweets")
      .onSnapshot((snapshot) => {
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
          photoURL: doc.photoURL,
          email: doc.email,
          color: doc.color,
          likes: doc.likes,
          unixDate: doc.unixDate,
          tweetMessage: doc.tweetMessage,
        };
      })
      setMessages(tweets);
    });
    return unsubscribe;
  }, [user]);  //eslint-disable-line 

  
  
  // OBTENER INFORMACION DEL PERFIL LOGEADO
  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore.collection("profile")
      .onSnapshot((snapshot) => {
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
        setProfiles(profilesFromDB);
    });
    return unsubscribe;
  }, [user]); //eslint-disable-line

  // OBTENER INFORMACION DE LIKES
  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore
      .collection("favorites")
      .onSnapshot((snapshot) => {
        const result3 = [];
        snapshot.forEach((d) => {
          const data = {
            uid: d.id,
            ...d.data(),
          }
          result3.push(data);
        });
        const counterFavoriteLikes = result3.map((doc) => {
          return {
            userUID: doc.userUID, 
            tweetLikeID: doc.tweetLikeID,
          };
        });
        setFavoriteCounter(counterFavoriteLikes);
      });
    return unsubscribe;
  }, [user]); //eslint-disable-line 

  return (
    <div className="App">
      <Routes>
        {user ? (<>
          <Route path="/" element={<FeedPage/>}/>
          <Route path="/home" element={<FeedPage/>}/>
          <Route path="/inital-setting" element={<ConfigPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/user/:username" element={<UserProfile/>} />   
        </>) : <Route path="/" element={<LoginPage/>}/>} 
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
} 


export default App;