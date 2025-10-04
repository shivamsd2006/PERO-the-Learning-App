

function WelcomePage() {
  return (
    <>
      <div id="box">
        <h1>welcome To </h1>
        <h1>PERO</h1>
        <h3>Tell me What you Are Learning Today</h3>
        <div id="search">
          <input id="fileInput" placeholder="Upload PDF/image/text" type="file" accept=".pdf,.jpg,.png,.txt"/>
            <textarea id="textInput" placeholder="or type/paste your study material"></textarea>
            <button id="uploadBtn">upload and go to Priming</button>
        </div>
      </div>

    </>
  );
}



export default WelcomePage 

