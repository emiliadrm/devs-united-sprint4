import React, { useContext, useEffect, /*useState*/ } from "react"
import { Navigate, Route, Routes, useHistory } from "react-router-dom"

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
          username: doc.username,
          uid: doc.uid,
          mail: doc.mail,
          color: doc.color,
          likes: doc.likes,
          tweetMessage: doc.tweetMessage,
          id: doc.id
        };
      })
      console.log('Se debe ejecutar una sola vez cada vez que actualiza/crea un tweet', result);
      console.log(tweets)
      context.setMessages(tweets);
    });
    auth.onAuthStateChanged((user) => {
      context.setUser(user);
      console.log(user);
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
            username: doc.username,
            mail: doc.mail,
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
        <Route path="/" element={() => {
          if (context.user === true && context.profile.color === true && context.profile.username === true) {
            return <Navigate replace to={{pathname:"/home", from: <Feed/>}} />
          } else if (context.user === true && context.profile.color === undefined && context.profile.username === undefined) {
            return <Navigate replace to={{pathname:"/config", from: <Config/>} } />
          }
          return <LoginPage />
      }}/>
        <Route path="/user/:username" element={<Perfil/>} />
        <Route path="*" element={(<div>Not Found Page</div>)} />
      </Routes>
    </div>
  );
}


export default App;


/*
<Route path="/" element={props => {
  if (context.user == true && context.profile.color == true && context.profile.username == true) {
    return <Navigate replace to={{pathname: "/home", state {from: props.Feed }}} />
  } else if (context.user == true && context.profile.color == undefined && context.profile.username == undefined) {
    return <Navigate replace to={{pathname: "/config", state {from: props.Config }}} />
  }
  return <LoginPage />
}} />



*/




/* 
function Prueba () {
  if (context.user == true && context.profile.color == undefined && context.profile.username == undefined) {
    return (<Route path="/" element={<Config />} />)
  } else if (context.user == true && context.profile.color == true && context.profile.username == true) {
    return (<Route path="/" element={<Feed/>}/>)
  } else if (context.user == undefined && context.user == false) {
    return (<Route path="/" element={<LoginPage />} />)
  }
} */



/*
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
*/