import React from "react";
import gLogo from "../resources/googlelogo.svg"
import iconLogout from "../resources/logout.svg"
// import { useHistory } from "react-router-dom"
import { loginWithGoogle, logout} from "../firebase";

function GoogleButton() {
   // const history = useHistory();

    const buttonHome = () => {
       // history.push("/home");
        loginWithGoogle();
    }
    return(
        <button className="gButton" onClick={buttonHome}>
            <div className="gLogo"><img className="gImg" src={gLogo} alt="" /></div>
            <p className="gText">Sign in with Google</p>
        </button>
    )
}

export function LogoutButton() {
    return(
        <button className="gLogout" onClick={logout}>
            <p className="nameLogout">LOGOUT</p>
            <img src={iconLogout} alt="" />
        </button>
    )
}

export default GoogleButton;