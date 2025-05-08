export default function button(text){
    return(
        <>
            <button className="min-w-[4rem] w-full sm:w-24 h-12 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-5x1 font-semibold rounded flex items-center justify-center text-center px-1 m-5" id="button1" onClick={text.onClick}>
                  {text.text}
            </button>
        </>
    )
}