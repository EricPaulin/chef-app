import ReactMarkdown from "react-markdown"
import chef2 from "/src/images/chef2.png"

export default function ChefRecipe(props) {

    function reloadPage() {
        window.location.reload();
    }


    return (
        <section className="ai-recipe-container" aria-live="polite">
            <img src={chef2}/>
            <h2> RoboChef thinks... </h2>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>

            <h1> Try Again with new Ingredients? </h1>
            <button onClick={ reloadPage }> New Recipe </button>
        </section>
    )
}