import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  //const [user, setUser] = useState(null);

  console.log('MENSAJE', messages);
    return (
      <AppContext.Provider value={{ messages, setMessages}}>
        {props.children}
      </AppContext.Provider>
    );
  }