import React from "react";
import { useNavigate } from "react-router-dom"
import {logout} from "../firebase";
import iconLogout from "../resources/logout.svg"


export function LogoutButton() {

    const navigate = useNavigate();

    const buttonLogout = () => {
        navigate("/")
        logout();
    }

    return(
        <button className="gLogout" onClick={buttonLogout}>
            <p className="nameLogout">LOGOUT</p>
            <img src={iconLogout} alt="" />
        </button>
    )
}