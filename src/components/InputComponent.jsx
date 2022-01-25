
import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider"
import { firestore /*auth, loginWithGoogle, logout */} from "../firebase";

function TextField() {

    const context = useContext(AppContext);

    const handleChange = (e) => {
        e.preventDefault();
        context.setTweetM({ tweetMessage: e.target.value }); 
    }; 
    
    const sendTweetM = (e) => {
        e.preventDefault();
        firestore
            .collection("tweets")
            .add(context.tweetM)
            .then(() => {
                context.setTweetM({ 
                    tweetMessage:"",
                    uid: context.user.uid,
                    username: context.profile.username,
                    color: context.profile.color,
                    photoURL: context.user.photoURL,
                    email: context.user.email
                });
            }); 
      };

    return (
            <form action="" className="textInputStyle">
                <textarea 
                    className="inputFieldStyle"
                    placeholder="What's happening?"
                    name="tweetText" 
                    value={context.tweetM.tweetMessage}
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