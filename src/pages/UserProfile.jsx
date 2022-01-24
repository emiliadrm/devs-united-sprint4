import React  from "react";
// import { AppContext } from "../context/AppProvider"
// import TweetField from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton"

export default function Perfil() {

    // funcion para comparar el username === context.username
    const navigate = useNavigate();
    const { username } = useParams();

    const handleSetting = () => {
        navigate("/settings")
    }

    return(
        <main>
            <header className="navBar">
                <button>v</button>
                <h2>{username}</h2>
                <LogoutButton/>
                <button onClick={handleSetting}> configurar</button>
            </header>
            <div>Testing</div>
        </main>
    )
}
