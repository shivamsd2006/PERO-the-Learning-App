function PrimingPage(){
  return(
    <>
    <div id="box">
        <h1>step 1 Priming</h1>
        <h2>upload your questions about the topic</h2>
        <p>it is recommended to read the headings and subheadings or skim the topic once and whatever questions buildup
            on your mind PERO will give you feedback and now read the topic again with the purpose of understanding and
            keep the questions in your mind read it as you are reading it to answer the questions.</p>
        <div id="questionFormBox">
            <form id="questionForm">
                <input id="questionInput" placeholder="minimum 3-4 questions" type="text"/>
                <button type="submit" id="submitBtn">Submit</button>
            </form>
        </div>

        <div id="aiFeedback">

        </div>


        <h3>or</h3>
        <h4>let PERO generate questions for you</h4>

        
        <button id="generate">generate</button>
        <div id="aiGeneratedQuestions">

        </div>
        <button id="goToEncoding">Encoding</button>



    </div>
    </>
  );
}

export default PrimingPage