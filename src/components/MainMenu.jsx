import React, { useEffect } from "react"
import IngredientsList from "./IngredientsList"
import ChefRecipe from "./ChefRecipe"
import getRecipeFromMistral from "../ai"
import Intro from "./Intro"
import LoadingScreen from "./LoadingScreen"
import ErrorMessage from "./ErrorMessage"
import RecipePrompt from "./RecipePrompt"

export default function MainMenu() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, isLoading] = React.useState(false)
    const [aiRecipe, setAiRecipe] = React.useState(false)

    // error handling
    const [hasError, setHasError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState("")

    // async because calling API makes a promise
    async function getRecipe() {

        /* loading screen on, disable components, reset ingredients */
        isLoading(true)
        setHasError(false)
        setIngredients([])
        setAiRecipe(true)

        console.log("hello1")
        console.log(ingredients)

        // API Try/Catch
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)
            console.log("hello2")
        }
        catch (error) {
            console.log("hello3")
            setHasError(true)
            console.error("Error fetching recipe:", error);

            if (error.message.includes("API key")) {
                setErrorMsg("Invalid API key. Please try again later.")
            } else if (error.message.includes("network")) {
                setErrorMsg("Network error. Please check your internet connection.")
            } else if (error.message.includes("429")) {
                setErrorMsg("Too many requests. Please wait a moment and try again.")
            } else {
                setErrorMsg("Failed to generate recipe. Please try again later.")
            }
        }

        /* loading screen off + reset ingredients list */
        finally {

            isLoading(false)
        }
    }

    // add ingredients to list
    function addIngredient(formData) {
        // initally no error
        setHasError(false)

        const newIngredient = formData.get("ingredient").toLowerCase()

        // test: check if ingredient added correctly
        //console.log(`Adding ${newIngredient}`)

        // check if invalid ingredient
        if (newIngredient === " " || newIngredient === "") {
            setHasError(true)
            setErrorMsg(`Enter a valid ingredient`)
            return
        }

        // check if ingredient already exists (singlular + plural check) 
        const ingredientExists = ingredients.some((existingIngredient) => {

            const arrayIngredient = existingIngredient.toLowerCase()
            return (
                newIngredient === arrayIngredient ||
                newIngredient === arrayIngredient + " " ||
                newIngredient === arrayIngredient + 's' ||
                newIngredient === arrayIngredient + 's ' ||
                newIngredient === arrayIngredient.slice(0, -1) ||
                newIngredient === arrayIngredient.slice(0, -1) + " "
            )
        })

        // error message if ingredient already added
        if (ingredientExists) {
            setHasError(true)
            setErrorMsg(`${newIngredient} has already been added`)
            return
        }
        else {
            setHasError(false)
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    // test: check if ingredient added (useEffect gives updated state)
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

        //test: check if ingredient removed
        console.log("Current Ingredients:", ingredients)
    }

    return (
        <main>
            {/* Loading Screen */}
            {loading && <LoadingScreen />}

            {/* Provide Instructions + Context when no Ingredients added */}
            {(ingredients.length == 0 && !aiRecipe) ? <Intro /> : null}

            {!aiRecipe && (
                <form className="ingredient-form" action={addIngredient}>
                    <input
                        name="ingredient"
                        type="text"
                        placeholder="e.g. cilantro"
                        aria-label="Add Ingredient"
                    />
                    <button className="add-btn"> + Add </button>
                </form>
            )}

            {/* Error Message */}
            {hasError && <ErrorMessage message={errorMsg} />}

            {/* Render Ingredients List when > 0  and Recipe isn't Present */}
            {(ingredients.length > 0 && !recipe) ? <IngredientsList ingredients={ingredients} getRecipe={getRecipe} removeIngredient={removeIngredient} /> : null}

            {/* Render Recipe from AI */}
            {recipe ? <ChefRecipe recipe={recipe} /> : null}

            {/* Generate Recipe Button */}
            {ingredients.length > 3 ? <RecipePrompt ingredients={ingredients} getRecipe={getRecipe} /> : null}

        </main>
    )
} 