import { useContext, useEffect } from "react"

/*ESTILOS*/
import './styles/style.css';
import './styles/desktop.css';
import './styles/mobile.css';

/*CONTEXTO Y FIREBASE CONECTION*/
import { firestore, auth } from "./firebase";
import { AppContext } from "./context/AppProvider"




export default function DataAPI() {

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
    }, );
  
    /* const handleButton = (e) => {
      e.preventDefault();
      firestore.collection("tweets").add(context.messages);
    }*/
}