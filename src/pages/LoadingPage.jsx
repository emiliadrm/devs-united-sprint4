export default function LoadingPage () {
    return(
        <div className="loadingStyle">
            <div className="linealTextLoad">
                <h1 className="loadingText css-selector">LOADING</h1>
                <h1 className=" loadingText bounce">.</h1>
                <h1 className=" loadingText bounce2">.</h1>
                <h1 className=" loadingText bounce3">.</h1>
            </div>
            <div className="barLoading css-selector2">
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
                <div className="spaceStyle"></div>
            </div>
        </div>
    )
}