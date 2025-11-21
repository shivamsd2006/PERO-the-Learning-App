import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";



function WelcomePage() {
  const{onUpload} = useOutletContext();
  const [text, setText] = useState("");

  function handleText() {
    if (text.trim() != '') {
      onUpload(text);
      alert('content uploaded');
    } else {
      alert('Paste your content');
    }
  }

  return (
    <>
      <section>
        <div className="max-w-[1300px] min-h-[100vh] ">

          <div className="mt-10">
            <h1 className="text-2xl font-bold"> Welcome To <br /><span className="text-blue-600">PERO</span></h1>
          </div>
          <div>
            <p className="text-xl mt-3 font-semibold">Tell me what you are Learning Today?</p>
          </div>


          <div className="flex-col">
            <div>
              <input id="fileInput" placeholder="Upload PDF/image/text" type="file" accept=".pdf,.jpg,.png,.txt" />
            </div>
            <div>
              <textarea id="textInput" placeholder="or type/paste your study material" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>
          </div>

          <button onClick={handleText} >upload and go to Priming</button>
          <Link to="/Priming" onClick={handleText}>upload and go to Priming</Link>
        </div>
      </section >
    </>
  );
}



export default WelcomePage

