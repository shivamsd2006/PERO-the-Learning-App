import {  useState } from "react"
import { CallAi } from "./api.js";
function AnalogyPage({ content }) {
    const [analogie, setAnalogie] = useState('');
    const [feedback, setFeedback] = useState('');
    const [receive, setReceive] = useState('');
    async function uploadAnalogie() {
        try {


            if (analogie.trim() !== '') {
                const response = await CallAi(`
You are a critical thinker. Analyze the user's analogy and explain how well it connects to the core concepts of the provided text.Source Text:
"${content}"
User's Analogy:
"${analogie}"

Provide your feedback in simple HTML, using <p> tags for paragraphs. Start directly with the analysis.
`);
                if (response) {
                    setFeedback(response);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function genAnalogie() {
        const response = await CallAi(`
You are a creative teacher. Your task is to generate 2 distinct analogies to help someone deeply understand the following text.
Source Text:
"${content}"

Format your response in simple HTML. For each analogy, use an <h3> heading for the analogy's title (e.g., "The Garden Analogy") and <p> tags for the explanation. Keep the total response under 150 words.
`)
        if (response) {
            setReceive(response);
        }
    }

    return (
        <>
            <div id="box">
                <h1>Learn by making Anologies</h1>
                <div id="analogieBox">
                    <textarea placeholder="What anologies you can think of ?" id="inputAnalogie" value={analogie} onChange={(e) => setAnalogie(e.target.value)}></textarea>
                    <button onClick={uploadAnalogie} id="uploadBtn">upload</button>
                </div>
                <div id="feedbackBox">
                    {feedback}

                </div>
                <button onClick={genAnalogie} id="generateBtn">or let pero make it for you</button>
                <div id="aiAnalogie">
                    {receive}

                </div>

            </div>


        </>
    );
}

export default AnalogyPage