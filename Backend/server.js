import express from 'express'
import dotenv from 'dotenv'
import connectDb from './src/db/db.js';
const app = express();
dotenv.config({ path: './.env' })
const port = process.env.PORT;
const apiKey = process.env.GEMINI_API_KEY;
console.log(apiKey)

connectDb()

if (!apiKey) { console.error('No GEMINI_API_KEY in .env'); }

app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/api/generate', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const link = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

        const requestBody = {
            "contents": [{
                "parts": [{
                    "text": userPrompt
                }]
            }]
        }

        const reply = await fetch(link, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });


        if (!reply.ok) {
            const errMessage = await reply.json();
            throw new Error(`Api ERROR:--->${reply.status}    ${errMessage.error.message}`);
        }
        const data = await reply.json();
        const feedback = data.candidates[0].content.parts[0].text.trim();
        res.json({ feedback: feedback });
    } catch (error) {

        console.error('ERROR in api:--', error);
        res.status(500).json({ error: 'An error occured while communicating with the AI.' });
    }
})



app.listen(port, () => {
    console.log(`PERO server is running on http://localhost:${port}`);
});