import { useState } from "react";
import { CallAi } from "./api";
import { useOutletContext } from "react-router-dom";


function PrimingPage() {
  const{content} = useOutletContext();
  const [qus, setQus] = useState('');
  const [feedback, setFeedbck] = useState('');
  const [aiQus, setAiQus] = useState('');

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
You are an expert educator. Your task is to generate exactly 6 engaging and curiosity-driven questions based on the following text.Text:
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
  return (
    <>
      <div id="box">
        <h1>step 1 Priming</h1>
        <h2>upload your questions about the topic</h2>
        <p>it is recommended to read the headings and subheadings or skim the topic once and whatever questions buildup
          on your mind PERO will give you feedback and now read the topic again with the purpose of understanding and
          keep the questions in your mind read it as you are reading it to answer the questions.</p>
        <div id="questionFormBox">
          <form onSubmit={handleQus} id="questionForm">
            <textarea id="questionInput" placeholder="minimum 3-4 questions" type="text" value={qus} onChange={(e) => setQus(e.target.value)}></textarea>
            <button type="submit" id="submitBtn" >Submit</button>
          </form>
        </div>

        <div id="aiFeedback" dangerouslySetInnerHTML={{ __html: feedback }} />


        <h3>or</h3>
        <h4>let PERO generate questions for you</h4>


        <button id="generate" onClick={generateQus}>generate</button>
        <div
          dangerouslySetInnerHTML={{ __html: aiQus }} />

        <button  id="goToEncoding">Encoding</button>



      </div>
    </>
  );
}

export default PrimingPage