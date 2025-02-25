export default function RecipePrompt(props) {
    return (
        <div className="recipes-container">
            <button onClick={props.getRecipe} > Generate Recipe </button>
        </div>
    )
}