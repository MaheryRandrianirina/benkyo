import PlaySubjectRevisionDOMInteractions from "./AbstractClasses/PlaySubjectRevisionDOMInteractions"

let domInteractions = new PlaySubjectRevisionDOMInteractions()

/**
 * Lance la révision
 * @param {Event} e 
 */
export default function playSubject(e){
    e.preventDefault()
    domInteractions.handlePlayButtonClick(e)
    e.currentTarget.removeEventListener('click', playSubject)
}


/**
 * @param {number} duration durée de la pause en minutes
 */
export function pauseMomentDuring(duration){
    let timeBeginInSeconds = 0
    const pauseDurationInSeconds = duration * 60
    
    domInteractions.createChronometer(duration, timeBeginInSeconds)
    const intervalDuringPause = setInterval(()=>{
        timeBeginInSeconds++
        if(timeBeginInSeconds === pauseDurationInSeconds){
            clearInterval(intervalDuringPause)
            domInteractions.createModal('notification', `
            <p>La pause est terminée !</p>
            <button class='ok'>OK</button>
            `)
            domInteractions.handleActionsInModalContent()
        }
    }, 1000)
}

