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
            const feedback = await CallAi('As a critical thinker,are these questions good for curiosity:' + questions + '?' + 'provide detailed feedback,improvements for topic ' + data+'under 300 words.'+'Format your response as an HTML list with <h3>,<p><ul> and <li> tags.');
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
        const ques = await CallAi(`Generate 5 curiosity questions from this text: ${appState.uploadedContent}. Please format your response as an HTML list with <ul> and <li> tags.`);
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
        const prompt = `As a critical thinker how this analogie :${analogie} makes a connection with this text: ${content} explain under 300 words.Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`;
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
    const prompt = `As a critical thinker make 2 analogies under 150 words for understanding this topic: ${appState.uploadedContent} Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`;
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
        const content = appState.uploadedContent;
        const feedback = await CallAi(`${inputValue.value.trim()}is this grouping of info  logically correct according to this text ${content} give a feedback in 300 words.Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);

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
    const response = await CallAi(`create a creative group of this info in under 300 words: ${content}. Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);
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
        appState.retrievalQus = await CallAi(`generate 4 curve Ball questions according to this text:${appState.uploadedContent} that will hit this topic with multiple angles.Format your response as an HTML list with <h3>,<p><ul> and <li> tags.`);
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
            <h1>welcome To </h1>
            <h1>PERO</h1>
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
        <p>it is recommended to read the headings and subheadings or skim the topic once and whatever questions buildup
            on your mind PERO will give you feedback and now read the topic again with the purpose of understanding and
            keep the questions in your mind read it as you are reading it to answer the questions.</p>
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