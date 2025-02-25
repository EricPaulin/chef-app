export default function IngredientsList(props) {

    // gets removeIngredient from parent and handles in child component
    function handleRemoveIngredient(ingredientId) {
        props.removeIngredient(ingredientId)
    }

    // ingredients array
    let ingredientsListItems = props.ingredients.map((ingredient, index) => (
        // id and ingredient use in case of duplicates (same name, diff id)
        <div className="ingredient" key={`${ingredient}-${index}`}>
            <li>{ingredient}</li>
            <button 
                key={`${ingredient}-${index}-btn`} 
                onClick={() => handleRemoveIngredient(ingredient.id || index)}
                > x 
            </button>
        </div>
    ))

    return (
        <section>    
            {/* Ingredients List */}
            <div className="ingredients-title"> Ingredients </div>
            <ul className="ingredients-list" aria-live="polite">  
                {ingredientsListItems} 
            </ul>
        </section>
    )
}