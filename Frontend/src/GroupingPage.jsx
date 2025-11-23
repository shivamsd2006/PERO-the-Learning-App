import { useState } from "react";
import { CallAi } from "./api.js";
import { useOutletContext } from "react-router-dom";

function GroupingPage() {
    const {content} = useOutletContext();
    const [info, setInfo] = useState('');
    const [feedback, setFeedback] = useState('');
    const [grouping, setGrouping] = useState('');


    async function submitGrouping() {
        if (info.trim() !== '') {
            const response = await CallAi(` Provide feedback on the following grouped information: ${info} based on this text ${content}. Is the grouping logical and effective? Suggest improvements if necessary. Format your response in simple HTML.`)  
                     if (response) {
                setFeedback(response);
            }
        }
    }

   async function genGrouping() {
        const response = await CallAi(`
You are an expert at information synthesis. Your task is to read the following text and organize its main ideas into logical groups.

Source Text
"${content}"

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
                <div id="showFeedback" dangerouslySetInnerHTML={{ __html: feedback }}>
                </div>

                <h3>let PERO group it for you</h3>

                <button id="genGrouping" onClick={genGrouping}>group</button>
                <div id="showGrouping" dangerouslySetInnerHTML={{ __html: grouping }}>
                </div>


            </div>

        </>

    );
}
export default GroupingPage