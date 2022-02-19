
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"
import { firestore } from "../firebase";

import { getProfileForUID, getUnixTime } from "../helpers";

function InputComponent() {

    const { profiles, user } = useContext(AppContext);

    const loggedUserProfile = getProfileForUID(profiles, user?.uid);

    const [tweetM, setTweetM] = useState("");
    // const [alertW, setAlertW] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setTweetM(e.target.value); 
    }; 
    
    const sendTweetM = (e) => {
        e.preventDefault();
        if(tweetM.length === 0){
            // no sure what to put here
        } else {
            firestore
                .collection("tweets")
                .add({
                    email: loggedUserProfile.email,
                    photoURL: loggedUserProfile.photoURL,
                    tweetMessage: tweetM,
                    uid: user.uid,
                    unixDate: getUnixTime(),
                }).then(() => {
                        setTweetM('');
                });
            }
      };

    const tweetLarge = tweetM.length;

    const barProgressCss = () => {
        if (tweetLarge === 0) {
            return '0';
        } else {
            return `${tweetLarge / 2}`;
        }
    }

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
                    required
                    ></textarea>
                <div className="barStyle" style={{width: barProgressCss() + "%"}}></div>
                <div className="infInputStyle">
                    <span style={{ color: "#FFFFFF" }}>{tweetLarge}</span>
                    <span style={{ color: "#f50d5a" }}>200 max.</span>
                </div>
                <input type="submit" className="submitInputStyle" onClick={sendTweetM} value="POST"/>
            </form>
    )
}

export default InputComponent;