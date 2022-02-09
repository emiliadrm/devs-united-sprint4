import sadWindow from "../resources/window-broken-pixel.svg"

export function NotFound() {
    return(
        <main className="bodyNotFound">
            <h1 className="tittle404">I'm sorry something went wrong...</h1>
            <img src={sadWindow} alt="Error 404" className="imgNotFound"/>
            <h1 className="tittle404">the page you are looking is <span>not available :(</span></h1>
        </main>
    )
}