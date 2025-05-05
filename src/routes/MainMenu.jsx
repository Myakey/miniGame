import React from "react";
import Button from '../components/UI/Buttons'
import titleScreen from '../assets/image/titleScreen/title.png'
import Modal from "../components/UI/ModalBox"
import { useNavigate } from 'react-router-dom';

function MainMenu(){
    let navigate = useNavigate();
    return(
       <>
        <div className="m-20 justify-self-center">
            <img src={titleScreen} className="h-50"/>
            <div className="flex flex-col gap-10 items-center mt-20">
                <Button text="Hi!"/>
                <Modal 
                text= 
                    <div className="flex flex-row justify-between">
                        <Button text="Char Select" onClick={()=>{navigate('/')}}/>
                        <Button text="InGame" onClick={()=>{navigate('/inGame')}}/>
                        <Button text="VN" onClick={()=>{navigate('/vn')}}/>
                    </div>
                button = "Debug Mode"/>
            </div>
        </div>
       </>
    )
}

export default MainMenu;