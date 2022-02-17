import React, { useContext, useState }  from "react";
import { AppContext } from "../context/AppProvider";
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import back from "../resources/back.svg";
import settingIcon from "../resources/icono-setting.svg";

import { getIDforUsername, getTweetsForUsername, getLikesForUser, searchTweetsForId, getTweetsForId} from "../helpers";


export default function UserProfile() {

    const { profiles, messages, user, favoriteCounter } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();
    const [showFav, setShowPage] = useState(false);
    const [showColorButton, setShowColorButton] = useState(false);

    // Para buscar los tweets del user
    const userProfileDB = getIDforUsername(profiles, username);
    const tweetsForUser = getTweetsForUsername(userProfileDB, messages);
    
    const handleFavView = () => {
        setShowPage(true);
        setShowColorButton(true);
    }

    const handlePostView = () => {
        setShowPage(false);
        setShowColorButton(false);
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

    // Para buscar los tweets Favoritos:
    const infLikesForUser = getLikesForUser(user, favoriteCounter);
    const tweetsIdsArray = searchTweetsForId(infLikesForUser);
    const tweetsFavUser = getTweetsForId(tweetsIdsArray, messages); 

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
            <section className="flexCenter">
            <   div className="flexCenter fondoOscuro">
                    <img 
                        src={userProfileDB.photoURL} 
                        alt="" 
                        className="profileStylePageUser"
                        style={{backgroundColor:`${userProfileDB.color}`
                        }}/>
                    <h1 className="userPageUserName" style={{backgroundColor:`${userProfileDB.color}`
                        }}>{username}</h1>
                    </div>
                {verifiedUserLogged(user, userProfileDB) ? (
                    <>
                    <nav className="fondoOscuro barProfile">
                        <button onClick={handlePostView} className={showColorButton ? `bottonFav` : `bottonPost`}>POSTS</button>
                        <button onClick={handleFavView} className={showColorButton ? `bottonPost` : `bottonFav`}>FAVORITES</button>
                    </nav>
                    <div className="cssLinestyle flexCenter"></div>
                    {!showFav ?
                        <div className="bodyTweetsPageUser flexCenter">
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
                                    dateString={dataTweet.dateString}
                                />
                            )}
                        </div>
                        :
                        <>
                            <div className="bodyTweetsPageUser flexCenter">
                                {tweetsFavUser?.map((dataTweet, index) => 
                                    <TweetComponent 
                                        key={index}
                                        uid={dataTweet.uid}
                                        tweetMensaje={dataTweet.tweetMessage}
                                        id={dataTweet.id}
                                        likes={dataTweet.likes}
                                        username={dataTweet.username}
                                        color={dataTweet.color}
                                        photo={dataTweet.photoURL}
                                        dateString={dataTweet.dateString}
                                    />
                                )}
                            </div>
                        </>
                    }
                    </>
                ) : (
                <>
                    <div className="cssLinestyle flexCenter"></div>
                    <div className="bodyTweetsPageUser flexCenter">
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
                                dateString={dataTweet.dateString}
                            />
                        )}
                    </div>
                </>
                )}
            </section>
                
        </main>
    )
}
