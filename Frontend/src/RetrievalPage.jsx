import { useState, useEffect } from "react";
import { CallAi } from "./api.js";
function RetrievalPage({ content, onOverlearning }) {
    const [qus, setQus] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [ans, setAns] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        async function getRetrievalQus() {
            const prompt = `generate 4 curveball questions from this text: ${content}.Format as a html list.`
            const response = await CallAi(prompt);
            if (response) {
                setQus(response);
            } else {
                setQus('<p>Error:Could not load questions.</>')
            }
            setIsLoading(false);
        }
        getRetrievalQus();
    }, [content]);


    async function checkAns() {
        if (ans.trim() !== '') {
            setIsLoading(true);
            setAns('<p>Checking your answers...</p>');
            const response = await CallAi(`Here are the questions ${qus}.here are the user's answers:${text}.provide feedback on the answers , format as Html.`)
            if (response) {
                setAns(response);
            }
            setIsLoading(false);
        }
    }

    return (
        <>
            <div id="box">
                <h1>step 3 Retrieval</h1>
                <h2>let's hit this topic with multilple perspectives</h2>
                <div id="curveBall" dangerouslySetInnerHTML={{ __html: isLoading ? '<p>Loading Questions...</p>' : qus }}>

                </div>
                <h3>can you answer these questions ? </h3>
                <div id="enter">
                    <textarea placeholder="Enter your Answers" id="ansInput" value={text} onChange={(e) => setText(e.target.value)} disabled={isLoading}></textarea>

                    <button onClick={checkAns} id="checkBtn" disabled={isLoading}>{isLoading ? 'checking...' : 'check'}</button>
                    <div id="ansFeedback" dangerouslySetInnerHTML={{ __html: ans }} />
                </div>
            </div>
            <button onClick={onOverlearning} id="goToOverlearning" disabled={isLoading}>overlearning</button>

        </>
    );
}
export default RetrievalPage