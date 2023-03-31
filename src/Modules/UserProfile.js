
import { get } from "jquery"
import EventCreationDOMInteractions from "../AbstractClasses/EventCreationDOMInteractions"
import { handleEditProfilePhoto } from "../user/editProfilePhoto"



export default class UserProfile {
    
    constructor()
    {
        this.loadProfilePhoto()
        this.domInteractions = new EventCreationDOMInteractions()
        this.profilePhotoEdition()
        this.eventManagement()
    }

    loadProfilePhoto()
    {
        document.querySelector('.user-profile-photo').removeAttribute('hidden')
    }
    
    profilePhotoEdition()
    {
        const editProfilePhoto = document.querySelector('.user-profile-photo-edit')
        const editProfilePhotoModal = document.querySelector('.edit-profil-photo-modal')
        if(editProfilePhotoModal === null){
            editProfilePhoto.addEventListener('click', handleEditProfilePhoto)
        }
    }

    eventManagement()
    {
        this.eventsElement = document.querySelector('.events')
        this.eventInteractions()
        this.eventCreation()
        this.clickOnShowAllEvents()
    }

    eventInteractions()
    {
        let events = this.eventsElement.querySelectorAll('.event')
        events.forEach(event => {
            event.addEventListener('click', this.showEventCompleteData.bind(this))
            event.querySelector('.fa-trash').addEventListener('click', this.deleteEvent.bind(this))
        })
    }

    showEventCompleteData(e)
    {
        let clickedEvent = e.currentTarget
        let hiddenEventData = clickedEvent.querySelectorAll('.hidden_event_data')
        hiddenEventData.forEach(data => {
            if(data.hasAttribute('hidden')){
                data.removeAttribute('hidden')
            }else {
                data.setAttribute('hidden', true)
            }
        })
    }

    deleteEvent(e)
    {
        this.domInteractions.createModal("event_deletion_modal", `
            <p>Vous êtes sûr de vouloir supprimer cet évènement ?</p>
            <button class="sure">Oui, supprimer l'évènement</button><button class='no'>Annuler</button>
        `)

        this.domInteractions.handleActionsInModalContent(e.currentTarget, true)
    }

    eventCreation()
    {
        const button = this.eventsElement.querySelector('.add_event')
        button?.addEventListener('click', this.showEventCreationModal.bind(this))
    }

    showEventCreationModal()
    {
        this.domInteractions.createModal("event_creation_modal",`
        <form action="/event/create" method="post">
            <div class="event_one">
                <p class='caption'>Evenement  1</p>
                <div class="form_group">
                    <label>Nom :</label>
                    <input type="text" name="event_name_one"/>
                </div>
                <div class="form_group">
                    <label>Date :</label>
                    <input type="date" name="event_date_one"/>
                </div>
                <div class="form_group">
                    <label>Description :</label>
                    <textarea name="event_description_one"></textarea>
                </div>
            </div>
            <div class="event_two">
                <p class='caption'>Evenement  2 (Optionnel)</p>
                <div class="form_group">
                    <label>Nom :</label>
                    <input type="text" name="event_name_two"/>
                </div>
                <div class="form_group">
                    <label>Date :</label>
                    <input type="date" name="event_date_two"/>
                </div>
                <div class="form_group">
                    <label>Description :</label>
                    <textarea name="event_description_two"></textarea>
                </div>
                </div>
            <button class='save_events modal-add'>Enregistrer</button>
        </form>
        `, {defaultModalContent: true})
        
        this.domInteractions.handleActionsInModalContent()
    }

    clickOnShowAllEvents()
    {
        this.eventsElement.querySelector('.show_all_events')?.addEventListener('click', this.showAllEvents.bind(this))
    }

    showAllEvents(e)
    {
        e.preventDefault()
        get('/events').then(res => {
            this.domInteractions.createModal('events_showing_modal', res, {defaultModalContent: true})
            this.domInteractions.handleActionsInModalContent()
        }).catch(err => console.error(err))
    }
}