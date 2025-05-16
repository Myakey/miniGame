import energy from "../../assets/image/InGame/icons/energy.png"
// import energy from "../../assets/image/InGame/icons/energy.png"
// import energy from "../../assets/image/InGame/icons/energy.png"

export default function StatusBars(input){
    return(
    <>
        <div className={`border w-50 rounded-3xl`}>
            <img src={`/src/assets/image/InGame/icons/${input.icon}.png`} className="w-10 justify-self-center"></img>
            {input.num}
        </div>
    </>
    )
}