
document.addEventListener('DOMContentLoaded', () => {
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



    const genBtn = document.getElementById('generate');
    if (genBtn) {

        genBtn.addEventListener('click', async () => {
            try {
                console.log("Clicked")
                const prompt = localStorage.getItem('uploadedContent') || 'NO Content Uploaded';
                console.log('PROMPT:------------------', prompt);
                const ques = await CallAi('generate 5 curiosity questions from this text:' + prompt);
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

});