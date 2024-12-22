export default function IngredientsList(props) {

     // ingredients array
     const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand: </h2>
            <ul className="ingredients-list" aria-live="polite">  {ingredientsListItems} </ul>

            {/* Get Recipe only loads when Ingredients > 3 */}
            {props.ingredients.length > 3 ? <div className="recipes-container">
                <div>
                    <h2> Ready for a Recipe? </h2>
                    <p> Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe} > Get a Recipe </button>
            </div> : null}
        </section>
    )
}