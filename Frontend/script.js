
function welcomePage() {
    let uploadbtn = document.getElementById('uploadbtn');
    if (uploadbtn) {
        uploadbtn.addEventListener('click', function () {
            const textInput = document.getElementById('textInput');
            const fileInput = document.getElementById('fileInput');
            if (textInput.value.trim() !== '') {
                localStorage.setItem('uploadedContent', textInput.value);
                alert('Content Uploaded')
                console.log(textInput.value);
                window.location.href = 'priming.html';
            }
            else if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target.result;
                    localStorage.setItem('uploadedContent', content);
                    alert('File Uploaded Successfully')
                    window.location.href = 'priming.html'
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
        })
    }
}

function priming() {

    const questionForm = document.getElementById('questionForm');
    if (questionForm) {

        questionForm.addEventListener('submit', async (e) => {
            try {
                e.preventDefault();
                const questionInput = document.getElementById('questionInput');
                if (questionInput.value.trim() !== '') {
                    const questions = questionInput.value.trim();
                    const data = localStorage.getItem('uploadedContent') || 'No Content Uploaded';
                    const feedback = await CallAi('As a critical thinker are these questions good for curiosity:' + questions + '?' + 'provide detailed feedback,improvements for topic' + data)
                    if (feedback) {
                        alert('Questions Uploaded');
                        document.getElementById('aiFeedback').innerHTML = '<p>' + feedback + '</p>'
                    }


                } else {
                    alert('Please type your questions');
                }
            } catch (error) {
                alert('Error: ' + error);
            }

        })

    }
    const genBtn = document.getElementById('generate');
    if (genBtn) {

        genBtn.addEventListener('click', async () => {
            try {
                console.log("Clicked")
                const content = localStorage.getItem('uploadedContent') || 'NO Content Uploaded';
                console.log('PROMPT:------------------', content);
                const ques = await CallAi('generate 5 curiosity questions from this text:' + content);
                console.log("QUES------------------", ques);
                if (ques) {
                    alert("Generating Questions For You")
                    const aiGeneratedQuestions = document.getElementById('aiGeneratedQuestions');
                    const quesArray = ques.split('\n');
                    for (q of quesArray) {
                        const list = document.createElement('li');
                        list.innerHTML = q.trim();
                        aiGeneratedQuestions.appendChild(list);
                    }

                }
            }
            catch (error) {
                alert('Error: ' + error);
            }
        })


    }
}



async function CallAi(prompt) {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
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


function makeAnalogie() {
    const userInput = document.getElementById('inputAnalogie');
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', async () => {
        if (userInput.value.trim() != '') {
            const analogie = userInput.value.trim();
            const content = localStorage.getItem('uploadedContent');
            const prompt = `As a critical thinker how this analogie :${analogie} makes a connection with this text: ${content}`;
            const feedback = await CallAi(prompt);
            if (feedback) {
                alert('analogie uploaded');
                const p = document.createElement('p');
                p.innerHTML = feedback;
                const feedbackBox = document.getElementById('feedbackBox');
                feedbackBox.appendChild(p);
            }
        } else {
            alert('Please type/paste your Anologie');
        }
    })
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', async () => {
        const content = localStorage.getItem('uploadedContent');
        const prompt = `As a critical thinker make 2 analogies under 150 words for understanding this topic deeply: ${content} `;
        const ans = await CallAi(prompt);
        if (ans) {
            alert('Creating a analogie for you');
            const p = document.createElement('p');
            p.innerHTML = ans;
            const aiAnalogie = document.getElementById('aiAnalogie');
            aiAnalogie.appendChild(p);
        } else {
            alert('Failed to create Analogie');
        }

    })

}

function grouping() {
    const inputValue = document.getElementById('groupedInfo');
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', async () => {
        if (inputValue.value.trim() != '') {
            const content = localStorage.getItem('uploadedContent');
            const feedback = await CallAi(`${inputValue.value.trim()}is this grouping of info  logically correct according to this text ${content} give a feedback in 300 words`);

            if (feedback) {
                const p = document.createElement('p');
                p.innerHTML = feedback;
                const showFeedback = document.getElementById('showFeedback');
                showFeedback.appendChild(p);
            }
        } else {
            alert("type/paste your answer");
        }

    })
    const genGrouping = document.getElementById('genGrouping');
    genGrouping.addEventListener('click', async () => {
        const content = localStorage.getItem('uploadedContent');
        const response = await CallAi(`create a creative group of this info in under 300 words: ${content}`);
        if (response) {
            const p = document.createElement('p');
            p.innerHTML = response;
            const showGrouping = document.getElementById('showGrouping');
            showGrouping.appendChild(p);
        }
    })
}
function simplify() {
    const simplifiedText = document.getElementById('simplifiedText');
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.addEventListener('click', async () => {
        if (simplifiedText.value.trim() != '') {
            const text = simplifiedText.value.trim();
            const feedback = await CallAi(`give a feedback under 250 words about this text on how much simplied this text really is ${text} realated to this text ${localStorage.getItem('uploadedContent')}`);
            if (feedback) {
                alert('getting the feedback');
                const p = document.createElement('p');
                p.innerHTML = feedback;
                const simplifiedFeedback = document.getElementById('simplifiedFeedback');
                simplifiedFeedback.appendChild(p);
            }
        } else {
            alert('type/paste valid text');
        }

    })
    const genSimplifyBtn = document.getElementById('genBtn');
    genSimplifyBtn.addEventListener('click', async () => {
        const response = await CallAi(`simplify this text so even a 10 years old can understand ${localStorage.getItem('uploadedContent')}`);
        if (response) {
            const p = document.createElement('p');
            p.innerHTML = response;
            const showSimplify = document.getElementById('showSimplify');
            showSimplify.appendChild(p);
        }
    })
}

function retrieval async (){
    const response = await CallAi(`generate 4 curve Ball questions according to this text:${localStorage.getItem('uploadedContent')} that will hit this topic with multiple angles`);
    if (response) {
        alert('Loading questions ');
        const showQues = document.getElementById('curveBall');
        const responseArray = response.split(',');
        for (q of responseArray) {
            const li = document.createElement('li');
            showQues.appendChild(li);
        }
        const checkBtn = document.getElementById('checkBtn');
        const ansInput = document.getElementById('ansInput');
        checkBtn.addEventListener('click', () => {
            if (ansInput.value.trim() != '') {
                const ans = ansInput.value.trim();
                const feedback = await CallAi(`are these anwers correct ${ans} according to these questions${response} give feedback per answer under 100 words`);
                if (feedback) {
                    const p = document.createElement('p');
                    p.innerHTML = feedback;
                    const ansFeedback = document.getElementById('ansFeedback');
                    ansFeedback.appendChild(p);
                }
            }

        })
    }

}
function overlearning async (){
    const quizQues = document.getElementById('quiz');
    const ques = await CallAi(`generate 20 curious questions from this text ${localStorage.getItem('uploadedContent')} whose answer should be under 5 - 50 words`);
    if (ques) {
        quesArray = ques.split(',');
        for (k of quesArray) {
            const li = document.createElement('li');
            li.innerHTML = quesArray;
            quizQues.appendChild('li');
        }
    }

}
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('fileInput')) {
        welcomePage();
    }
    else if (document.getElementById('questionForm')) {
        priming();
    }
    else if (document.getElementById('inputAnalogie')) {
        makeAnalogie();
    }
    else if (document.getElementById('groupedInfo')) {
        grouping();
    }
    else if (document.getElementById('simplifiedText')) {
        simplify();
    }
    else if (document.getElementById('curveBall')) {
        retrieval();
    }
    else if (document.getElementById('quiz')) {
        overlearning();
    }


});