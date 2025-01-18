import loadLogo from "/src/images/robochef-thinking.gif"

export default function LoadingScreen() {

    return (
        <div className="loading-screen">
            <img src={loadLogo} />
        </div>
    )
}