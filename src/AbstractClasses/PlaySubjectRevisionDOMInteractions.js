import { get } from "../Functions/Request/ajax";
import { removeElementFromDOM } from "../Functions/Tools/DOMTools";
import { createArray, isUndefined } from "../Functions/Tools/Tools";
import playSubject, { pauseMomentDuring } from "../playSubject";
import { ThereAreDataToSendWithGETRequest } from "./ThereAreDataToSendWithGETRequest";

export default class PlaySubjectRevisionDOMInteractions extends ThereAreDataToSendWithGETRequest {
    formAction = "/stop-revision"
    notificationClassName = 'subject-revision-stopped'

    constructor()
    {
        super() 
        this.anotherTimeButtons
        this.circular
        /**
         * la valeur du temps à t = 0 cad au début quand la revision vient de commencer
         * La véritable valeur c'est 0 mais la valeur actuelle est juste pour les tests
         * @var defaultTimeValue
         */
        this.defaultTimeValue = 1450
        this.homeContentSection
        this.intervalOfChronometer
        this.pauseButton
        this.playButton
        this.otherPlayButton
        this.playedRevisionContainer
        this.playedRevisionInfosContainer
        this.revisionBodies
        this.revisionHead 
        this.stopButton
        this.time = this.defaultTimeValue 
        this.timeForRevisionChrono = this.defaultTimeValue
        this.pomodoroDuration = 25 // in minutes
        this.pauseDurationInMinutes = 5
        this.timeInterval = 0
    }

    handlePlayButtonClick(e)
    {
        this.declareInstanceVar(e)
        this.activePlayedRevision()
        this.clickOnAnotherTimeButton()
        this.appendNewButtons()
        this.pomodoroInterval()
        this.createChronometer(this.pomodoroDuration, this.timeForRevisionChrono)
        this.checkForPauseButtonClick()
        get("/array-calendar-content")
    }

    declareInstanceVar(e)
    {
        this.playButton = e.target
        this.homeContentSection = document.querySelector('.content')
        this.playedRevisionContainer = this.playButton.parentElement.parentElement.parentElement.parentElement
        this.playedRevisionInfosContainer = this.createElement('div', "played-revision-container")
        this.notplayedRevisionInfosContainer = this.createElement('div', "not-played-revision-container")
        this.revisionHead = this.homeContentSection.querySelector('.revision_head')
        this.revisionHeadClone = this.revisionHead .cloneNode(true)
        this.revisionBodies = createArray(this.homeContentSection.querySelectorAll('.revision_body'))
        this.anotherTimeButtons = document.querySelectorAll('.another-time-revision-button')
    }

    activePlayedRevision()
    {
        this.revisionBodies?.forEach(revisionBody => {
            if(revisionBody !== this.playedRevisionContainer){
                this.notplayedRevisionInfosContainer.appendChild(this.revisionHeadClone)
                this.notplayedRevisionInfosContainer.appendChild(revisionBody)
                this.homeContentSection.appendChild(this.notplayedRevisionInfosContainer)
            }else{
                this.playedRevisionInfosContainer.appendChild(this.revisionHead)
                this.playedRevisionInfosContainer.appendChild(revisionBody)
                this.homeContentSection.appendChild(this.playedRevisionInfosContainer)
            }
            this.playedRevisionInfosContainer.classList.add('active-revision')
            this.notplayedRevisionInfosContainer.classList.add('not-active-revisions')
        })
    }

    clickOnAnotherTimeButton()
    {
        this.anotherTimeButtons.forEach(button => {
            button.style.display = "none"
        })
    }

    appendNewButtons()
    {
        this.replacePlayToPauseButton()
        this.appendStopButtonToButtonsGroupThenListenToClick()
    }

    replacePlayToPauseButton()
    {
        let playContainer = this.playButton.parentElement
        const pauseIcon = this.createElement('i', 'fas fa-pause revision-button revision-pause')
        this.pauseButton = this.createElement('div')
        this.pauseButton.appendChild(pauseIcon)
        playContainer.replaceWith(this.pauseButton)
        this.playButton = undefined
    }

    appendStopButtonToButtonsGroupThenListenToClick()
    {
        let stopButtonContainer = this.createElement('div', 'stop_button')
        let stopButtonIcon = this.createElement('i', 'fas fa-stop stop')
        this.stopButton = this.createElement('div')
        this.stopButton.appendChild(stopButtonIcon)
        stopButtonContainer.appendChild(this.stopButton)
        this.playedRevisionContainer.querySelector('.buttons').appendChild(stopButtonContainer)
        
        this.stopButton?.addEventListener('click', this.stopCurrentRevision.bind(this))
    }

    stopCurrentRevision(e)
    {
        e.preventDefault()

        let stop = e.target
        let playedSubjectContainer = stop.parentElement
        this.playedSubjectContainerChildren = createArray(playedSubjectContainer.children)
        
        this.createModal("sure_modal", `
        <p>Êtes-vous sûr que la revision de cette matière soit finie ?</p>
        <button class='sure'>Oui, j'en suis sur</button><button class='no'>Annuler</button>
        `)
        this.handleActionsInModalContent(true)
    }

    /**
     * 
     * @param {number | null} interval 
     * @param {boolean} dataMustBeSentToserverInConfirmation
     */
    handleActionsInModalContent(dataMustBeSentToserverInConfirmation = false, interval = null)
    {
        this.timeInterval = interval
        super.handleActionsInModalContent(null, dataMustBeSentToserverInConfirmation)
    }

    processActionsWithoutSendingDataToServer()
    {
        clearInterval(this.timeInterval)
        let playContainer = this.createElement('div')
        this.otherPlayButton = this.createElement('i', 'fas fa-play revision-button other-revision-play')
        playContainer.appendChild(this.otherPlayButton)
        this.pauseButton.replaceWith(playContainer)
        this.pauseButton.removeEventListener('click', this.handlePauseButtonClick)
        
        this.resetTimeToHisDefaultValue()
        this.closeModal()
        pauseMomentDuring(this.pauseDurationInMinutes)
        this.continueRevisionAfterPause()
    }

    processSendingDataToServer()
    {
        this.createDataToPostObj()
        this.notificationClassName = 'stoped_revision_notification'
        this.postContentWithNotificationThenReload()
        this.playedSubjectContainerChildren.forEach(child => {
            removeElementFromDOM(child)
        })
    }

    resetTimeToHisDefaultValue()
    {
        this.time = this.defaultTimeValue
    }
    
    continueRevisionAfterPause(){
        setTimeout(()=>{
            if(isUndefined(this.otherPlayButton)){
                this.playButton.addEventListener('click', ()=>{
                    this.playButton.replaceWith(this.pauseButton)
                    this.playButton = undefined
                    this.pomodoroInterval()
                    this.createChronometer(this.pomodoroDuration, this.timeForRevisionChrono)
                })  
            }else{
                this.otherPlayButton.addEventListener('click', ()=>{
                    this.otherPlayButton.replaceWith(this.pauseButton)
                    this.otherPlayButton = undefined
                    this.pomodoroInterval()
                    this.createChronometer(this.pomodoroDuration, this.timeForRevisionChrono)
                }) 
            }
            
        }, 15000) // ON VA CHANGER LA FONCTION POUR QUE CETTE VALEUR SOIT DYNAMIQUE
    }

    pomodoroInterval(){
        let timeToStop = this.pomodoroDuration * 60
        this.interval = setInterval(()=>{
            this.time++
            if(this.time === timeToStop){
                this.createModal("pause_modal", `
                <p>C'est le moment de faire une pause ! <span style='font-weight:bold;'>Mettez une alarme de 5 min<span></p>
                <button class='sure'>OK</button><button class='no'>Annuler</button>
                `)
                this.handleActionsInModalContent(false, this.interval) 
            }
        }, 1000)
    }

    createChronometer(duration, timeForStop){
        let durationSeconds = duration * 60 
        let innerCircular = this.createCircular(durationSeconds, timeForStop)
    
        this.intervalOfChronometer = setInterval(()=>{
            durationSeconds--
            let minutesLeft = Math.floor(durationSeconds / 60) 
            let secondsLeft = durationSeconds % 60
            
            innerCircular.innerHTML = `<p id='chronometer'>${minutesLeft}:${secondsLeft}</p>`
            if(durationSeconds === timeForStop){
                removeElementFromDOM(this.circular)
                this.circular = undefined
                clearInterval(this.intervalOfChronometer)
            }      
        }, 1000)
    }

    createCircular(durationSeconds, timeForStop)
    {
        this.circular = this.createElement("div", "circular")
        let inner = this.createElement("div", "inner")
        let circle = this.createElement("div", "circle")
        let leftBar = this.createElement("div", "bar left")
        let right = this.createElement("div", "bar right")
        let leftProgress = this.createElement("div", "progress")
        let rightProgress = this.createElement("div", "progress")
        
        this.playedRevisionInfosContainer.appendChild(this.circular)
        this.circular.appendChild(inner)
        this.circular.appendChild(circle)

        circle.appendChild(leftBar)
        circle.appendChild(right)
        leftBar.appendChild(leftProgress)
        right.appendChild(rightProgress)

        leftProgress.style.animationDuration = ((durationSeconds - timeForStop) / 2) + 's'
        rightProgress.style.animationDelay = ((durationSeconds - timeForStop) / 2) + 's'
        rightProgress.style.animationDuration = ((durationSeconds - timeForStop) / 2) + 's'

        return inner
    }

    createDataToPostObj()
    {
        let hiddenInputs 
        if(this.playButton){
            hiddenInputs = this.playButton.parentElement.parentElement.parentElement.querySelectorAll("input[type='hidden']")
        }else if(this.otherPlayButton){
            hiddenInputs = this.otherPlayButton.parentElement.parentElement.parentElement.querySelectorAll("input[type='hidden']")
        }else {
            hiddenInputs = this.pauseButton.parentElement.parentElement.parentElement.querySelectorAll("input[type='hidden']")
        }
        hiddenInputs.forEach(hiddenInput => {
            this.dataToPostObj[hiddenInput.name] = hiddenInput.value
        })
        this.dataToPostObj["status"] = 1
    }

    checkForPauseButtonClick()
    {
        this.pauseButton?.addEventListener('click', this.handlePauseButtonClick.bind(this))
    }

    handlePauseButtonClick()
    {
        clearInterval(this.interval)
        clearInterval(this.intervalOfChronometer)
        this.resetTimeToHisDefaultValue()
        this.stopButton.removeEventListener('click', this.stopCurrentRevision)
        if(!isUndefined(this.circular)){
            removeElementFromDOM(this.circular)
        }
        
        let playButtonIcon = this.createElement('i', 'fas fa-play revision-button other-revision-play')
        this.otherPlayButton = this.createElement('div')
        this.otherPlayButton.appendChild(playButtonIcon)
        this.pauseButton.replaceWith(this.otherPlayButton)
        pauseMomentDuring(this.pauseDurationInMinutes)
        this.continueRevisionAfterPause()
    }
}