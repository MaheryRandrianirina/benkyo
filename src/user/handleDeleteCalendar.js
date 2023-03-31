import deleteCalendarDOMInteractions from "../AbstractClasses/deleteCalendarDOMInteractions";

export default function handleDeleteCalendar(e) {
    e.preventDefault();
    let domInteractions = new deleteCalendarDOMInteractions()
    domInteractions.createModal('delete_calendar_modal', `
    <p>Vous êtes sûr de vouloir supprimer cet emploi du temps?</p>
    <button class='sure'>Oui, supprimer l'emploi <br>du temps</button><button class='no'>Annuler</button>
    `)
    domInteractions.handleActionsInModalContent(e.currentTarget, true)
}