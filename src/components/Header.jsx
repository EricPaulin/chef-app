// its good practice to import static objects
import chefLogo from "/src/images/chef.png"

export default function Header() {

    function reloadPage() {
        window.location.reload()
    }

    return (
        <header>
            <img src={chefLogo} onClick={ reloadPage }/>
            <h1> AI Chef </h1>
        </header>
    )
}