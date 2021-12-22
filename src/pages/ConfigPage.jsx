import React, { useContext } from "react";
import logo from "../resources/logo.svg";
import { AppContext, colorList } from "../context/AppProvider";
import "../styles/style.css";


export default function LoginPage() {

    const context = useContext(AppContext);

    return(
        <div className="bodyLogin">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin">
                <h1 className="loginTittle">WELCOME</h1>
                <h1 className="loginTittle"><span style={{ color: "#f50d5a" }} >NAME!</span></h1>
                <h2 className="loginSubTittle">Select your favorite color</h2>
                <div className="selectColorClass">
                    {colorList.map((color) => {
                        const isSelected = color.name === context.pickColor.name;
                        const classColor = `color ${isSelected ? 'selected' : ''}`;
                        return (
                            <div
                                onClick={() => context.setPickColor(color)}
                                key={color.name}
                                className={classColor}
                                style={{ backgroundColor: color.hex }}
                            />
                        );
                    })}
                </div>
                <button>CONTINUE</button>
                <p className="copyText">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
};

