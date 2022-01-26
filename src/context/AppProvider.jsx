import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  const [tweetM, setTweetM] = useState({ tweetMessage: "" ,uid: "", id: "", color: "", username: "", email:"", photoURL: "", likes: []});
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: "", color: "", uid: "", photoURL: "", email:""});


    return (
      <AppContext.Provider value={{ profile, setProfile, messages, setMessages, tweetM, setTweetM, user, setUser}}>
        {props.children}
      </AppContext.Provider>
    );
  }