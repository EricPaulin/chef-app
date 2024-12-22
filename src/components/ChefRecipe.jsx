import ReactMarkdown from "react-markdown"

export default function ChefRecipe(props) {
    return (
        <section className="ai-recipe-container" aria-live="polite">
            <h2> The Chef reccomends... </h2>
            <ReactMarkdown>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}