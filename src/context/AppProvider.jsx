import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  const [tweetM, setTweetM] = useState({ tweetMessage: "" });
  //const [user, setUser] = useState(null);

    return (
      <AppContext.Provider value={{ messages, setMessages, tweetM, setTweetM}}>
        {props.children}
      </AppContext.Provider>
    );
  }