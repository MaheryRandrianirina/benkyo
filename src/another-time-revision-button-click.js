import { PutSubjectRevisionToAnotherTimeDOMinteractions } from "./AbstractClasses/PutSubjectRevisionToAnotherTimeDOMinteractions"

export default function anotherTimeRevisionButtonClick(e){
    let clickedElement = e.target
    let domInteractions = new PutSubjectRevisionToAnotherTimeDOMinteractions()
    domInteractions.createModal("another-time-revision-modal", `
    <div class='new-datetime'>
        <div class='new-date-container'>
            <label for='new-date'>Nouvelle date :</label>
            <input type='date' name='new_date' id='new-date'>
        </div>
        <div class='new-time-container'>
            <label for='new-time'>Heure :</label>
            <input type='time' name='new_time' id='new-time'>
        </div>
    </div>
    <p>Toutes les révisions ultérieures seront repoussées !</p>
    <button class='sure'>Enregistrer</button><button class='no'>Annuler</button>
    `)
    
    domInteractions.handleActionsInModalContent(clickedElement, true)
    clickedElement.removeEventListener('click', anotherTimeRevisionButtonClick)
}