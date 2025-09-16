
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


});