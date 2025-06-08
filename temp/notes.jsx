 useEffect(() => {
    
    const handleExecuteAction = (payload) => {
      console.log("Received performAction event to execute:", payload);
      // Assuming payload is { type, jobId, itemId } as emitted by handleConfirmCurrentAction
      const { type, jobId, itemId } = payload; 
      setStatus((prev) => {
        const newStatus = handleActionLogic(type, prev, jobId, itemId);
        console.log("Old status after action:", prev);
        console.log("New status after action:", newStatus);
        return newStatus;
      });
    };

    const handlePerformVN = (chapter) => {
      console.log("Received performVN event with chapter:", chapter);
      VNSelector(chapter);
      // Consider pausing game here:
      // pauseGame(); // or GameState.isGamePaused = true; EventBus.emit("pausePhaserScene");
    };

   
    const handleShowCustomModal = (data) => {
      console.log("React: Received showCustomModal event with data:", data);
      setConfirmationModalData({
        title: data.title || "Konfirmasi",
        description: data.description || "Apakah kamu yakin?",
        gainsText: data.gainsText || "",
        lossesText: data.lossesText || "",
        actionType: data.actionType,
        actionParams: data.actionParams, // Store the whole actionParams
        modalId: data.modalId,
      });
      setIsConfirmationModalOpen(true);
      pauseGame();
      console.log("Game paused for confirmation modal:", data.modalId);
    };
    // ######################################################

    EventBus.on("performAction", handleExecuteAction); // Renamed for clarity
    EventBus.on("performVN", handlePerformVN);
    EventBus.on("showCustomModal", handleShowCustomModal); // ##### MODIFIED: Added listener #####

    return () => {
      EventBus.off("performAction", handleExecuteAction);
      EventBus.off("performVN", handlePerformVN);
      EventBus.off("showCustomModal", handleShowCustomModal); // ##### MODIFIED: Added cleanup #####
    };
  }, [setStatus, VNSelector]);


  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
//RUMAH
function checkOverlapRUAMH() {
    let stillOverlapping = false;

    this.interactables.children.iterate((obj) => {
      if (this.physics.overlap(this.player, obj)) {
        this.currentInteractable = obj;
        stillOverlapping = true;
      }
    });

    if (!stillOverlapping) {
      this.currentInteractable = null;
    }

    // Check for E press only if still overlapping
    if (this.currentInteractable && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      const id = this.currentInteractable.properties?.id;
      if (id != "out") {
        console.log("Pressing E near:", id);
        EventBus.emit("callObjective", "Done");
        EventBus.emit("show-dialog", { id });
      } else if (id == "out") {
        const enteringText = this.add
          .text(this.cameras.main.centerX, -50, "Exiting....", {
            fontSize: "48px",
            fill: "#ffffff",
            fontStyle: "bold",
            resolution: 2,
          })
          .setOrigin(0.5)
          .setDepth(1000)
          .setScrollFactor(0);
        GameState.afterVN = false;
        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.cameras.main.once("camerafadeoutcomplete", () => {
          enteringText.destroy();
          this.scene.start("MainGame");
        });
      }
      if (id === "Kosuzu1") {
        this.handleSaveVN();
        EventBus.emit("performVN", "act3Data");
      }
      if (id === "bath") {
        // Or any other ID that should trigger a "jalan-jalan" action
        // If you want to save player state before modal
        EventBus.emit("showCustomModal", {
          // modalId: "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
          title: `Is Bathing!`, // Dynamic title
          description: "Do you want to bath to clean yourself up?",
          // You can add specific gains/losses text if you want to display them
          gainsText: "8",
          lossesText: "0",
          actionType: "bath", // <<< This is CRUCIAL for triggering jalan.js later
          actionParams: {
            /* No specific params needed by jalan.js directly, but structure is there */
          },
        });
        this.currentInteractable = null; // Prevent immediate re-trigger
      }

      if (id === "sleep") {
        // Or any other ID that should trigger a "jalan-jalan" action
        // If you want to save player state before modal
        this.handleSaveVN(); // If you want to save player state before modal
        EventBus.emit("showCustomModal", {
          modalId: "jalanConfirmation_rumah", // Make modalId unique if content depends on location
          title: `Jalan-jalan di ${GameState.currentlocation.currentLoc}?`, // Dynamic title
          description: "Do you want to take a walk to increase Happiness ?",
          // You can add specific gains/losses text if you want to display them
          // gainsText: "...",
          // lossesText: "...",
          actionType: "jalan", // <<< This is CRUCIAL for triggering jalan.js later
          actionParams: {
            /* No specific params needed by jalan.js directly, but structure is there */
          },
        });
        this.currentInteractable = null; // Prevent immediate re-trigger
      }
      if (id === "act1") {
        GameState.currentAct = "act1";
        this.handleSaveVN();
        EventBus.emit("performVN", "act1Data");
      }
    }
  }

//PANTAIJS
checkOverlap() {
    let stillOverlapping = false;

    this.interactables.children.iterate((obj) => {
      if (this.physics.overlap(this.player, obj)) {
        this.currentInteractable = obj;
        stillOverlapping = true;
      }
    });

    if (!stillOverlapping) {
      this.currentInteractable = null;
    }

    // Check for E press only if still overlapping
    if (this.currentInteractable && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      const id = this.currentInteractable.properties?.id;
      console.log("YA!");
      if (id != "out") {
        console.log("Pressing E near:", id);
        EventBus.emit("callObjective", "Done");
        EventBus.emit("show-dialog", { id });
      } else if (id == "out") {
        const enteringText = this.add
          .text(this.cameras.main.centerX, -50, "Exiting....", {
            fontSize: "48px",
            fill: "#ffffff",
            fontStyle: "bold",
            resolution: 2,
          })
          .setOrigin(0.5)
          .setDepth(1000)
          .setScrollFactor(0);
        GameState.afterVN = false;
        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.cameras.main.once("camerafadeoutcomplete", () => {
          enteringText.destroy();
          this.scene.start("MainGame");
        });
      }
      if (id === "Kosuzu1") {
        this.handleSaveVN();
        EventBus.emit("performVN", "act3Data");
      }
      if (id === "shop") {
        EventBus.emit("showShop");
      }
    }
  }

  //DIENG OVELAP
  

//MODULARITY MAPPING GUI?

//Idenya semua GUI Di map dalam satu tempat? Atau khusus modal box aja ?

<>

  <div className="absolute 
      z-30">
      <PauseMenu onQuit={ () => {stopAllSounds(); resumeGame(); navigate("/")} } onSetTime={() => {toggleDebugModal()}}/>
        
      </div>
      <DebugBox modal={debugModal} toggleModal={()=>{toggleDebugModal()}} toggleModalFalse={() =>{toggleModalFalse()}} innerText={
        <>
          <Button text="Day" onClick={() => {EventBus.emit("performAction", {type:"debug", jobId:"day"})}}/>
          <Button text="Night" onClick={() => {EventBus.emit("performAction", {type:"debug", jobId:"night"})}}/>
        </>
        }/>
      {/* ##### NEW: Render the Confirmation Modal ##### */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelCurrentAction} // 'x' button or backdrop click defaults to cancel
        title={confirmationModalData.title}
      >
        <p className="text-sm text-gray-700 mb-3">{confirmationModalData.description}</p>
        {confirmationModalData.gainsText && (
          <p className="text-sm text-green-600 font-semibold">Gains: {confirmationModalData.gainsText}</p>
        )}
        {confirmationModalData.lossesText && (
          <p className="text-sm text-red-600 font-semibold mb-4">Loses: {confirmationModalData.lossesText}</p>
        )}
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={handleCancelCurrentAction}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            No / Cancel
          </button>
          <button
            onClick={handleConfirmCurrentAction}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Yes / Confirm
          </button>
        </div>
      </Modal>
      {/* ############################################ */}

      {/* Buat munculin gif waktu work */}
      <ActionFlow 
        isPlaying={isActionPlaying} 
        currentActionType={currentActionTypeForAnimation} 
        onSkip={handleSkipActionAnimation} 
      />

  
</>
