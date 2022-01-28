
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"
import { firestore } from "../firebase";

function TextField() {

    const { profile } = useContext(AppContext);
    const [tweetM, setTweetM] = useState({ 
        tweetMessage: "", 
        id: "",
        color: "",
        username: "",
        email:"",
        photoURL: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setTweetM({ tweetMessage: e.target.value }); 
    }; 
    
    const sendTweetM = (e) => {
        e.preventDefault();
        firestore
            .collection("tweets")
            .add(tweetM)
            .then(() => {
                setTweetM({ tweetMessage:"" });
            }); 
      };

    return (
            <form action="" className="textInputStyle">
                <textarea 
                    className="inputFieldStyle"
                    placeholder="What's happening?"
                    name="tweetText" 
                    value={tweetM.tweetMessage}
                    id="" 
                    cols="30" 
                    rows="10" 
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

export default TextField;