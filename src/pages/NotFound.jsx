import sadWindow from "../resources/window-broken-pixel.svg"
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return(
        <main className="bodyNotFound">
            <h1 className="tittle404" style={{marginTop: "30px"}}>I'm sorry something went wrong...</h1>
            <h1 className="tittle404">the page you are looking is <span>not available :(</span></h1>
            <img src={sadWindow} alt="Error 404" className="imgNotFound"/>
            <button onClick={() => navigate(-1)} className="backButton">Back</button>
        </main>
    )
}