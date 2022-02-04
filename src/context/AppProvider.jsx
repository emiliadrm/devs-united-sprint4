import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [favoriteCounter, setFavoriteCounter] = useState([]);


    return (
      <AppContext.Provider value={{ profiles, setProfiles, messages, setMessages, user, setUser, favoriteCounter, setFavoriteCounter}}>
        {props.children}
      </AppContext.Provider>
    );
  }