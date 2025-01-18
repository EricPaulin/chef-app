import React, { useEffect } from "react"
import IngredientsList from "./IngredientsList"
import ChefRecipe from "./ChefRecipe"
import getRecipeFromMistral from "../ai"
import Intro from "./Intro"
import LoadingScreen from "./LoadingScreen"

export default function MainMenu() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, isLoading] = React.useState(false)

    // async because calling API makes a promise
    async function getRecipe() {

        /* loading screen on */
        isLoading(true)

        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)

       /* loading screen off */
        isLoading(false)
    }
    
    // add ingredients to list
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    // check if properly added to list (useEffect gives updated state)
    useEffect(() => {
        console.log("Current Ingredients:", ingredients); 
      }, [ingredients])

    // remove ingredient from list
    function removeIngredient(ingredientId) {
        setIngredients((prevIngredients) => 
            prevIngredients.filter((ingredient, index) => 
              !(ingredient.id === ingredientId || (ingredient.id === undefined && index === ingredientId)) 
            )
        )

        // check if properly removed from list
        console.log("Current Ingredients:", ingredients)
    }

    return (
        <main>
            {/* Loading Screen */}
            {loading && <LoadingScreen />}

            {/* Provide Instructions + Context when no Ingredients added */}
            {ingredients.length == 0 ? <Intro/> : null}
            
            <form className="ingredient-form" action={addIngredient}>
                <input
                    name="ingredient"
                    type="text"
                    placeholder="e.g. cilantro"
                    aria-label="Add Ingredient"
                />
                <button className="add-btn"> + Add </button>
            </form>

            {/* Render Ingredients List when > 0  and Recipe isn't Present */}
            {(ingredients.length > 0 && !recipe) ? <IngredientsList ingredients={ingredients} getRecipe={getRecipe} removeIngredient={removeIngredient} /> : null}
            
            {/* Render Recipe from AI */}
            {recipe ? <ChefRecipe recipe={recipe} /> : null}
        </main>
    )
} 