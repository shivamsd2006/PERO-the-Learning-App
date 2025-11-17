import { useState } from "react";
import { CallAi } from "./api.js";

function SimplifyPage({ content }) {
    const [text, setText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [ans, setAns] = useState('');
    async function uploadText() {
        if (text.trim() != '') {
            const response = await CallAi(`give feedback on thsi simplified text ${text} from this text `)
            if (response) {
                setFeedback(response);
            }
        }
    }

    async function genSimplify() {
        const response = await CallAi(`rewrite this in very simple language ${content}`);
        if (response) {
            setAns(response);
        }
    }
    return (
        <>
            <div id="box">
                <h3>write down what you understood,so PERO can check your understanding</h3>
                <textarea placeholder="" id="simplifiedText" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <button onClick={uploadText} id="uploadBtn">upload</button>
                <div id="simplifiedFeedback">
                    {feedback}
                </div>
                <h4>or let PERO Simplify it for you</h4>
                <button onClick={genSimplify} id="genBtn">generate</button>
                <div id="showSimplify">
                    {ans}
                </div>
            </div>

        </>
    );

}

export default SimplifyPage