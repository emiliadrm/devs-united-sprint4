import React from "react";
import gLogo from "../resources/googlelogo.svg"

function GoogleButton() {
    return(
        <button className="gButton" onClick={futuroHandler}>
            <div className="gLogo"><img className="gImg" src={gLogo} alt="" /></div>
            <p className="gText">Sign in with Google</p>
        </button>
    )
}

export default GoogleButton;

function futuroHandler() {
    console.log('TEST, this function will have a Handler');
}