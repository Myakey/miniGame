export default function soundTrial(newSound){
    let varAudio;
    let AudioExists = false;
    switch(newSound){
        case undefined: 
            if(AudioExists == false){
                
            }
            break;
        case "none": varAudio.pause();
        default : 
            if(varAudio )
            varAudio = new Audio(newSound);
            varAudio.play();
    }
}