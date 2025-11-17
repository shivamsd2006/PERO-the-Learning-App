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
    const toEncoding = () => {
        setCurrentPage('EncodingPage');
    }

    const toAnalogy = () => {
        setCurrentPage('AnalogyPage');
    }

    const toGrouping = () => {
        setCurrentPage('GroupingPage');
    }
    const toSimplify = () => {
        setCurrentPage('SimplifyPage');
    }

    const toRetrieval = () => {
        setCurrentPage('RetrievalPage');
    }
    const toOverlearning = ()=>{
        setCurrentPage('OverlearningPage');
    } 


    return (
        <main>
            {currentPage === 'WelcomePage' && (
                <WelcomePage onUpload={handleContentUpload} />
            )}
            {currentPage === 'PrimingPage' && (
                <PrimingPage content={content}
                    onEncoding={toEncoding}
                />

            )}
            {currentPage === 'EncodingPage' && (
                <EncodingPage
                    onAnalogy={toAnalogy}
                    onGrouping={toGrouping}
                    onSimplify={toSimplify}
                    onRetrieval={toRetrieval} />
            )}
            {currentPage === 'AnalogyPage' && (
                <AnalogyPage
                    content={content} />
            )}
            {currentPage === 'SimplifyPage' && (
                <SimplifyPage
                    content={content} />
            )}
            {currentPage === 'GroupingPage' && (
                <GroupingPage
                    content={content} />
            )}
            {currentPage === 'RetrievalPage' && (
                <RetrievalPage
                    content={content}
                    onOverlearning={toOverlearning} />
            )}
            {currentPage === 'OverlearningPage'&&
              <OverlearningPage content ={content} />
            }
        </main >
    );
}
export default App