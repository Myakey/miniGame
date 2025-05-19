export let isPaused = false;

export const pauseGame = () =>{
    isPaused = true;
};

export const resumeGame = () =>{
    isPaused = false;
}