import React from "react";
import Button from '../components/UI/Buttons'
import titleScreen from '../assets/image/titleScreen/title.png'
import titleBackground from '../assets/image/titleScreen/titleScreen.jpg'
import Modal from "../components/UI/ModalBox"
import { useNavigate } from 'react-router-dom';

import { GameState } from "../hooks/gamestate";
import { Game } from "phaser";

function MainMenu(){
    let navigate = useNavigate();
    return(
       <>
       <div className="mainMenu h-screen w-screen justify-center p-10 flex flex-col items-center">
            <div className="">
                <img src={titleScreen} className="lg:h-70 mt-10"/>
                <div className="flex flex-col gap-10 items-center mt-20">
                    <Button text="Hi!"/>
                    <Modal 
                    text= 
                        <div className="flex flex-row justify-between">
                            <Button text="Char Select" onClick={()=>{navigate('/')}}/>
                            <Button text="InGame" onClick={()=>{
                                navigate('/charaSel')
                                }}/>
                            <Button text="VN" onClick={()=>{navigate('/vn')}}/>
                            <Button text="charaSel" onClick={()=>{navigate('/charaSel')}}/>
                        </div>
                    button = "Debug Mode"/>
                </div>
            </div>
       </div>
       
       </>
    )
}

export default MainMenu;