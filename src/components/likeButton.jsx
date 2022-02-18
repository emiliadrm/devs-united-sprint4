import { firestore } from "../firebase";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider"
import { getCountLike, /*getLikesForUser*/ } from "../helpers"


export function LikeButton ({ id }) {

    const { user, favoriteCounter } = useContext(AppContext);
    const [likeStatus, setLikeStatus] = useState(true);
    const countLikes = getCountLike(id, favoriteCounter);
    
/*  const comprobarLike = (id) => {
        const infLikesForUser = getLikesForUser(user, favoriteCounter);
        const verifiedUserUid = infLikesForUser.find((element) => element.userUID === user.uid);
        const verifiedIdTweet = infLikesForUser.find((element) => element.tweetLikeID === id)
         if (verifiedUserUid === true && verifiedIdTweet === true){
             return true;
        } else {
            return false;
        }
    }*/


    const handleInfo = (id) => {
       setLikeStatus(!likeStatus);
        firestore
            .collection("favorites")
            .add({
                userUID: user.uid,
                tweetLikeID: id,
            });
    }

    const deleteInf = () => {
        setLikeStatus(!likeStatus);
        firestore.collection("favorites")
            .where("userUID", "==", user.uid)
            .where("tweetLikeID", "==", id)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((result) => {
                    console.log('RESULTADO', result.id, result.data());
                    firestore.collection("favorites").doc(result.id).delete();
                });
            });
    }
 
    return(
        <>
        {likeStatus ?
            (<button className="likesSection" onClick={() => handleInfo(id)}>
                    <svg 
                    width="24" 
                    height="20" 
                    viewBox="0 0 24 20" 
                    className="heartStyle"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.6386 1.58879V3.13084H19.2289V4.6729H20.8193V6.16822V7.66355V9.11215H19.2289V10.6542H17.6386V12.1963H16.0482V13.7383H14.4578V15.2804H12.8675V16.8224H11.4699V15.2804H9.87952V13.7383H8.28916V12.1963H6.6988V10.6542H5.10843V9.11215H3.3253V7.66355V6.16822V4.6729H4.91566V3.13084H6.50602V1.58879H7.90361V3.13084H9.49398V4.6729H11.1807H12.7711H14.4578V3.13084H16.0482V1.58879H17.6386ZM19.7108 0H14.7952V1.49533H12.8675V3.03738H11.2771V1.49533H9.87952V0H4.91566V1.49533H3.22892V3.03738H1.59036V4.57944H0V7.66355H1.59036V10.7477H3.18072V12.2897H4.86747V13.8318H6.36145V15.7009H7.95181V16.9159H9.78313V18.4579H11.1807V20H12.7711V18.4579H14.6988V16.9159H16V15.7009H17.5904V13.8318H19.6145V12.2897H20.8193V10.7477H22.4096V7.66355H24V4.57944H22.4096V3.03738H20.8193V1.49533H19.6145V0H19.7108Z" fill="currentColor"/>
                </svg> 
            </button>)
        :
            (<button className="likesSection" onClick={() => deleteInf(id)}>
                <svg 
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.7108 0H14.7952V1.49533H12.8675V3.03738H11.2771V1.49533H9.87952V0H4.91566V1.49533H3.22892V3.03738H1.59036V4.57944H0V7.66355H1.59036V10.7477H3.18072V12.2897H4.86747V13.8318H6.36145V15.7009H7.95181V16.9159H9.78313V18.4579H11.1807V20H12.7711V18.4579H14.6988V16.9159H16V15.7009H17.5904V13.8318H19.6145V12.2897H20.8193V10.7477H22.4096V7.66355H24V4.57944H22.4096V3.03738H20.8193V1.49533H19.6145V0H19.7108Z" fill="#F50D5A"/>
                </svg>
            </button>)
        }
            <span>
                {countLikes}
            </span>
        </>
    )
}
