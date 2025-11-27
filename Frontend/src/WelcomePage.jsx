import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BiSend } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

function WelcomePage() {
  const { onUpload } = useOutletContext();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleText() {
    if (text.trim() != '') {
      onUpload(text);
      alert('content uploaded');
      navigate('/priming');
    } else {
      alert('Paste your content');
    }
  }

  function handleFileUpload() {
    return (`<input id="fileInput" placeholder="Upload PDF/image/text" type="file" accept=".pdf,.jpg,.png,.txt" />`)
  }
  function handleInput(e) {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';

  }
  return (
    <>
      <section>
        <div className="w-full min-h-[80vh] ">

          <div className="mt-10 justify-center text-center">
            <h1 className="text-2xl font-bold"> Welcome To <br /><span className="text-blue-600">PERO</span></h1>
          </div>
          <div className="text-center">
            <p className="text-xl mt-3 font-semibold">Tell me what you are Learning Today?</p>
          </div>


          <div className="flex md:mx-40 mx-6 md:my-25 my-30 border-1 border-blue-600 rounded-4xl justify-center items-center md:gap-25 gap-6 p-3 ">
            <div>
              <FiPlus onClick={handleFileUpload} />
            </div>
            <div>
              <textarea className="focus:outline-none flex-grow bg-transparent placeholder-blue-600 max-h-48 resize-none overflow-y:hidden md:w-145 w-56" id="textInput" placeholder="paste/type your study material" value={text}
              onChange={handleInput}
              rows={1}
              ></textarea>
            </div>
            <div>
              <button><BiSend onClick={handleText} /></button>


            </div>
          </div>
        </div>

      </section >
    </>
  );
}



export default WelcomePage

