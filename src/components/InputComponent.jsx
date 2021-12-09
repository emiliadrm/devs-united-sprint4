import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider"
import { firestore /*auth, loginWithGoogle, logout */} from "../firebase";

function TextField() {

    const context = useContext(AppContext);

    const handleChange = (e) => {
        console.log('EL ESTADO ANTERIOR ES>');
        console.log(context.tweetM);

        let newTweet = { 
            tweetM: e.target.value
         };

         console.log('EL ESTADO NUEVO ES>');
         console.log(newTweet);

        context.setTweetM(newTweet);
      }; 
    
      const sendTweetM = (e) => {
        e.preventDefault();
        firestore.collection("tweets").add(context.tweetM); //el error me sale aca
      };

    return (
            <form action="" className="textInputStyle">
                {/*<input type="text" className="inputFieldStyle" placeholder="What's happening?"/>*/}
                <textarea 
                    className="inputFieldStyle"
                    placeholder="What's happening?"
                    name="tweetText" 
                    value={context.tweetM}
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