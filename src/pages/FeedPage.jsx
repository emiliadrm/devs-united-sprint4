import React from "react";
import TweetField from "../components/TweetComponent"
import TextField from "../components/InputComponent"
import Titulo from "../resources/title.svg"
import Logito from "../resources/logo-small.svg"
import ProfileDefault from "../resources/profilePicDefault.svg"

export default function Feed({ handleButtonTweet }) {
    return(
        <main>
            <header className="navBar">
                <img src={ProfileDefault} width="33px"alt="" />
                <img src={Logito} alt="" />
                <img src={Titulo} alt="" />
            </header>
            <section className="textSection">
                <img src={ProfileDefault} alt="" className="profileStyleFeed"/>
                <TextField handleButtonTweet={handleButtonTweet}/>
            </section>
            <section className="tweetSection">
                {/*aqui va el map de los tweets*/}
                <TweetField/>
                <TweetField/>
            </section>
            
        </main>
    )
}