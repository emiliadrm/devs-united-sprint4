import React, { useContext }  from "react";
import { AppContext } from "../context/AppProvider"
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton"

import { getIDforUsername } from "../helpers";

export default function UserProfile() {

    // funcion para comparar el username === context.username
    const { profiles } = useContext(AppContext)
    const navigate = useNavigate();
    const { usernameProfile } = useParams();

    const userProfileDB = getIDforUsername(profiles, usernameProfile)

    console.log(userProfileDB, 'ERROR PERFIL');

    const handleSetting = () => {
        navigate("/settings")
    }

    const handleHome = () => {
        navigate("/home")
    }

    return(
        <main>
            <header className="navBar">
                <button onClick={handleHome}>HOME</button>-
                
                <h2>{usernameProfile}</h2>
                <LogoutButton/>
                <button onClick={handleSetting}>Configurar</button>
            </header>
            <div>
                {userProfileDB.map((dataTweet, index) => 
                    <TweetComponent 
                        key={index}
                        uid={dataTweet.uid}
                        tweetMensaje={dataTweet.tweetMessage}
                        id={dataTweet.id}
                        likes={dataTweet.likes}
                        username={dataTweet.username}
                        color={dataTweet.color}
                        photo={dataTweet.photoURL}
                        />
                    )
                }
            </div>
        </main>
    )
}
