import React, { useContext }  from "react";
import { AppContext } from "../context/AppProvider"
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton"

import { getIDforUsername, getTweetsForUsername} from "../helpers";

export default function UserProfile() {

    // funcion para comparar el username === context.username
    const { profiles, messages } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();

    const userProfileDB = getIDforUsername(profiles, username)
    const tweetsForUser = getTweetsForUsername(userProfileDB, messages)

  //  console.log(messages, 'tweet');
    console.log(profiles, 'perfil');
    console.log('perfil de', userProfileDB);
    // console.log('tweets de', tweetsForUser);

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
                <h2>{username}</h2>
                <LogoutButton/>
                <button onClick={handleSetting}>Configurar</button>
            </header>
            <div>
                {tweetsForUser?.map((dataTweet, index) => 
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
