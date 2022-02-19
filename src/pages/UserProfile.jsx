import React, { useContext, useState }  from "react";
import { AppContext } from "../context/AppProvider";
import TweetComponent from "../components/TweetComponent"
import { useParams, useNavigate } from "react-router-dom";
import { LogoutButton } from "../components/LogoutButton";
import back from "../resources/back.svg";
import settingIcon from "../resources/icono-setting.svg";
import LoadingPage from "./LoadingPage";
import NotFound from "./NotFound";

import { getIDforUsername, getTweetsForUsername, getLikesForUser, searchTweetsForId, getTweetsForId} from "../helpers";


export default function UserProfile() {

    const { profiles, messages, user, favoriteCounter } = useContext(AppContext)
    const navigate = useNavigate();
    const { username } = useParams();
    const [showFav, setShowPage] = useState(false);
    const [showColorButton, setShowColorButton] = useState(false);


    if (profiles.length === 0) {
         return (<LoadingPage/>); // Aun se estan cargando los profiles, retornar un mensaje de carga
    }

    // Para buscar los tweets del user
    const userProfileDB = getIDforUsername(profiles, username);

    if (userProfileDB == null) {
        // EL usuario no existe
        return (<NotFound/>);
    }

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

    if (tweetsForUser == null) {
        return (<><h1>Aun no hay tweets que mostrar 🥺</h1></>);
    }

    if (tweetsFavUser == null) {
        return (<><h1>Aun no tienes tweets favoritos 🥺</h1></>);
    }


    return(
        <main>
            <header className="navBar">
                <div className="navBarSubComponent">
                    <button onClick={handleHome} ><img src={back} alt="Volver atras"/>
                        <h1 className="userNameStyleW" style={{ marginLeft: '15px'}}>{username}</h1>
                    </button>
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
                                    photo={dataTweet.photoURL}
                                    unixDate={dataTweet.unixDate}
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
                                        photo={dataTweet.photoURL}
                                        unixDate={dataTweet.unixDate}
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
                                photo={dataTweet.photoURL}
                                unixDate={dataTweet.unixDate}
                            />
                        )}
                    </div>
                </>
                )}
            </section>    
        </main>
    )
}
