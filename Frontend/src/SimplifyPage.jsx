function SimplifyPage(){
    return(
        <>
        <div id="box">
        <h3>write down what you understood,so PERO can check your understanding</h3>
        <textarea placeholder="" id="simplifiedText"></textarea>
        <button id="uploadBtn">upload</button>
        <div id="simplifiedFeedback">

        </div>
        <h4>or let PERO Simplify it for you</h4>
        <button id="genBtn">generate</button>
        <div id="showSimplify">

        </div>
    </div>
        
        </>
    );

}

export default SimplifyPage