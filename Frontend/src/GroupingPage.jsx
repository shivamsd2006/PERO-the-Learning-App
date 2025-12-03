import { useState } from "react";
import { CallAi } from "./api.js";
import { useOutletContext } from "react-router-dom";
import { BiSend, BiBot } from "react-icons/bi";

function GroupingPage() {
    const { content } = useOutletContext();
    const [info, setInfo] = useState('');
    const [feedback, setFeedback] = useState('');
    const [grouping, setGrouping] = useState('');

    async function submitGrouping() {
        if (info.trim() !== '') {
            const response = await CallAi(`
You are a logical reasoning expert. Your task is to analyze the user's attempt to group and structure the information from the source text.

**Source Text:**
"${content}"

**User's Grouping:**
"${info}"

Provide direct feedback on the logical consistency and clarity of the user's grouping. Explain its strengths and suggest specific improvements.
Format your entire response using simple HTML tags like <p> and <strong>. Do not include any conversational introduction.
`);
            if (response) {
                setFeedback(response);
            }
        }
    }

    async function genGrouping() {
        const response = await CallAi(`
You are an expert at information synthesis. Your task is to read the following text and organize its main ideas into logical groups.

**Source Text:**
"${content}"

Create a summary by grouping the key concepts. Your response must be ONLY formatted in simple HTML. Use an <h3> heading for each main group title and an unordered list (<ul> and <li>) for the points within each group.
Do not include any conversational preamble.
`);
        if (response) {
            setGrouping(response);
        }
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 bg-gray-50">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
                    Group Information & Find Patterns
                </h1>

                <div className="mb-10">
                    <div className="flex w-full max-w-2xl mx-auto bg-gray-100 border border-gray-200 rounded-full items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-white transition-all">
                        <textarea
                            id="groupedInfo"
                            className="flex-grow bg-transparent outline-none resize-none placeholder-gray-500 text-lg px-4 py-2 h-12 text-gray-700"
                            placeholder="Group info here. How is it related to your knowledge?"
                            rows={1}
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        ></textarea>

                        <button
                            onClick={submitGrouping}
                            id="uploadBtn"
                            className="p-3 ml-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
                            aria-label="Upload Grouping"
                        >
                            <BiSend size={24} />
                        </button>
                    </div>

                    {feedback && (
                        <div id="showFeedback" className="mt-6 p-6 bg-blue-50 text-blue-900 rounded-2xl text-left border-l-4 border-blue-500 animate-fade-in">
                            <h3 className="font-bold mb-2">Feedback:</h3>
                            <div dangerouslySetInnerHTML={{ __html: feedback }} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex items-center w-full max-w-md mb-8">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-gray-500 font-medium">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <button
                        onClick={genGrouping}
                        id="genGrouping"
                        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95"
                    >
                        <BiBot size={22} />
                        Let PERO Group It For You
                    </button>

                    {grouping && (
                        <div id="showGrouping" className="mt-8 p-6 bg-gray-800 text-gray-100 rounded-2xl text-left shadow-inner animate-fade-in w-full max-w-3xl">
                            <h3 className="flex items-center gap-2 font-bold mb-3 text-blue-300">
                                <BiBot /> PERO's Grouping:
                            </h3>
                            <div className="text-lg leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: grouping }} />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default GroupingPage;