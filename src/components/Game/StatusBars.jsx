export default function StatusBars(input){
    return(
    <>
        <div className={`border w-50`}>
            <img src={`/src/assets/image/InGame/icons/${input.icon}.png`} className="w-10 justify-self-center"></img>
            {input.num}
        </div>
    </>
    )
}