import { useEffect } from "react";
import { useState } from "react";
import { CallAi } from "./api";
function OverlearningPage({ content }) {
    const [qus, setQus] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getOverlearningQus() {
            const response = await CallAi(`generate 20 creative + curveball question from this text :${content}`);
            if (response) {
                setQus(response);
            } else {
                setQus('<p>Failed to generate questions</p>');
            }
            setIsLoading(false);
        }
        getOverlearningQus();
    },[content])

    return (
        <>
            <div id="box">
                <h1>step 4 overlearning</h1>
                <h2>let PERO quiz you on this </h2>
                <div id="quiz" dangerouslySetInnerHTML={{ __html: isLoading ? 'Generating qus' : qus }}>

                </div>

            </div>

        </>
    );
}
export default OverlearningPage