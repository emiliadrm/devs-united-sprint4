import React from "react";

function TextField({ handleButtonTweet }) {

    return (
            <form action="" className="textInputStyle">
                {/*<input type="text" className="inputFieldStyle" placeholder="What's happening?"/>*/}
                <textarea className="inputFieldStyle" placeholder="What's happening?" name="" id="" cols="30" rows="10" maxLength="200"></textarea>
                <div className="infInputStyle">
                    <span style={{ color: "#FFFFFF" }}>1</span>
                    <span style={{ color: "#f50d5a" }}>200 max.</span>
                </div>
                <input type="submit" className="submitInputStyle" onChange={handleButtonTweet} value="POST"/>
            </form>
    )
}

export default TextField;