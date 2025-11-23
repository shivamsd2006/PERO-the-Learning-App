import { useNavigate } from "react-router-dom"

function EncodingPage() {
const navigate = useNavigate();

function onAnalogy(){
    navigate('/Analogy');
}
function onSimplify(){
    navigate('/Simplify');
}
function onGrouping(){
    navigate('/Grouping');
}
function onRetrieval(){
    navigate('/Retrieval');
}

    return (
        <>
            <div id="box">
                <h1>step 2 Encoding</h1>
                <p>now it's time to make sense of the info and have a deep understanding of it.</p>
                <div id="cont">
                    <div>
                        <button onClick={onAnalogy} id="analogies">Analogies</button>
                    </div>
                    <div >
                        <button onClick={onSimplify} id="simplify">simplify</button>
                    </div>
                    <div >
                        <button onClick={onGrouping} id="grouping">grouping</button>
                    </div>
                </div>
                <button onClick={onRetrieval} id="goToRetrieval" >retrieval</button>

            </div >

        </>
    )
}

export default EncodingPage