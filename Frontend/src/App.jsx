import WelcomePage from './WelcomePage'
import PrimingPage from './PrimingPage'
import EncodingPage from './EncodingPage'
import AnalogyPage from './AnalogyPage'
import SimplifyPage from './SimplifyPage'
import GroupingPage from './GroupingPage'
import RetrievalPage from './RetrievalPage'
import OverlearningPage from './OverlearningPage'
import { useState } from 'react'

function App() {

    const [content, setContent] = useState('');
    const [currentPage, setCurrentPage] = useState('WelcomePage');


    const handleContentUpload = (text) => {
        setContent(text);

        setCurrentPage('PrimingPage');

    };


    return (
        <main>
            {currentPage === 'WelcomePage' && (
                <WelcomePage onUpload={handleContentUpload} />
            )}
            {currentPage === 'PrimingPage' && (
                <PrimingPage content={content}/>
            )}
        </main>
    );
}
export default App