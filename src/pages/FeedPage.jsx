import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider"


import TweetField from "../components/TweetComponent"
import InputComponent from "../components/InputComponent"
import Titulo from "../resources/title.svg"
import Logito from "../resources/logo-small.svg"
import ProfileDefault from "../resources/profilePicDefault.svg"
import { LogoutButton } from "../components/LogoutButton"

export default function Feed() {
    const context = useContext(AppContext);

    return(
        <main>
            <header className="navBar">
                {context.user.photoURL ? (<img src={context.user.photoURL} width="33px"alt="" />) : (<img src={ProfileDefault} width="33px"alt="" />)}
                <img src={Logito} alt="" />
                <img src={Titulo} alt="" />
                <LogoutButton/>
            </header>
            <section className="textSection">
                <img src={context.user.photoURL} alt="" className="profileStyleFeed"/>
                <InputComponent />
            </section>
            <section className="tweetSection">
                {context.messages.map((tweet) => 
                    <TweetField 
                        tweetMensaje={tweet.tweetMessage}
                        id={tweet.id}
                        likes={tweet.likes}
                    />)} 
            </section>
        </main>
    )
}