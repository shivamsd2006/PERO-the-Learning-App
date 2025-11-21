import { useState } from "react";
import { CallAi } from "./api.js";

function GroupingPage({ content }) {
    const [info, setInfo] = useState('');
    const [feedback, setFeedback] = useState('');


    async function submitGrouping() {
        if (info.trim() !== '') {
            const response = await CallAi();
            if (response) {
                setFeedback(response);
            }
        }
    }

   async function genGrouping() {
        const response = await CallAi(`
You are an expert at information synthesis. Your task is to read the following text and organize its main ideas into logical groups.

Source Text
"${appState.uploadedContent}"

Create a summary by grouping the key concepts. Your response must be ONLY formatted in simple HTML. Use an <h3> heading for each main group title and an unordered list (<ul> and <li>) for the points within each group.
Do not include any conversational preamble.
`);
        if (response) {
            setGrouping(response);
        }
    }

    return (
        <>
            <div id="box">
                <h2>Group that info here? how that info is realated to your previous knowledge</h2>
                <textarea placeholder="" id="groupedInfo" value={info} onChange={(e)=>setInfo(e.target.value)}></textarea>
                <button onClick={submitGrouping} id="uploadBtn">upload</button>
                <div id="showFeedback">
                    {feedback}
                </div>

                <h3>let PERO group it for you</h3>

                <button id="genGrouping" onClick={genGrouping}>group</button>
                <div id="showGrouping">
                    {grouping}
                </div>


            </div>

        </>

    );
}
export default GroupingPage