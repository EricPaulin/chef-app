import ReactMarkdown from "react-markdown"
import chef2 from "/src/images/chef2.png"

export default function ChefRecipe(props) {

    function reloadPage() {
        window.location.reload();
    }

    return (
        <section className="ai-recipe-container" aria-live="polite">

            <h2> RoboChef says... </h2>
            <img src={chef2} />
            <ReactMarkdown className="react-markdown">
                {props.recipe}
            </ReactMarkdown>

            <button onClick={reloadPage}> New Recipe </button>
        </section>
    )
}