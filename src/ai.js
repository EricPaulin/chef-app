import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant recieving a list of 
ingredients from a user to then suggests a recipe they could make 
with some or all of those ingredients.`

export default async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const hf = new HfInference(import.meta.env.VITE_RECIPE_KEY)
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        /* Error Handling / Return ChefRecipe (response) */
        // Handle API Reported Errors
        if (response && response.error) {
            console.error("Hugging Face API Error:", response.error)
            throw new Error(`Hugging Face API Error: ${response.error}`)
        }

        // Handle Unexpected Response Structure
        if (response && response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
            return response.choices[0].message.content
        } else {
            console.error("Unexpected Hugging Face API response:", response)
            throw new Error("Unexpected Hugging Face API response.")
        }
    } catch (err) {
        console.error("Error in getRecipeFromMistral:", err)
        // Re-throw the error to be caught in the parent component
        throw err
    }
}