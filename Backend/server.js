require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;
const apiKey = process.env.geminiApiKey;

app.use(express.json());

app.post('/api/generate', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const link = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        const requestBody = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }

        const reply = await fetch(link, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });


        if (!reply.ok) {
            const errMessage = await reply.json();
            throw new Error(`Api ERROR:--->${reply.status}    ${errMessage.error.message}`);
        }
        const data = await reply.json();
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        alert('Ai error: ' + error.message);
        console.log('ERROR:--', error);
        return null
    }

})



app.listen(port, () => {
    console.log(`PERO server is running on http://localhost:${port}`);
});