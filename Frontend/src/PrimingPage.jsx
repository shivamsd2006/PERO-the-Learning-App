import { useState } from "react";
import { CallAi } from "./api";
import { useOutletContext ,useNavigate} from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";



function PrimingPage() {
  const{content} = useOutletContext();
  const [qus, setQus] = useState('');
  const [feedback, setFeedbck] = useState('');
  const [aiQus, setAiQus] = useState('');
  const navigate = useNavigate();

  function toEncoding(){
    navigate('/Encoding')
  }

  async function handleQus(event) {

    try {
      event.preventDefault();
      if (qus.trim() != '') {
        const response = await CallAi(`
You are an expert learning coach providing structured, clear feedback.

Analyze the following questions based on the study topic.

**Study Topic:**
"${content}"

**User's Questions:**
"${qus}"

Return your response STRICTLY in valid HTML — not Markdown. 
 Use:
- <h3> for section headings
- <ul> and <li> for bullet points
- No asterisks (*), hashes (#), or Markdown formatting
- No explanations before or after

Final HTML structure example:
<h3>Strengths</h3>
<ul>
  <li>First strength...</li>
  <li>Second strength...</li>
</ul>
<h3>Areas for Improvement</h3>
<ul>
  <li>First improvement...</li>
  <li>Second improvement...</li>
</ul>
`);
        if (response) {
          setFeedbck(response);
        }
      } else {
        alert('please type your questions');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function generateQus() {
    try {
      const response = await CallAi(`
You are an profound critical thinker. Your task is to generate exactly 6 engaging and thought-provoking questions based on the following text.Text:
"${content}"

Your response must be ONLY an HTML ordered list (<ol> and <li> tags).
Do not include any other text, headings, or introductions.
Each question should be concise and designed to make a student want to find the answer in the text.
`);
      if (response) {
        setAiQus(response);
      }
    } catch (error) {
      console.log(error);
      alert('Failed to generate questions');
    }
  }

  function handleTextAreaInput(e) {
    setQus(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
  return (
    <>
     <section className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      
      <div className="w-full max-w-3xl text-center pb-8">
        
    
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
          Step 1 Priming
        </h1>
        
      
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Upload Your Questions About The Topic
        </h2>
        
        {/* Description Text */}
        <p className="text-lg text-gray-700 mb-10 font-medium leading-relaxed">
          Skim The Topic First, Note Your Questions, Then Read Again — PERO Gives Feedback And Helps You Understand Deeply.
        </p>

        
        <div className="mb-12 ">
          <form onSubmit={handleQus} className="flex w-full max-w-2xl mx-auto border border-blue-300 rounded-full items-center p-1 shadow-sm bg-blue-50/50 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            
            {/* Textarea for Input */}
            <textarea
              id="questionInput"
              className="flex-grow bg-transparent outline-none resize-none placeholder-gray-500 text-lg px-4 py-3 max-h-30"
              placeholder="Write Your Questions Here"
              rows={1}
              value={qus}
              onChange={handleTextAreaInput}
              // Optional: Add the auto-grow logic here if you wish
            ></textarea>
            
            {/* Submit Button with React Icon */}
            <button 
              type="submit" 
              className="p-3 mr-1  hover:bg-blue-100 rounded-full transition-colors"
              aria-label="Submit Questions"
              onClick={handleQus}
            >
              <AiOutlineSend />
            </button>
          </form>

          {/* Feedback Area (Conditional Rendering recommended) */}
          {feedback && (
             <div id="aiFeedback" className="mt-4 p-4 bg-blue-50 rounded-xl text-left" dangerouslySetInnerHTML={{ __html: feedback }} />
          )}
        </div>

        {/* Generate Button Section */}
        <div className="mb-10">
          <button 
            onClick={generateQus}
            className="flex items-center justify-center gap-2 mx-auto p-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition-transform active:scale-95"
            
          >
            Let PERO Pick Questions For You
          </button>

          {/* AI Questions Area */}
          {aiQus && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl text-left" dangerouslySetInnerHTML={{ __html: aiQus }} />
          )}
        </div>

        
        <button onClick={toEncoding} className="flex items-center justify-center gap-2 mx-auto p-3 bg-blue-600 text-white text-xl font-bold rounded-full shadow-md hover:bg-blue-700 transition-transform active:scale-95 cursor-pointer ">Go to step 2: Encoding</button> 

      </div>
    </section>
    </>
  );
}

export default PrimingPage