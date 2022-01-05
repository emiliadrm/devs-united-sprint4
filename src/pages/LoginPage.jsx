import React from "react";
import logo from "../resources/logo.svg"
import GoogleButton from "../components/GoogleSignButton"

function LoginPage() {
    return(
        <div className="bodyLogin1">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin1">
                <h1 className="loginTittle">LOREM IPSUM DOLOR</h1>
                <h2 className="loginSubTittle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                <GoogleButton />
                <p className="copyText1">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
}

export default LoginPage;