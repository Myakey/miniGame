import React from "react";
import DialogueBox from "../components/VN/VNDialogue"
import Button from "../components/UI/Buttons"
import { useNavigate } from 'react-router-dom';

function MainMenu(){
    let navigate = useNavigate();
    return(
       <>
        <div>
            <Button text="Back" onClick={()=>{navigate('/')}}/>
        </div>
        <DialogueBox speaker="Mitsuha" text="I love You!"/>
       </>
    )
}

export default MainMenu;