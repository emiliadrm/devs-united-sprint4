
import { firestore } from "../firebase";

export function EmergentWindow({id, closeModal}) {

    const deleteTweet = (id) => {
        firestore.collection("tweets").doc(id).delete();
        closeModal();
     };

    return (
        <div className="window-notice" id="window-notice">
            <div className="content">
                <div className="">¿Quieres eliminar este mensaje?</div>
                <div className="content-buttons">
                    <button type="button" className="bWindowEmergent" onClick={closeModal}>Cancelar</button>
                    <button type="button" className="bWindowEmergentAccept" onClick={() => deleteTweet(id)}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}