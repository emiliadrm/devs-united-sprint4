import React, { useContext, useState }  from "react";
import { AppContext } from "../context/AppProvider";
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import back from "../resources/back.svg";
import settingIcon from "../resources/icono-setting.svg";

import { getIDforUsername, getTweetsForUsername, getLikesForUser, searchTweetsForId} from "../helpers";


export default function UserProfile() {

    const { profiles, messages, user, favoriteCounter } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();
    const [showFav, setShowPage] = useState(false);

    const userProfileDB = getIDforUsername(profiles, username)
    const tweetsForUser = getTweetsForUsername(userProfileDB, messages)
    
    const handleFavView = () => {
        setShowPage(true);
    }

    const handlePostView = () => {
        setShowPage(false);
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
    const infLikesForUser = getLikesForUser(user, favoriteCounter);
    const tweetsIdsArray = searchTweetsForId(infLikesForUser);
    console.log(infLikesForUser, 'PROV');
    console.log(tweetsIdsArray, 'TEST');
    //const tweetsIdMatch = searchTweetsForId(infLikesForUser, messages);
    //const tweetsToMap = getTweetsForId(tweetsIdMatch);
    //console.log(tweetsToMap);


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
