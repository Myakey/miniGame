export default function dialogueBox(text){
    return(
        <>
             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-3xl px-6 py-4 
                    bg-black/80 text-white rounded-full border-2 border-white shadow-lg backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-lg font-semibold">{text.speaker}</h2>
                    <p className="mt-1">{text.text}</p>
                </div>
            </div>
        </>
    )
}