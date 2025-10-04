import WelcomePage from './WelcomePage'
import PrimingPage from './PrimingPage'
import EncodingPage from './EncodingPage'
import AnalogyPage from './AnalogyPage'
import SimplifyPage from './SimplifyPage'
import GroupingPage from './GroupingPage'
import RetrievalPage from './RetrievalPage'
import OverlearningPage from './OverlearningPage'

function App() {

    const appState = {
        uploadedContent: '',
    };

    function handleContentUpload() {
        const textInput = document.getElementById('textInput');
        const fileInput = document.getElementById('fileInput');
        if (textInput.value.trim() != '') {
            appState.uploadedContent = textInput.value.trim();
            alert('Content Uploaded');
        }
        else if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                appState.uploadedContent = content;
                alert('file uploaded successfully');
            }
            reader.onerror = () => {
                alert('please upload a valid file');
            }
            if (file.type === 'text/plain') {
                reader.readAsText(file);
            } else {
                alert("Unsupported File");
            }
        }
        else if (textInput.value == '' && fileInput.files.length == 0) {
            alert("Paste/type text or upload a file");
        }
    }
    return (
        <>
            <WelcomePage> onUpload = {handleContentUpload}</WelcomePage>

        </>
    );
}
export default App