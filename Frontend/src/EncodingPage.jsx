import { useState } from "react"
import { CallAi } from "./api"

function EncodingPage() {
    

    return (
        <>
            <div id="box">
                <h1>step 2 Encoding</h1>
                <p>now it's time to make sense of the info and have a deep understanding of it.</p>
                <div id="cont">
                    <div class="box">
                        <button onClick={toAnalogies} id="analogies">Analogies</button>
                    </div>
                    <div class="box">
                        <button onClick={toSimplify} id="simplify">simplify</button>
                    </div>
                    <div class="box">
                        <button onClick={toGrouping} id="grouping">grouping</button>
                    </div>
                </div>
                <button id="goToRetrieval" >retrieval</button>

        </div >

        </>   
    )
}

export default EncodingPage