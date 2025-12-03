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
            <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-10">
        {/* Main Container */}
        <div className="w-full max-w-4xl text-center">
            
            {/* Header Section */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                    Step 2: Encoding
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    Now It's Time To Make Sense Of The Info And Have A Deep Understanding Of It.
                </p>
            </div>

            {/* The Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                
                {/* Tool 1: Analogies */}
                <button 
                    onClick={onAnalogy} 
                    className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 group"
                >
                    <h3 className="text-xl font-bold">Analogies</h3>
                    <span className="mt-2 text-blue-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Connect concepts</span>
                </button>

                {/* Tool 2: Simplify */}
                <button 
                    onClick={onSimplify} 
                    className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 group"
                >
                    <h3 className="text-xl font-bold">Simplify</h3>
                    <span className="mt-2 text-blue-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Make it easy</span>
                </button>

                {/* Tool 3: Grouping */}
                <button 
                    onClick={onGrouping} 
                    className="flex flex-col items-center justify-center p-8 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 group"
                >
                    <h3 className="text-xl font-bold">Grouping</h3>
                    <span className="mt-2 text-blue-100 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Find patterns</span>
                </button>
            </div>

            {/* Navigation: Next Step */}
            <div>
                <button 
                    onClick={onRetrieval} 
                    className="px-8 py-3  text-white bg-blue-600 font-bold rounded-full transition-colors"
                >
                    Go to Step 3: Retrieval 
                </button>
            </div>

        </div>
    </section>

        </>
    )
}

export default EncodingPage