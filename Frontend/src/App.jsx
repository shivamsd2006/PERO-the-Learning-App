import WelcomePage from './WelcomePage'
import PrimingPage from './PrimingPage'
import EncodingPage from './EncodingPage'
import AnalogyPage from './AnalogyPage'
import SimplifyPage from './SimplifyPage'
import GroupingPage from './GroupingPage'
import RetrievalPage from './RetrievalPage'
import OverlearningPage from './OverlearningPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout'





const router = createBrowserRouter([
    {

        path: '/',
        element: <Layout />,
        children: [{

            path: '/',
            element: < WelcomePage />


        },
        {
            path: '/Priming',
            element:
                <PrimingPage />

        },
        {
            path: '/Encoding',
            element:
                <EncodingPage />

        },
        {
            path: '/Analogy',
            element:
                <AnalogyPage />

        },
        {
            path: '/Grouping',
            element:
                <GroupingPage />

        },
        {
            path: '/Simplify',
            element:
                <SimplifyPage />

        },
        {
            path: '/Retrieval',
            element:
                <RetrievalPage/>

        },
        {
            path: '/Overlearning',
            element:
                <OverlearningPage />

        },
        ]
    }

]);

function App() {
  return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
export default App