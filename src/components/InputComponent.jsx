import React from "react";

function TextField({ handleButtonTweet }) {

    return (
            <form action="">
                <input type="text" className=""/>
                <input type="submit" className="" onChange={handleButtonTweet}/>
            </form>
    )
}

export default TextField;