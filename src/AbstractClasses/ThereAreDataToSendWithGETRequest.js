import DOMInteractions from "./DOMInteractions";

export class ThereAreDataToSendWithGETRequest extends DOMInteractions {

    constructor()
    {
        super()
        this.dataMustBeSentToserverInConfirmation = false
    }

    /**
     * @param {HTMLElement} clickedElement
     * @param {boolean} dataMustBeSentToserverInConfirmation
     */
    handleActionsInModalContent(clickedElement = null, dataMustBeSentToserverInConfirmation = false)
    {
        if(clickedElement){
            this.currentClickedButton = clickedElement
        }
        
        this.dataMustBeSentToserverInConfirmation = dataMustBeSentToserverInConfirmation
        super.handleActionsInModalContent()
    }

    handleActionsInModalConfirmation()
    {
        super.handleActionsInModalConfirmation()
        this.modal.querySelector('.sure').addEventListener('click',  this.handleSureClick.bind(this))
    }
    
    handleSureClick()
    {
        if(!this.dataMustBeSentToserverInConfirmation){
            this.processActionsWithoutSendingDataToServer()
        }else {
            this.processSendingDataToServer()
        }    
    }
}