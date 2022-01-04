import React, { useContext } from "react";
import ProfileDefault from "../resources/profilePicDefault.svg";
import deleteIcon from "../resources/deleteIcon.svg";
// import heartR from "../resources/heartR"*/ /*
import { AppContext } from "../context/AppProvider"
// import { firestore auth, loginWithGoogle, logout } from "../firebase";


function TweetField({ tweetMensaje, id, likes }) {

    const context = useContext(AppContext);
    
 /*   const deleteTweet = (id) => {
        firestore
            .doc("tweets")
            .delete(`tweets/${id}`)
      };*/

    return (
            <div className="tweetFieldStyle" key={id}>
                <img src={context.user.photoURL} alt="" className="profileStyleFeed"/>
                <div>
                   <div className="infTweetStyle">
                        <div className="infNameTime">
                            <h1 
                                className="userNameStyle"
                                style={{ backgroundColor: `${context.pickColor.hex}`}}>
                                {context.user.displayName}
                            </h1>
                            <p style={{ marginLeft: "12px" }}> - 5 jun.</p>
                        </div>
                        <div className="deleteClass">
                            <img src={deleteIcon} alt="" className="deleteStyle" />
                        </div>
                   </div>
                   <p className="showTweetStyle">{tweetMensaje}</p>
                    <LikeSection likes={likes}/>
                </div>
                <div className="lineTweet"></div>
            </div>
    )
}


function LikeSection ({ likes }) {
    return(
        <>
            <div className="likesSection">
                <svg 
                    width="24" 
                    height="20" 
                    viewBox="0 0 24 20" 
                    className="heartStyle"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6386 1.58879V3.13084H19.2289V4.6729H20.8193V6.16822V7.66355V9.11215H19.2289V10.6542H17.6386V12.1963H16.0482V13.7383H14.4578V15.2804H12.8675V16.8224H11.4699V15.2804H9.87952V13.7383H8.28916V12.1963H6.6988V10.6542H5.10843V9.11215H3.3253V7.66355V6.16822V4.6729H4.91566V3.13084H6.50602V1.58879H7.90361V3.13084H9.49398V4.6729H11.1807H12.7711H14.4578V3.13084H16.0482V1.58879H17.6386ZM19.7108 0H14.7952V1.49533H12.8675V3.03738H11.2771V1.49533H9.87952V0H4.91566V1.49533H3.22892V3.03738H1.59036V4.57944H0V7.66355H1.59036V10.7477H3.18072V12.2897H4.86747V13.8318H6.36145V15.7009H7.95181V16.9159H9.78313V18.4579H11.1807V20H12.7711V18.4579H14.6988V16.9159H16V15.7009H17.5904V13.8318H19.6145V12.2897H20.8193V10.7477H22.4096V7.66355H24V4.57944H22.4096V3.03738H20.8193V1.49533H19.6145V0H19.7108Z" fill="currentColor"/>
                </svg>
                <span>{likes}</span>
            </div>
        </>
    )
}

export default TweetField;