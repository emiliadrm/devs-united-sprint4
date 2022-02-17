import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider"
// IMAGENES
import Titulo from "../resources/title.svg"
import Logito from "../resources/logo-small.svg"
// COMPONENTES
import TweetComponent from "../components/TweetComponent"
import InputComponent from "../components/InputComponent"
import { LogoutButton } from "../components/LogoutButton"

export default function FeedPage() {

    const { user, messages} = useContext(AppContext);

    return(
        <main>
            <header className="navBar">
                <img src={user.photoURL} alt="" style={{borderRadius:`50%`, width:'33px'}}/>
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
                        username={tweet.username}
                        color={tweet.color}
                        photo={tweet.photoURL}
                        dateString={tweet.dateString}
                    />)} 
            </section>
        </main>
    )
}