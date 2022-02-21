import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo.svg";
import { firestore } from "../firebase";
import { AppContext } from "../context/AppProvider";
import "../styles/style.css";
import closeIcon from '../resources/close.svg';
import LoadingPage from "./LoadingPage";

import { getProfileForUID, verifiedExistUsername} from "../helpers";

const colorList = [
    "#F50D5A", // rojo
    "#FF865C", //naranja
    "#FFEA5C", // amarillo
    "#00DA76", // verde
    "#0096CE", // azul
    "#800FFF", // purpura
];

export default function ConfigPage() {
    const navigate = useNavigate();
    const { user, profiles } = useContext(AppContext);
    const [ newUsername, setNewUsername ] = useState('');
    const [ pickColor, setPickColor ] = useState();
    const [alertName, setAlertName] = (false);

    if (user == null || profiles.length === 0) {
        return(<LoadingPage/>);
    }

    // si no esta logueado {}, si esta logueado trae info del usuario
    const loggedUserProfile = getProfileForUID(profiles, user?.uid)

    const selectedColor = pickColor || loggedUserProfile?.color || colorList[0];

    const handleInfo = (e) => {
        e.preventDefault();
        setNewUsername(e.target.value);
        setAlertName(false);
    };
    
    const sendInfo = (e) => {
        e.preventDefault();
        if (verifiedExistUsername(profiles, newUsername))
        {
            setAlertName(true);
        } else {
             firestore
            .collection("profile")
            .doc(user.uid)
            .set({
                username: newUsername,
                color: selectedColor,
                photoURL: user.photoURL,
                id: user.uid,
                email: user.email,
                name: user.displayName
                })
            .then(() => {
                navigate("/home")
            });
        }     
      };

    return(
        <div className="bodyConfig">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin">
                <button className="buttonPosition" onClick={() => navigate(-1)}>
                    <img src={closeIcon} alt="" width="36px"s/>
                </button>
                <div className="tittlePosition">
                    <h1 className="loginTittle">YOUR USERNAME NOW IS</h1>
                    <h1 className="loginTittle"><span style={{ color: "#f50d5a"}}>{loggedUserProfile.username}!</span></h1>
                </div>
                <input
                    type="text"
                    placeholder="Type your new username"
                    className="inputNickname" minLength="5"
                    maxLength="12"
                    id={loggedUserProfile.id}
                    value={newUsername}
                    onChange={handleInfo}
                />
                {alertName ? (<><h1>Este nombre de usuario ya existe 🚨</h1></>) : null}
                <h2 className="loginSubTittle">Select the new color you want</h2>
                <div className="selectColorClass">
                    {colorList.map((color, index) => {
                        const isSelected = color === selectedColor;
                        const classColor = `color ${isSelected ? 'selected' : ''}`;
                            return (
                                <div
                                    onClick={() => setPickColor(color)}
                                    key={index}
                                    className={classColor}
                                    style={{ backgroundColor: color }}
                                />
                        );
                    })}
                </div>
                <button className="continueButton" onClick={sendInfo}>SAVE</button>
                <p className="copyText">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
};
