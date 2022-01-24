import React  from "react";
// import { AppContext } from "../context/AppProvider"

// import TweetField from "../components/TweetComponent"
import { useParams } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton"

export default function Perfil() {

    // funcion para comparar el username === context.username
    const { username } = useParams()

    return(
        <main>
            <header className="navBar">
                <button>v</button>
                <h2>{username}</h2>
                <LogoutButton/>
            </header>
            <div>Testing</div>
        </main>
    )
}
