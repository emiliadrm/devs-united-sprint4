import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/logo.svg";
import { firestore } from "../firebase";
import { AppContext, colorList } from "../context/AppProvider";
import "../styles/style.css";



export default function LoginPage() {

    const navigate = useNavigate();

    const { setProfile, profile, setPickColor, pickColor, user } = useContext(AppContext);

    const handleInfo = (e) => {
        e.preventDefault();
        setProfile({ username: e.target.value}); 
    };
    
    const sendInfo = (e) => {
        e.preventDefault();
        firestore
            .collection("profile")
            .add(profile)
            .then(() => {
                setProfile({ username: profile.username, uid: user.uid, mail: user.email, color: pickColor.color});
            });
            navigate("/home")
      };

    return(
        <div className="bodyLogin">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin">
                <div className="tittlePosition">
                    <h1 className="loginTittle">WELCOME</h1>
                    <h1 className="loginTittle"><span style={{ color: "#f50d5a"}} >NAME!</span></h1>
                </div>
                <input
                    type="text"
                    placeholder="Type your username"
                    className="inputNickname" minlength="5"
                    maxlength="12"
                    // id={profile.uid}
                    value={profile.username}
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

