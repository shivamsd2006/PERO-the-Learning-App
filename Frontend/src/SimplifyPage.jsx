import { useState } from "react";
import { CallAi } from "./api.js";
import { useOutletContext } from "react-router-dom";
import { BiSend, BiBot } from "react-icons/bi";

function SimplifyPage() {
    const { content } = useOutletContext();
    const [text, setText] = useState('');
    const [feedback, setFeedback] = useState('');
    const [ans, setAns] = useState('');

    async function uploadText() {
        if (text.trim() !== '') {
            const response = await CallAi(`
You are an expert editor who specializes in clear and simple communication. Your task is to compare the user's simplified text with the original source text and provide feedback.

**Original Text:**
"${content}"

**User's Simplified Version:**
"${text}"

Provide direct, actionable feedback in simple HTML using <p> tags. Comment on the clarity and accuracy of the simplification.
`);
            if (response) {
                setFeedback(response);
            }
        }
    }

    async function genSimplify() {
        const response = await CallAi(`
You are a skilled teacher explaining a complex topic to a beginner. Your task is to rewrite the following text in a simple, easy-to-understand summary.

**Original Text:**
"${content}"

Simplify the text so that a high school student can understand the main ideas. Use short sentences, clear language, and simple vocabulary.
Format your entire response using simple HTML <p> tags.
`);
        if (response) {
            setAns(response);
        }
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 bg-gray-50">
            {/* Main Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                    Simplify To Understand
                </h1>

                {/* Input Section (Pill Style) */}
                <div className="mb-10">
                    <div className="flex w-full max-w-2xl mx-auto bg-gray-100 border border-gray-200 rounded-full items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-white transition-all">
                        
                        {/* Textarea */}
                        <textarea
                            id="simplifiedText"
                            className="flex-grow bg-transparent outline-none resize-none placeholder-gray-500 text-lg px-4 py-2 h-12 text-gray-700"
                            placeholder="Write Down What You Understood"
                            rows={1}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>

                        {/* Upload/Send Button Icon */}
                        <button
                            onClick={uploadText}
                            id="uploadBtn"
                            className="p-3 ml-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
                            aria-label="Upload Simplification"
                        >
                            <BiSend size={24} />
                        </button>
                    </div>

                    {/* Feedback Area */}
                    {feedback && (
                        <div id="simplifiedFeedback" className="mt-6 p-6 bg-blue-50 text-blue-900 rounded-2xl text-left border-l-4 border-blue-500 animate-fade-in">
                            <h3 className="font-bold mb-2">Feedback:</h3>
                            <div dangerouslySetInnerHTML={{ __html: feedback }} />
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
                        onClick={genSimplify}
                        id="genBtn"
                        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95"
                    >
                        <BiBot size={22} />
                        Let PERO Simplify It For You
                    </button>

                    {/* AI Generated Simplification Output */}
                    {ans && (
                        <div id="showSimplify" className="mt-8 p-6 bg-gray-800 text-gray-100 rounded-2xl text-left shadow-inner animate-fade-in w-full max-w-3xl">
                            <h3 className="flex items-center gap-2 font-bold mb-3 text-blue-300">
                                <BiBot /> PERO's Simplification:
                            </h3>
                            <div className="text-lg leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: ans }} />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default SimplifyPage;