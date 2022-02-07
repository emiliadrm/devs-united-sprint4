import React, { useContext, useState }  from "react";
import { AppContext } from "../context/AppProvider";
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import back from "../resources/back.svg";
import settingIcon from "../resources/icono-setting.svg";

import { getIDforUsername, getTweetsForUsername, getIdTweetsForUser} from "../helpers";


export default function UserProfile() {

    const { profiles, messages, user, favoriteCounter } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();
    const [showFav, setShowPage] = useState(true);

    const userProfileDB = getIDforUsername(profiles, username)
    const tweetsForUser = getTweetsForUsername(userProfileDB, messages)
    
    const handleFavView = () => {
        setShowPage(false);
    }

    const handlePostView = () => {
        setShowPage(true);
    }

    const handleSetting = () => {
        navigate("/settings")
    }

    const handleHome = () => {
        navigate("/home")
    }

    const verifiedUserLogged = (user, userProfileDB) => {
        if (user.uid === userProfileDB.id) return true;
    }

    // LINEAS DE PRUEBA
    const TweetsIdTest = getIdTweetsForUser(user, favoriteCounter);
    console.log(TweetsIdTest);

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
            </header>
                {verifiedUserLogged(user, userProfileDB) ? (
                    <>
                    <nav>
                        <button onClick={handlePostView}>POSTS</button>
                        <button onClick={handleFavView}>FAVORITES</button>
                    </nav>
                    <div></div>
                    {!showFav ?
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
                            )}
                        </div>
                        :
                        <div>
                            {
                                <div>aqui van los favoritos</div>
                            }
                        </div>
                    }
                    </>
                ) : (
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
                    )}
                </div>
                )}
        </main>
    )
}
