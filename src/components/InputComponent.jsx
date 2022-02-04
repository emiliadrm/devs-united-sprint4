
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"
import { firestore } from "../firebase";

import { getProfileForUID } from "../helpers";

function InputComponent() {

    const { profiles, user } = useContext(AppContext);

    const loggedUserProfile = getProfileForUID(profiles, user?.uid);

    const [tweetM, setTweetM] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setTweetM(e.target.value); 
    }; 
    
    const sendTweetM = (e) => {
        e.preventDefault();
        firestore
            .collection("tweets")
            .add({
                color: loggedUserProfile.color,
                email: loggedUserProfile.email,
                photoURL: loggedUserProfile.photoURL,
                tweetMessage: tweetM,
                username: loggedUserProfile.username,
                uid: user.uid,
            }).then(() => {

                setTweetM('');
            });
      };

    return (
            <form action="" className="textInputStyle">
                <textarea 
                    className="inputFieldStyle"
                    placeholder="What's happening?"
                    name="tweetText" 
                    value={tweetM}
                    id="" 
                    cols="30" 
                    rows="10" 
                    minLength="1"
                    maxLength="200"
                    onChange={handleChange}
                    ></textarea>
                <div className="infInputStyle">
                    <span style={{ color: "#FFFFFF" }}>1</span>
                    <span style={{ color: "#f50d5a" }}>200 max.</span>
                </div>
                <input type="submit" className="submitInputStyle" onClick={sendTweetM} value="POST"/>
            </form>
    )
}

export default InputComponent;