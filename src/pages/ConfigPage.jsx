import React from "react";
import logo from "../resources/logo.svg"

export default function LoginPage() {
    return(
        <div className="bodyLogin">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin">
                <h1 className="loginTittle">WELCOME</h1>
                <h1 className="loginTittle"><span style={{ color: "#f50d5a" }} >NAME!</span></h1>
                <h2 className="loginSubTittle">Select your favorite color</h2>
                <button>CONTINUE</button>
                <p className="copyText">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
}
