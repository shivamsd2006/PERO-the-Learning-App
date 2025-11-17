import {  useState } from "react"
import { CallAi } from "./api.js";
function AnalogyPage({ content }) {
    const [analogie, setAnalogie] = useState('');
    const [feedback, setFeedback] = useState('');
    const [receive, setReceive] = useState('');
    async function uploadAnalogie() {
        try {


            if (analogie.trim() !== '') {
                const response = await CallAi(`give feedback on this analogie ${analogie} made by this text ${content}`);
                if (response) {
                    setFeedback(response);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function genAnalogie() {
        const response = await CallAi(`create a creative analogie from this text ${content}`)
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