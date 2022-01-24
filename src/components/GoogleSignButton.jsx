import React, { useContext } from "react";
import gLogo from "../resources/googlelogo.svg"
import { useNavigate } from "react-router-dom"
import { loginWithGoogle} from "../firebase";
import { AppContext } from "../context/AppProvider";

function GoogleButton() {

    const { profile } = useContext(AppContext);
    const navigate = useNavigate();

    const buttonHome = () => {
        
        loginWithGoogle();

        if (profile.color === undefined && profile.username === undefined) {
            navigate("/settings")
        } else {
            navigate("/home")
        }
    }

    return(
        <button className="gButton" onClick={buttonHome}>
            <div className="gLogo"><img className="gImg" src={gLogo} alt="" /></div>
            <p className="gText">Sign in with Google</p>
        </button>
    )
}

export default GoogleButton;