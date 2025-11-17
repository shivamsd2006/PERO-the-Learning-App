import { useState } from "react";
import { CallAi } from "./api.js";

function GroupingPage({ content }) {
    const [info, setInfo] = useState('');
    const [feedback, setFeedback] = useState('');
    const [grouping, setGrouping] = useState('');


    async function submitGrouping() {
        if (info.trim() !== '') {
            const response = await CallAi(`is this gropuing rigght give feedback${info} made from this text ${content}`);
            if (response) {
                setFeedback(response);
            }
        }
    }

   async function genGrouping() {
        const response = await CallAi(`Genertae a grouping from this text${content}`);
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