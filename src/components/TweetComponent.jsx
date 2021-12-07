import React from "react";
import ProfileDefault from "../resources/profilePicDefault.svg";
import deleteIcon from "../resources/deleteIcon.svg";
import heartW from "../resources/heartW.svg";
/*import heartR from "../resources/heartR"*/

function TweetField() {
    return (
            <div className="tweetFieldStyle">
                <img src={ProfileDefault} alt="" className="profileStyleFeed"/>
                <div>
                   <div className="infTweetStyle">
                        <h1 className="userNameStyle" style={{ backgroundColor: "#00DA76" }}>USERNAME</h1>
                        {/*Usar un USECONTEXT para modificar el color de fondo por usuario*/}
                        <p> - 5 jun.</p>
                        <img src={deleteIcon} alt="" style={{ marginLeft: "205px" }} />
                   </div>
                   <p className="showTweetStyle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
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