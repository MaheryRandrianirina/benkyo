import {  post } from "../Functions/Request/ajax";
import { removeElementFromDOM } from "../Functions/Tools/DOMTools";
import { ThereAreDataToSendWithGETRequest } from "./ThereAreDataToSendWithGETRequest";


export default class EventCreationDOMInteractions extends ThereAreDataToSendWithGETRequest {
    formAction = '/event/create'
    notificationClassName = "event_creation_notification"
    constructor()
    {
        super()
    }

    handleActionsInSimpleModal()
    {
        super.handleActionsInSimpleModal()
        this.clickOnDeleteEventButtons()
    }

    clickOnDeleteEventButtons()
    {
        let deleteButtons = this.modal.querySelectorAll('.fa-trash')
        deleteButtons.forEach(button => {
            button.addEventListener('click', this.deleteEvent.bind(this))
        })
    }

    deleteEvent(e)
    {
        this.createModal("event_deletion_modal", `
        <p>Vous êtes sûr de vouloir supprimer cet évènement ?</p>
        <button class="sure">Oui, supprimer l'évènement</button><button class='no'>Annuler</button>
        `)
        
        this.handleActionsInModalContent(e.currentTarget, true)
    }

    /**
     * @return {boolean} retourne s'il y a un input vide
     */
    isDataPostValid()
    {
        let noEmptyInput = true
        this.sortDataToPost()
        for(const name in this.dataToPostObj){
            if(name.includes('one') && (this.dataToPostObj[name] === null ||
                this.dataToPostObj[name] === '' || 
                this.dataToPostObj[name] === undefined)
            ){
                this.emptyInputsMessage[name] = "Ce champ ne peut pas être vide."
                noEmptyInput = false
            }
        }
        
        return noEmptyInput
    }

    sortDataToPost()
    {
        let nameIncludingTermOne = {}
        let nameIncludingTermTwo = {}
    
        for(const name in this.dataToPostObj){
            if(this.dataToPostObj)
            if(name.includes('one')){
                nameIncludingTermOne[name] = this.dataToPostObj[name]
            }else if(name.includes('two')){
                nameIncludingTermTwo[name] = this.dataToPostObj[name] 
            }
        }

        this.dataToPostObj = Object.assign({}, nameIncludingTermOne, nameIncludingTermTwo)
    }

    processSendingDataToServer()
    {
        const eventId = this.currentClickedButton.parentElement.parentElement.querySelector('input[type="hidden"]').value
        post('/event/delete', {'id': eventId}).then(res => {
            const response = JSON.parse(res)
            if(response.success){
                this.closeModal()
                this.removeDeletedEventFromList()
            }
        }).catch(error => {
            this.handleErrorsCatching(error)
        })
    }

    removeDeletedEventFromList()
    {
        removeElementFromDOM(this.currentClickedButton.parentElement.parentElement)
        
        let eventsShowingModal = document.querySelector('.events_showing_modal')
        let eventsElement = eventsShowingModal !== null ? eventsShowingModal.querySelector('.all_events') : document.querySelector('.events')
        if(eventsElement.querySelectorAll('.event').length === 0){
            this.reloadPage()
        }
    }
}