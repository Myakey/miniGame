import React from "react";
import PauseMenu from "./Game/PauseMenu";
import DebugBox from "./UI/DebugBox";
import Modal from "./UI/ModalBox";
import Button from "./UI/Buttons";
import ActionFlow from "./Game/Actionscene";
import { Yes, No } from "../assets/assetsPreLoad";
import { resumeGame } from "../inGame/gameController";
import { stopAllSounds } from "../utils/soundHandler";
import { EventBus } from "../inGame/EventBus";

//SYSTEM FOR THE DESIGN ALL HERE THEN SPREAD EACH COMPONENTS TO EACH CORRESPONDING PROPS

export default function ModalBoxGUIs({
  debugModal,
  toggleDebugModal,
  toggleModalFalse,
  confirmationModalData,
  isConfirmationModalOpen,
  handleConfirmationActions,
  navigate,
  isActionPlaying,
  currentActionTypeForAnimation
}) {
  return (
    <>
      <div className="absolute z-30">
        <PauseMenu
          onQuit={() => {
            stopAllSounds();
            resumeGame();
            navigate("/");
          }}
          onSetTime={toggleDebugModal}
        />
      </div>

      {/* Debug Modal */}
      <DebugBox
        modal={debugModal}
        toggleModal={toggleDebugModal}
        toggleModalFalse={toggleModalFalse}
        innerText={
          <>
            <Button
              text="Day"
              onClick={() => EventBus.emit("performAction", { type: "debug", jobId: "day" })}
            />
            <Button
              text="Night"
              onClick={() => EventBus.emit("performAction", { type: "debug", jobId: "night" })}
            />
          </>
        }
      />

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationActions.handleCancelCurrentAction}
        title={confirmationModalData.title}
      >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col itmes-center">
            <p className="text-sm text-gray-700 mb-3">{confirmationModalData.description}</p>
            <img src={confirmationModalData.image} alt="COBA" className="flex rounded-full w-auto h-60 border-2 border-amber-900" style={{imageRendering:'pixelated'}}/>
        </div>
        <div className="flex flex-row gap-10">
        {confirmationModalData.lossesText && (
          <p className="text-xl text-red-600 m-4">
            Loses: {confirmationModalData.lossesText}
          </p>
        )}
        {confirmationModalData.gainsText && (
          <p className="text-xl text-green-600 m-4">
            Gains: {confirmationModalData.gainsText}
          </p>
        )}
        </div>
        
      </div>
        
        <div className="flex justify-center space-x-3 gap-20 mt-8">
  <button
    onClick={handleConfirmationActions.handleCancelCurrentAction}
    className="w-24 h-10 text-sm font-bold text-black bg-no-repeat bg-contain border-none hover:scale-120 hover:cursor-pointer"
    style={{
      backgroundImage: `url(${No})`,
      imageRendering: 'pixelated',
    }}
  >
  </button>
  <button
    onClick={handleConfirmationActions.handleConfirmCurrentAction}
    className="w-24 h-10 text-sm font-bold text-white bg-no-repeat bg-contain border-none hover:scale-120 hover:cursor-pointer"
    style={{
      backgroundImage: `url(${Yes})`,
      imageRendering: 'pixelated',
    }}
  >
  </button>
</div>

      </Modal>

      {/* Action Flow Animation */}
      <ActionFlow
        isPlaying={isActionPlaying}
        currentActionType={currentActionTypeForAnimation}
        onSkip={handleConfirmationActions.handleSkipActionAnimation}
      />
    </>
  );
}