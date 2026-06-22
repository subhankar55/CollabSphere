import {model} from "./gemini.js"

export const chatWithGemini = async (message) => {

    const prompt = `You are CollabSphere AI.

    Analyze the following project conversation and provide:

    1. Summary
    2. Tasks
    3. Decisions
    4. Blockers
    5. Next Steps
    6. Workflow Suggestions

    Use plain text and clear headings.


    Conversation:
    ${message}`;

    try {
       const result = await model.generateContent(prompt);
        return result.response.text(); 
    } catch (error) {
        throw new Error(error.message);
    }

}