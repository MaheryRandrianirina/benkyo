import { EditProfilePhotoDOMInteractions } from "../AbstractClasses/EditProfilePhotoDOMInteractions"
import { get } from "../Functions/Request/ajax"

/**
* affiche le modal
* @param {Event} e 
*/
export function handleEditProfilePhoto(e){
    e.preventDefault()
    get("/editProfilePhoto").then(response => {
        let domInteractions = new EditProfilePhotoDOMInteractions()
        domInteractions.createModal("edit_profile_photo_modal", response, {
            defaultModalContent: true
        })
        domInteractions.handleActionsInModalContent()
    }).catch(error => {
        console.error("Echec de la mise à jour de la photo de profile. Erreur : " + error)
   })
}