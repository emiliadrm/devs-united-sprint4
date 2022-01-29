import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo.svg";
import { firestore } from "../firebase";
import { AppContext } from "../context/AppProvider";
import "../styles/style.css";

import { getProfileForUID } from "../helpers";

const colorList = [
    { name: "rojo", hex: "#F50D5A" },
    { name: "naranja", hex: "#FF865C" },
    { name: "amarillo", hex: "#FFEA5C" },
    { name: "verde", hex: "#00DA76" },
    { name: "azul", hex: "#0096CE" },
    { name: "purpura", hex: "#800FFF" }
];

export default function ConfigPage() {

    const navigate = useNavigate();
    const { user, profiles } = useContext(AppContext);

     // si no esta logueado {}, si esta logueado trae info del usuario
    const loggedUserProfile = getProfileForUID(profiles, user?.uid)

    const [ newUsername, setNewUsername ] = useState(loggedUserProfile.username ?? '');
    const color = loggedUserProfile.color ? loggedUserProfile.color : colorList[0];
    const [ pickColor, setPickColor ] = useState(color);

    const handleInfo = (e) => {
        e.preventDefault();
        setNewUsername(e.target.value); 
    };
    
    const sendInfo = (e) => {
        e.preventDefault();
        //debo verificar que no exista el mismo username? 
        firestore
            .collection("profile")
            .doc(user.uid)
            .set({
                username: newUsername,
                color: pickColor.hex,
                photoURL: user.photoURL,
                id: user.uid,
                email: user.email,
                name: user.displayName
            })
            .then(() => {
                navigate("/home")
            });
           
      };

    return(
        <div className="bodyLogin">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin">
                <div className="tittlePosition">
                    <h1 className="loginTittle">WELCOME</h1>
                    <h1 className="loginTittle"><span style={{ color: "#f50d5a"}}>{user.displayName}!</span></h1>
                </div>
                <input
                    type="text"
                    placeholder="Type your username"
                    className="inputNickname" minLength="5"
                    maxLength="12"
                    id={loggedUserProfile.id}
                    value={newUsername}
                    onChange={handleInfo}
                />
                <h2 className="loginSubTittle">Select your favorite color</h2>
                <div className="selectColorClass">
                    {colorList.map((color) => {
                        const isSelected = color.name === pickColor.name;
                        const classColor = `color ${isSelected ? 'selected' : ''}`;
                            return (
                                <div
                                    onClick={() => setPickColor(color)}
                                    key={color.name}
                                    className={classColor}
                                    style={{ backgroundColor: color.hex }}
                                />
                        );
                    })}
                </div>
                <button className="continueButton" onClick={sendInfo}>CONTINUE</button>
                <p className="copyText">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
};
