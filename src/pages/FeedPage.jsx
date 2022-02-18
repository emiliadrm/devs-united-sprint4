import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppProvider"
// IMAGENES
import Titulo from "../resources/title.svg"
import Logito from "../resources/logo-small.svg"
// COMPONENTES
import TweetComponent from "../components/TweetComponent"
import InputComponent from "../components/InputComponent"
import { LogoutButton } from "../components/LogoutButton"

import { getProfileForId } from "../helpers";

export default function FeedPage() {

    const { user, messages, profiles} = useContext(AppContext);
    const userId = user.uid;
    const profile = getProfileForId(profiles, userId);
    console.log(profile);
    
    return(
        <main>
            <header className="navBar">
                <Link to={`/user/${profile.username}`}>
                    <img src={user.photoURL} alt="" style={{borderRadius:`50%`, width:'33px'}}/>
                </Link>
                <img src={Logito} alt="" />
                <img src={Titulo} alt="" />
                <LogoutButton/>
            </header>
            <section className="textSection">
                <img src={user.photoURL} alt="" className="profileStyleFeed"/>
                <InputComponent />
            </section>
            <section className="tweetSection">
                {messages.map((tweet, index) => 
                    <TweetComponent
                        key={index}
                        uid={tweet.uid}
                        tweetMensaje={tweet.tweetMessage}
                        id={tweet.id}
                        likes={tweet.likes}
                        photo={tweet.photoURL}
                        unixDate={tweet.unixDate}
                    />)} 
            </section>
        </main>
    )
}