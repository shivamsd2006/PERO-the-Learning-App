import { useState } from "react";
import { CallAi } from "./api";



function PrimingPage({ content,onEncoding }) {
  const [qus, setQus] = useState('');
  const [feedback, setFeedbck] = useState('');
  const [aiQus, setAiQus] = useState('');

  async function handleQus(event) {

    try {
      event.preventDefault();
      if (qus.trim() != '') {
        const response = await CallAi(`As a critical thinker are these questions good for curiosity ${qus}? provide detailed feedback for the topic ${content}`);
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
      const response = await CallAi(`As a Critical thinker generate 5 curiosity questions from this text: ${content}`);
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

        <button onClick={onEncoding} id="goToEncoding">Encoding</button>



      </div>
    </>
  );
}

export default PrimingPage