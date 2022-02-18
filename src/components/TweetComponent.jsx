import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppProvider"
import { EmergentWindow } from "./EmergentWindow";
import { LikeButton } from "./LikeButton";
import { getProfileForId, getDateFromUnixTime } from "../helpers";

import deleteIcon from "../resources/deleteIcon.svg";

function TweetComponent({ tweetMensaje, id, likes, photo, uid, unixDate}) {

    const [ modalView, setModalView] = useState(false);

    const handleModalView = () => {
        setModalView(true);
    }

    const handleCloseModal = () => {
        setModalView(false);
    }

    const { user, profiles } = useContext(AppContext);
    const profile = getProfileForId(profiles, uid);

    return (
            <div className="tweetFieldStyle" key={id}>
                <Link to={`/user/${profile.username}`}>
                    <img src={photo} alt="" className="profileStyleFeed"/>
                </Link>
                <div>
                   <div className="infTweetStyle">
                        <div className="infNameTime">
                            <Link to={`/user/${profile.username}`}>
                                <h1 
                                    className="userNameStyle"
                                    style={{ backgroundColor: `${profile.color}` }}>
                                    {profile.username}
                                </h1>
                            </Link>
                            <p style={{ marginLeft: "12px" }}> - {getDateFromUnixTime(unixDate)}.</p>
                        </div>
                        {uid === user.uid ? (
                            <button 
                                type="button" 
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