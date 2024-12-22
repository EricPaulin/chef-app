import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant recieving a list of 
ingredients from a user to then suggests a recipe they could make 
with some or all of those ingredients.`

const hf = new HfInference(import.meta.env.VITE_RECIPE_KEY)

export default async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        {/* Return AI Generated Choices Back to User */}
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}