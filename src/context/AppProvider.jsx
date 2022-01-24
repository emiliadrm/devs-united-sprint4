import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider(props) {
  const [messages, setMessages] = useState([]);
  const [tweetM, setTweetM] = useState({ tweetMessage: "" , uid: "", color: "", username: ""});
  const [pickColor, setPickColor] = useState({ color: ""});
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: "", uid: "", mail: "", color: ""});

    return (
      <AppContext.Provider value={{ profile, setProfile, messages, setMessages, tweetM, setTweetM, pickColor, setPickColor, user, setUser}}>
        {props.children}
      </AppContext.Provider>
    );
  }

  export const colorList = [
      { name: "rojo", hex: "#F50D5A" },
      { name: "naranja", hex: "#FF865C" },
      { name: "amarillo", hex: "#FFEA5C" },
      { name: "verde", hex: "#00DA76" },
      { name: "azul", hex: "#0096CE" },
      { name: "purpura", hex: "#800FFF" }
  ];