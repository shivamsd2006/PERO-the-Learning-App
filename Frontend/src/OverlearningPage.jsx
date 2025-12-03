import { useEffect, useState } from "react";
import { CallAi } from "./api";
import { useOutletContext } from "react-router-dom";
import { BiBot, BiLoaderAlt } from "react-icons/bi"; // Import icons for visual polish

function OverlearningPage() {
    const { content } = useOutletContext();
    const [qus, setQus] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getOverlearningQus() {
            const prompt = `
You are an exam preparation tutor. Generate a list of 20 practice questions (creative & curveball) and their brief answers based on the following text.

**Source Text:**
"${content}"

Format your response in simple HTML. For each item, use a <strong> tag for the question and a <p> tag for the answer. Do not include any conversational preamble.
`;
            const response = await CallAi(prompt);
            if (response) {
                setQus(response);
            } else {
                setQus('<p class="text-red-500">Failed to generate questions. Please try again.</p>');
            }
            setIsLoading(false);
        }
        getOverlearningQus();
    }, [content]);

    return (
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10 bg-gray-50">
            {/* Main Card Container */}
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-gray-100">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    Step 4: Overlearning
                </h1>
                <p className="text-lg text-gray-600 mb-12 font-medium">
                    Let PERO quiz you on this until you master it.
                </p>

                {/* Quiz Content Area */}
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-inner text-left min-h-[300px]">
                    {isLoading ? (
                        // Loading State UI
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-blue-600">
                            <BiLoaderAlt className="animate-spin text-4xl" />
                            <span className="text-lg font-semibold text-gray-600">
                                Generating your master quiz...
                            </span>
                        </div>
                    ) : (
                        // Questions Display UI
                        <div>
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                                <BiBot className="text-blue-600 text-2xl" />
                                <h3 className="text-xl font-bold text-gray-800">Your Practice Set</h3>
                            </div>
                            
                            {/* Styling the inner HTML content:
                                - Adds space between questions
                                - Styles the question text (strong tags)
                                - Styles the answer text (p tags)
                            */}
                            <div 
                                className="text-lg leading-relaxed text-gray-800 space-y-6 [&_strong]:block [&_strong]:text-blue-800 [&_strong]:mb-1 [&_p]:ml-4 [&_p]:text-gray-600" 
                                dangerouslySetInnerHTML={{ __html: qus }} 
                            />
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default OverlearningPage;