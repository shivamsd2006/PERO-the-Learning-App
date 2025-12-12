import { useState, useEffect } from "react";
import { CallAi } from "./api.js";
import { useOutletContext, useNavigate } from "react-router-dom";
import { BiSend, BiBot } from "react-icons/bi";

function RetrievalPage() {
    const { content } = useOutletContext();
    const navigate = useNavigate();

    // State
    const [qus, setQus] = useState('');           // AI Questions
    const [text, setText] = useState('');         // User Answer
    const [feedback, setFeedback] = useState(''); // AI Feedback
    const [isLoading, setIsLoading] = useState(true);

    function onOverlearning() {
        navigate('/Overlearning');
    }

    // Effect: Fetch retrieval questions on load
    useEffect(() => {
        async function getRetrievalQus() {
            const prompt = `you are a profound critical thinker.your goal is to challenge others thinking through asking deep out of the box critical questions.now generate 4 curveball questions from this text: ${content}. Format as a html list.`;
            const response = await CallAi(prompt);
            if (response) {
                setQus(response);
            } else {
                setQus('<p>Error: Could not load questions.</p>');
            }
            setIsLoading(false);
        }
        getRetrievalQus();
    }, [content]);

    // Handler: Check the user's answer
    async function checkAns() {
        if (text.trim() !== '') {
            setIsLoading(true);
            setFeedback('<p>Checking your answers...</p>');
            
            const prompt = `Here are the questions ${qus}. Here are the user's answers: ${text}. Provide feedback on the answers, format as Html.`;
            const response = await CallAi(prompt);
            
            if (response) {
                setFeedback(response);
            }
            setIsLoading(false);
        } else {
            alert("Please write an answer first.");
        }
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 bg-gray-50">
            {/* Main Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    Step 3: Retrieval
                </h1>
                <p className="text-lg text-gray-600 mb-12 font-medium">
                    Let's hit this topic with multiple perspectives.
                </p>

                {/* AI Questions Area */}
                <div className="mb-10 text-left bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                    {isLoading && !qus ? (
                         <div className="flex items-center justify-center gap-2 text-gray-500 font-medium">
                            <BiBot className="animate-bounce" size={24}/> 
                            <p>Generating Curveball Questions...</p>
                         </div>
                    ) : (
                        <div className="text-lg leading-relaxed font-mono [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-4 text-gray-800" dangerouslySetInnerHTML={{ __html: qus }} />
                    )}
                </div>

                {/* Input Section (Pill Style) */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Can you answer these questions?</h3>
                    
                    <div className="flex w-full max-w-2xl mx-auto bg-gray-100 border border-gray-200 rounded-full items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-white transition-all">
                        {/* Textarea */}
                        <textarea
                            id="ansInput"
                            className="flex-grow bg-transparent outline-none resize-none placeholder-gray-500 text-lg px-4 py-2 h-12 text-gray-700 disabled:opacity-50"
                            placeholder="Enter your answers here..."
                            rows={1}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={isLoading}
                        ></textarea>

                        {/* Check Button Icon */}
                        <button
                            onClick={checkAns}
                            id="checkBtn"
                            disabled={isLoading}
                            className="p-3 ml-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Check Answers"
                        >
                            <BiSend size={24} />
                        </button>
                    </div>

                    {/* Feedback Area */}
                    {feedback && (
                        <div id="ansFeedback" className="mt-6 p-6 bg-blue-50 text-blue-900 rounded-2xl text-left border-l-4 border-blue-500 animate-fade-in">
                            <h3 className="font-bold mb-2">Feedback:</h3>
                            <div dangerouslySetInnerHTML={{ __html: feedback }} />
                        </div>
                    )}
                </div>

                {/* Next Step Button */}
                <button
                    onClick={onOverlearning}
                    id="goToOverlearning"
                    disabled={isLoading}
                    className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Go to Overlearning →
                </button>

            </div>
        </section>
    );
}

export default RetrievalPage;