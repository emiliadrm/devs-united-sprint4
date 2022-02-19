import React from "react";
import logo from "../resources/logo.svg"
import GoogleButton from "../components/GoogleSignButton"

function LoginPage() {
    return(
        <div className="bodyLogin">
            <img className="devLogo" src={logo} alt="" />
            <div className="devLogin1">
                <h1 className="loginTittle">WELCOME TO <span style={{color: '#F50D5A'}}>DEVS_</span>UNITED</h1>
                <h2 className="loginSubTittle">Join <span style={{color: '#F50D5A'}}>Devs_</span>United now to know what developers are talking in the world.</h2>
                <GoogleButton />
                <p className="copyText1">© 2020 Devs_United - <span style={{ color: "#f50d5a" }} >BETA</span> </p>
            </div>
        </div>
    )
}

export default LoginPage;