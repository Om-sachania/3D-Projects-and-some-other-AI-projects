import express from "express"
import * as dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const router = express.Router();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/').post(async(req,res)=>{
    try{
        const {prompt} = req.body;

        if (!prompt) {
            return res.status(400).json({message: "Prompt is required"});
        }

        // Step 1: Use Gemini to enhance the prompt
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const enhancePrompt = `Enhance this prompt for image generation, make it more detailed and vivid for creating a high-quality image: "${prompt}". Return only the enhanced prompt, no additional text.`;

        const geminiResult = await model.generateContent(enhancePrompt);
        const enhancedPrompt = geminiResult.response.text().trim();

        // Step 2: Generate image using Stability AI API
        const stabilityResponse = await fetch(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                },
                body: JSON.stringify({
                    text_prompts: [
                        {
                            text: enhancedPrompt,
                        },
                    ],
                    cfg_scale: 7,
                    height: 1024,
                    width: 1024,
                    steps: 30,
                    samples: 1,
                }),
            }
        );

        if (!stabilityResponse.ok) {
            throw new Error(`Stability AI API error: ${stabilityResponse.status}`);
        }

        const responseJSON = await stabilityResponse.json();
        const base64Image = responseJSON.artifacts[0].base64;

        res.status(200).json({
            photo: base64Image,
            enhancedPrompt: enhancedPrompt,
            originalPrompt: prompt
        });

    }catch(error){
        console.error('API Error:', error);
        res.status(500).json({message: "Something went wrong with image generation"})
    }
})

export default router;
