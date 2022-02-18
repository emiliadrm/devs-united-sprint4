import React from "react";
import gLogo from "../resources/googlelogo.svg"
import { useNavigate } from "react-router-dom"
import { loginWithGoogle} from "../firebase";

function GoogleButton() {

    const navigate = useNavigate();

    const buttonHome = () => {

        loginWithGoogle().then(credentials => {
            console.log('LOGIN SUCCESS', credentials);
            if (credentials.additionalUserInfo.isNewUser) {
                navigate("/inital-setting")
            } else {
                navigate("/home")
            }
        });
    };
    
    return(
        <button className="gButton" onClick={buttonHome}>
            <div className="gLogo"><img className="gImg" src={gLogo} alt="" /></div>
            <p className="gText">Sign in with Google</p>
        </button>
    )
}

export default GoogleButton;
