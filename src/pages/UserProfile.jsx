import React  from "react";
// import { AppContext } from "../context/AppProvider"

// import TweetField from "../components/TweetComponent"
import { LogoutButton } from "../components/GoogleSignButton"

export default function Perfil() {
    return(
        <main>
            <header className="navBar">
                <button>v</button>
                <h2>Username</h2>
                <LogoutButton/>
            </header>
            <div>Testing</div>
        </main>
    )
}
