const appState = {
    currentState: 'welcome',
    uploadedContent: '',
    retrievalQus: ''
};

function uploadText() {
    const textInput = document.getElementById('textInput');
    appState.uploadedContent = textInput.value.trim();
    alert('Content Uploaded');
    navigateTo('priming');

}

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            appState.uploadedContent = content;
            alert('file uploaded successfully');
            navigateTo('priming');
        }
        reader.onerror = () => {
            alert('please upload a valid file');
        }
        if (file.type === 'text/plain') {
            reader.readAsText(file);
        } else {
            alert("Unsupported File");
        }
    } else {
        alert('Please Select a Valid File');
    }

}



async function submitPrimingQus(e) {
    try {
        e.preventDefault();
        const questionInput = document.getElementById('questionInput');
        if (questionInput.value.trim() !== '') {
            const questions = questionInput.value.trim();
            const data = appState.uploadedContent;
            const feedback = await CallAi(`
You are an expert learning coach providing structured, clear feedback.

Analyze the following questions based on the study topic.

**Study Topic:**
"${appState.uploadedContent}"

**User's Questions:**
"${questions}"

Return your response STRICTLY in valid HTML — not Markdown. 
✅ Use:
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
            if (feedback) {
                alert('Questions Uploaded');
                document.getElementById('aiFeedback').innerHTML = feedback;
            }


        } else {
            alert('Please type your questions');
        }
    } catch (error) {
        alert('Error: ' + error);
    }

}

async function genPrimingQus() {
    try {
        console.log(`generting questions for :------------------- ${appState.currentState}`);
        const ques = await CallAi(`
You are an expert educator. Your task is to generate exactly 5 engaging and curiosity-driven questions based on the following text.

**Text:**
"${appState.uploadedContent}"

Your response must be ONLY an HTML ordered list (<ol> and <li> tags).
Do not include any other text, headings, or introductions.
Each question should be concise and designed to make a student want to find the answer in the text.
`);
        if (ques) {
            alert("Generating Questions For You")
            const aiGeneratedQuestions = document.getElementById('aiGeneratedQuestions');

            aiGeneratedQuestions.innerHTML = ques;

        }
    }
    catch (error) {
        alert('Error: ' + error);
    }
}


async function CallAi(prompt) {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt })

        });

        if (!response.ok) {
            throw new Error("FAILED TO GET RESPONSE FROM SERVER");
        }

        const data = await response.json();
        return data.feedback;
    } catch (error) {
        console.error('ERROR connecting to backend:', error);
        alert('An error occurred: ' + error.message);
        return null;
    }
}


async function checkAnalogie() {
    const userInput = document.getElementById('inputAnalogie');
    if (userInput.value.trim() != '') {
        const analogie = userInput.value.trim();
        const content = appState.uploadedContent;
        const prompt = `
You are a critical thinking specialist. Analyze the user's analogy and explain how well it connects to the core concepts of the provided text.

**Source Text:**
"${appState.uploadedContent}"

**User's Analogy:**
"${analogie}"

Provide your feedback in simple HTML, using <p> tags for paragraphs. Start directly with the analysis.
`;
        const feedback = await CallAi(prompt);
        if (feedback) {
            alert('analogie uploaded');
            const feedbackBox = document.getElementById('feedbackBox');
            feedbackBox.innerHTML = feedback;
        }
    } else {
        alert('Please type/paste your Analogie');
    }
}
async function genAnalogie() {
    const prompt = `
You are a creative teacher. Your task is to generate 2 distinct analogies to help someone deeply understand the following text.

**Source Text:**
"${appState.uploadedContent}"

Format your response in simple HTML. For each analogy, use an <h3> heading for the analogy's title (e.g., "### The Garden Analogy") and <p> tags for the explanation. Keep the total response under 150 words.
`;
    const ans = await CallAi(prompt);
    if (ans) {
        alert('Creating a analogie for you');
        const aiAnalogie = document.getElementById('aiAnalogie');
        aiAnalogie.innerHTML = ans;
    } else {
        alert('Failed to create Analogie');
    }

}



async function checkGrouping() {
    const inputValue = document.getElementById('groupedInfo');
    if (inputValue.value.trim() != '') {
        const feedback = await CallAi(`
You are an expert at information synthesis. Your task is to read the following text and organize its main ideas into logical groups.

**Source Text:**
"${appState.uploadedContent}"

Create a summary by grouping the key concepts. Your response must be formatted in simple HTML. Use an <h3> heading for each main group title and an unordered list (<ul> and <li>) for the points within each group.
Do not include any conversational preamble.
`);

        if (feedback) {
            const showFeedback = document.getElementById('showFeedback');
            showFeedback.innerHTML = feedback;
        }
    } else {
        alert("type/paste your answer");
    }
}

async function genGrouping() {
    const content = appState.uploadedContent;
    const response = await CallAi(`
You are an expert at information synthesis. Your task is to read the following text and organize its main ideas into logical groups.

**Source Text:**
"${appState.uploadedContent}"

Create a summary by grouping the key concepts. Your response must be ONLY formatted in simple HTML. Use an <h3> heading for each main group title and an unordered list (<ul> and <li>) for the points within each group.
Do not include any conversational preamble.
`);
    if (response) {
        const showGrouping = document.getElementById('showGrouping');
        showGrouping.innerHTML = response;
    }
}

async function checkSimplify() {
    const simplifiedText = document.getElementById('simplifiedText');
    if (simplifiedText.value.trim() != '') {
        const text = simplifiedText.value.trim();
        const feedback = await CallAi(`give a feedback under 250 words about this text on how much simplied this text really is ${text} realated to this text ${appState.uploadedContent}.Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);
        if (feedback) {
            const simplifiedFeedback = document.getElementById('simplifiedFeedback');
            simplifiedFeedback.innerHTML = feedback;
        }
    } else {
        alert('type/paste valid text');
    }

}
async function genSimplify() {
    const response = await CallAi(`simplify this text so even a 10 years old can understand ${appState.uploadedContent}. Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);
    if (response) {
        const showSimplify = document.getElementById('showSimplify');
        showSimplify.innerHTML = response;
    }
}


async function genRetrievalQus() {
    try {
        appState.retrievalQus = await CallAi(`
You are a Socratic questioner. Your goal is to test for deep understanding, not simple fact recall. Generate exactly 4 thought-provoking, "curveball" questions based on the provided text. These questions should challenge the user to think about the topic from a new perspective.

**Source Text:**
"${appState.uploadedContent}"

Your response must be ONLY an HTML ordered list (<ol> and <li> tags).
Do not include any other text or introduction.
`);
        if (appState.retrievalQus) {
            alert('Loading questions ');
            const showQues = document.getElementById('curveBall');
            showQues.innerHTML = appState.retrievalQus;

            checkRetrievalAns();
        }

    }
    catch (error) {
        console.log('error in genRetrievalqus', error);
    }
}
async function checkRetrievalAns() {
    const checkBtn = document.getElementById('checkBtn');
    const ansInput = document.getElementById('ansInput');
    try {
        checkBtn.addEventListener('click', async () => {
            if (ansInput.value.trim() != '') {
                const ans = ansInput.value.trim();
                const feedback = await CallAi(`are these anwers correct ${ans} according to these questions${appState.retrievalQus} give feedback per answer under 100 words.Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);
                if (feedback) {
                    const ansFeedback = document.getElementById('ansFeedback');
                    ansFeedback.innerHTML = feedback;
                }
            }

        })
    }
    catch (error) {
        console.log('error in retrieval', error);
    }
}

async function overlearning() {
    try {
        const ques = await CallAi(`generate 20 curious questions from this text ${appState.uploadedContent} whose answer should be under 5 - 50 words`);
        if (ques) {
            alert("Generating Questions for Overlearning")
            const quesArray = ques.split('\n');
            const quizQues = document.getElementById('quiz');
            for (k of quesArray) {
                const li = document.createElement('li');
                li.textContent = k;
                quizQues.appendChild(li);
            }
        }
    } catch (error) {
        console.log('error in overlearning', error);
    }

}

function showWelcomePage() {
    return `
        <div id="box">
           <div id ="header">
            <h1>welcome To </h1>
            <h1>PERO</h1>
           </div>
            <h3>Tell me What you Are Learning Today</h3>
            <div id="search">
                <input id="fileInput" placeholder="Upload PDF/image/text" type="file" accept=".pdf,.jpg,.png,.txt">
                    <textarea id="textInput" placeholder="or type/paste your study material"></textarea>
                    <button id="uploadBtn">upload and go to Priming</button>
            </div>
        </div>
    `

}

function showPrimingPage() {
    return `
    <div id="box">
        <h1>step 1 Priming</h1>
        <h2>upload your questions about the topic</h2>
        <p>Skim the topic first, note your questions, then read again — PERO gives feedback and helps you understand deeply.</p>
        <div id="questionFormBox">
            <form id="questionForm">
                <textarea id="questionInput" placeholder="minimum 3-4 questions"></textarea>
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
    `;

}
function showEncodingPage() {
    return `<div id="box">
        <h1>step 2 Encoding</h1>
        <p>now it's time to make sense of the info and have a deep understanding of it.</p>
        <div id="cont">
            <div class="box">
                <button id="analogies">Analogies</button>
            </div>
            <div class="box">
                <button id = "simplify">simplify</button>
            </div>
            <div class="box">
                <button id = "grouping">grouping</button>
            </div>
        </div>
        <button id="goToRetrieval" ">retrieval</button>

    </div>`
}
function showAnalogiePage() {
    return `
     <div id="box">
        <h1>Learn by making Anologies</h1>
        <div id="analogieBox">
            <textarea placeholder="What anologies you can think of ?" id="inputAnalogie"></textarea>
            <button id="uploadBtn">upload</button>
        </div>
        <div id="feedbackBox">


        </div>
        <button id="generateBtn">or let pero make it for you</button>
        <div id="aiAnalogie">

        </div>


    </div>`
}
function showSimplifyPage() {
    return `<div id="box">
        <h3>write down what you understood,so PERO can check your understanding</h3>
        <textarea placeholder="" id="simplifiedText"></textarea>
        <button id="uploadBtn">upload</button>
        <div id="simplifiedFeedback">

        </div>
        <h4>or let PERO Simplify it for you</h4>
        <button id="genBtn">generate</button>
        <div id="showSimplify">

        </div>
    </div>`
}
function showGroupingPage() {
    return ` <div id="box">
        <h2>Group that info here? how that info is realated to your previous knowledge</h2>
        <textarea placeholder="" id="groupedInfo"></textarea>
        <button id="uploadBtn">upload</button>
        <div id="showFeedback">

        </div>

        <h3>let PERO group it for you</h3>
        
        <button id="genGrouping">group</button>
        <div id="showGrouping">

        </div>
         

    </div>`
}
function showRetrievalPage() {
    return `<div id="box">
        <h1>step 3 Retrieval</h1>
        <h2>let's hit this topic with multilple perspectives</h2>
        <div id="curveBall">

        </div>
        <h3>can you answer these questions ? </h3>
        <div id="enter">
            <textarea placeholder="Enter your Answers" id="ansInput"></textarea>
            <button id="checkBtn">check</button>
            <div id="ansFeedback">

            </div>
        </div>
        <button id="goToOverlearning">overlearning</button>

    </div>`
}
function showOverlearningPage() {
    return `<div id="box">
        <h1>step 4 overlearning</h1>
        <h2>let PERO quiz you on this </h2>
        <div id="quiz">

        </div>

    </div>`
}


function attachEventListeners() {
    console.log(`attaching the listener on page:----------------${appState.currentState}`);
    document.getElementById('main-root').addEventListener('click', (e) => {
        if (appState.currentState === 'welcome') {
            if (e.target.id === 'uploadBtn') {
                if (document.getElementById('textInput').value.trim() !== '') {
                    uploadText();
                }

                else if (document.getElementById('fileInput').files.length > 0) {
                    uploadFile();
                }
            }
        }
        else if (appState.currentState === 'priming') {
            if (e.target.id === 'generate') {
                genPrimingQus();
            }
            else if (e.target.id === 'goToEncoding') {
                navigateTo('encoding');
            }
        }
        else if (appState.currentState === 'encoding') {
            if (e.target.id === 'analogies') {
                navigateTo('analogie');
            }
            else if (e.target.id === 'simplify') {
                navigateTo('simplify');
            }
            else if (e.target.id === 'grouping') {
                navigateTo('grouping');
            }
            else if (e.target.id === 'goToRetrieval') {
                navigateTo('retrieval');
            }

        }
        else if (appState.currentState === 'analogie') {
            if (e.target.id === 'uploadBtn') {
                checkAnalogie();
            }
            else if (e.target.id === 'generateBtn') {
                genAnalogie();
            }
        }
        else if (appState.currentState === 'simplify') {
            if (e.target.id === 'uploadBtn') {
                checkSimplify();
            }
            else if (e.target.id === 'genBtn') {
                genSimplify();
            }
        }
        else if (appState.currentState === 'grouping') {
            if (e.target.id === 'uploadBtn') {
                checkGrouping();
            }
            else if (e.target.id === 'genGrouping') {
                genGrouping();
            }
        }
        else if (appState.currentState === 'retrieval') {
            if (e.target.id === 'goToOverlearning') {
                navigateTo('overlearing');
            };
        }

    });
}
window.addEventListener('popstate', (event) => {
    if (event.state) {
        appState.currentState = event.state.page;
        render();
    }
})
function render() {
    console.log(`render function called for:----------------------------- ${appState.currentState}`);
    if (appState.currentState === 'welcome') {
        document.getElementById('main-root').innerHTML = showWelcomePage();
    }
    else if (appState.currentState === 'priming') {
        document.getElementById('main-root').innerHTML = showPrimingPage();
    }
    else if (appState.currentState === 'encoding') {
        document.getElementById('main-root').innerHTML = showEncodingPage();
    }
    else if (appState.currentState === 'analogie') {
        document.getElementById('main-root').innerHTML = showAnalogiePage();
    }
    else if (appState.currentState === 'simplify') {
        document.getElementById('main-root').innerHTML = showSimplifyPage();
    }
    else if (appState.currentState === 'grouping') {
        document.getElementById('main-root').innerHTML = showGroupingPage();
    }
    else if (appState.currentState === 'retrieval') {
        document.getElementById('main-root').innerHTML = showRetrievalPage();
        genRetrievalQus();
    }
    else if (appState.currentState === 'overlearing') {
        document.getElementById('main-root').innerHTML = showOverlearningPage();
        overlearning();
    }

}

function navigateTo(stage) {
    appState.currentState = stage;
    history.pushState({ page: stage }, '', `#$/{stage}`);
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    const id = document.getElementById('main-root');

    if (id) {
        attachEventListeners();

        navigateTo('welcome');

        id.addEventListener('submit', (e) => {
            const id = e.target.id;
            if (id === 'questionForm') {

                submitPrimingQus(e);
            }
        });
    }



});