import React from "react"
import IngredientsList from "./IngredientsList"
import ChefRecipe from "./ChefRecipe"
import getRecipeFromMistral from "../ai"

export default function MainMenu() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")

    // async because calling API makes a promise
    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }
    
    // add ingredients to list
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form className="ingredient-form" action={addIngredient}>
                <input
                    name="ingredient"
                    type="text"
                    placeholder="e.g. cilantro"
                    aria-label="Add Ingredient"
                />
                <button> Add Ingredient </button>
            </form>

            {/* Render Ingredients List when > 0  */}
            {ingredients.length > 0 ? <IngredientsList ingredients={ingredients} getRecipe={getRecipe} /> : null}
            
            {/* Render Recipe from AI */}
            {recipe ? <ChefRecipe recipe={recipe} /> : null}
        </main>
    )
} 