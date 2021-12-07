import React from "react";
import ProfileDefault from "../resources/profilePicDefault.svg";
import deleteIcon from "../resources/deleteIcon.svg";
import heartW from "../resources/heartW.svg";
/*import heartR from "../resources/heartR"*/

function TweetField({ tweetM, name }) {
    return (
            <div className="tweetFieldStyle">
                <img src={ProfileDefault} alt="" className="profileStyleFeed"/>
                <div>
                   <div className="infTweetStyle">
                        <h1 className="userNameStyle" style={{ backgroundColor: "#00DA76" }}>{name}</h1>
                        {/*Usar un USECONTEXT para modificar el color de fondo por usuario*/}
                        <p> - 5 jun.</p>
                        <img src={deleteIcon} alt="" style={{ marginLeft: "205px" }} />
                   </div>
                   <p className="showTweetStyle">{tweetM}</p>
                   <div className="likesSection">
                       <img src={heartW} alt="" />
                       <span>100</span>
                    </div>
                    <div className="test"></div>
                </div>
            </div>
    )
}

export default TweetField;