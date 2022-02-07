import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppProvider"
import { EmergentWindow } from "./EmergentWindow";
import { LikeButton } from "./likeButton";
// import { getProfileForUID } from "../helpers";

import deleteIcon from "../resources/deleteIcon.svg";
// import heartR from "../resources/heartR"*/ /*

function TweetComponent({ tweetMensaje, id, likes, photo, username, color, uid}) {

    const [ modalView, setModalView] = useState(false);

    const handleModalView = () => {
        setModalView(true);
    }

    const handleCloseModal = () => {
        setModalView(false);
    }

    const { user } = useContext(AppContext);

    return (
            <div className="tweetFieldStyle" key={id}>
                <Link to={`/user/${username}`}>
                    <img src={photo} alt="" className="profileStyleFeed"/>
                </Link>
                <div>
                   <div className="infTweetStyle">
                        <div className="infNameTime">
                            <Link to={`/user/${username}`}>
                                <h1 
                                    className="userNameStyle"
                                    style={{ backgroundColor: `${color}`, color: '#250C23'}}>
                                    {username}
                                </h1>
                            </Link>
                            <p style={{ marginLeft: "12px" }}> - 5 jun.</p>
                        </div>
                        {uid === user.uid ? (
                            <button 
                                type="button" 
                                className="deleteClass"
                                onClick={handleModalView}>
                                <img src={deleteIcon} alt="" className="deleteStyle" />
                            </button>
                        ) : null}
                   </div>
                   <p className="showTweetStyle">{tweetMensaje}</p>
                    <LikeButton countLike={likes} id={id}/>
                </div>
                <div className="lineTweet"></div>
                {modalView ? <EmergentWindow id={id} closeModal={handleCloseModal}/> : null}
            </div>
    )
}


export default TweetComponent;