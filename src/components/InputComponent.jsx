import React from "react";

function TextField({ handleButtonTweet }) {

    return (
            <form action="" className="textInputStyle">
                <input type="text" className="inputFieldStyle" placeholder="What's happening?"/>
                <div className="infInputStyle"><span>1</span><span>200 max.</span></div>
                <input type="submit" className="submitInputStyle" onChange={handleButtonTweet} value="POST"/>
            </form>
    )
}

export default TextField;