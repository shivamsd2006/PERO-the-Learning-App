import { useState } from "react"
import { CallAi } from "./api.js";
import { useOutletContext } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
function AnalogyPage() {
    const { content } = useOutletContext();
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
    function handleTextArea(e) {
        setAnalogie(e.target.value);
        e.target.style.height ='auto';
        e.target.style.height =`${e.target.scrollHeight}px`;
    }

    return (
        <>
            <section className="flex flex-col items-center justify-center min-h-[80vh]  ">
                {/* Main Card Container */}
                <div className="w-full  bg-white  p-8 md:p-12 text-center ">

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                        Learn By Making Analogies
                    </h1>

                    {/* Input Section (Pill Style) */}
                    <div className="mb-10">
                        <div className="flex w-full max-w-2xl mx-auto rounded-full items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-white transition-all border-1 border-blue-600">

                            {/* Textarea */}
                            <textarea
                                id="inputAnalogie"
                                className="flex-grow bg-transparent focus:outline-none resize-none placeholder-gray-500 text-lg px-4 py-2 max-h-20 text-gray-700  overflow-y:hidden "
                                placeholder="What Analogies You Can Think Of?"
                                rows={1}
                                value={analogie}
                                onChange={handleTextArea}
                            ></textarea>

                            {/* Upload/Send Button Icon */}
                            <button
                                onClick={uploadAnalogie}
                                id="uploadBtn"
                                className="p-3 cursor-pointer rounded-full transition-colors active:scale-95"
                                aria-label="Upload Analogy"
                                
                            >
                                <AiOutlineSend />

                            </button>
                        </div>

                        {/* Feedback Area (User's Submitted Analogy Feedback) */}
                        {feedback && (
                            <div id="feedbackBox" className="mt-6 p-6 bg-blue-50 text-blue-900 rounded-2xl text-left border-l-4 border-blue-500 animate-fade-in">
                                <h3 className="font-bold mb-2">Feedback:</h3>
                                <p className="text-lg leading-relaxed">{feedback}</p>
                            </div>
                        )}
                    </div>

                    {/* AI Generation Section */}
                    <div className="flex flex-col items-center">
                        {/* OR Divider */}
                        <div className="flex items-center w-full max-w-md mb-8">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <span className="px-4 text-gray-500 font-medium">OR</span>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={genAnalogie}
                            id="generateBtn"
                            className="flex items-center gap-3 p-3 bg-blue-600 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95"
                        >

                            Let PERO Make It For You
                        </button>

                        {/* AI Generated Analogy Output */}
                        {receive && (
                            <div id="aiAnalogie" className="mt-8 p-6 bg-gray-800 text-gray-100 rounded-2xl text-left shadow-inner animate-fade-in w-full max-w-3xl">
                                <h3 className="flex items-center gap-2 font-bold mb-3 text-blue-300">
                                     PERO's Analogy:
                                </h3>
                                <p className="text-lg leading-relaxed font-mono">{receive}</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>


        </>
    );
}

export default AnalogyPage