import React, { useContext, useState }  from "react";
import { AppContext } from "../context/AppProvider";
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import back from "../resources/back.svg";
import settingIcon from "../resources/icono-setting.svg";

import { getIDforUsername, getTweetsForUsername} from "../helpers";


export default function UserProfile() {

    // const [showPage, setShowPage] = useState();

    // funcion para comparar el username === context.username
    const { profiles, messages, user } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();

    const userProfileDB = getIDforUsername(profiles, username)
    const tweetsForUser = getTweetsForUsername(userProfileDB, messages)

    console.log(messages, 'tweet');
    console.log(profiles, 'perfil');
    console.log('perfil de', userProfileDB);
    console.log('tweets de', tweetsForUser);

    const handleSetting = () => {
        navigate("/settings")
    }

    const handleHome = () => {
        navigate("/home")
    }

    const verifiedUserLogged = (user, userProfileDB) => {
        if (user.uid === userProfileDB.id) return true;
    }

    return(
        <main>
            <header className="navBar">
                <div className="navBarSubComponent">
                    <button onClick={handleHome}><img src={back} alt="Volver atras"/></button>
                    <h1 className="userNameStyleW">{username}</h1>
                </div>
                <div className="navBarSubComponent">
                    {verifiedUserLogged(user, userProfileDB) ? (
                        <>
                            <LogoutButton/>
                            <button onClick={handleSetting}><img src={settingIcon} alt="" width="28px"/></button>
                        </>
                    ) : null}
                    
                </div>
            </header>{userProfileDB.uid === user.uid ? (
                <nav>
                    <button>POSTS</button>
                    <button>FAVORITES</button>
                </nav>
            ) : null}
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
