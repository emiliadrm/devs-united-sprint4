import React from "react";
import TweetField from "../components/TweetComponent"
import TextField from "../components/InputComponent"

export default function Feed({ handleButtonTweet }) {
    return(
        <>
            <TextField handleButtonTweet={handleButtonTweet}/>
            <TweetField/>
        </>
    )
}