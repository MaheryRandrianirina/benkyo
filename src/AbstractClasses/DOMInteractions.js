import { post } from "../Functions/Request/ajax"
import { removeElementFromDOM, removeProgressbar } from "../Functions/Tools/DOMTools"
import { foreachArrayElements, isUndefined } from "../Functions/Tools/Tools"

export default class DOMInteractions {

    formAction = ''
    notificationClassName = ''
    showNotification = true

    constructor()
    {
        this.dataToPostObj = {}
        this.emptyInputsMessage = []
        this.timeOutForReload = 1000
        this.modalHeightToAdd = 0
        this.modalForm
        this.originalBodyHeight = 0
        this.originalModalHeigth = 0
        this.originalModalFormHeigth = 0
        this.responseJSON
        this.showProgressBar = false
    }

    animateElementFromClassname(element, classNameForAnimation)
    {
        element.offsetWidth
        element.classList.add(classNameForAnimation)
    }

    appendModalToDOM()
    {
        document.body.appendChild(this.modalContainer)
        this.modalContainer.appendChild(this.modal)
    }

    createCircleLoader()
    {
        this.createCircle()
    }

    createCircle()
    {
        this.circle = this.createElement('div', 'circle_loader')
        document.body.appendChild(this.circle)
    }

    removeModalFromDOMWithAnimation(numberOfModalToClose)
    {
        this.modal.classList.remove('active_modal')
        this.modal.addEventListener('transitionend', ()=>{
            if(
                this.modalContainer
                && this.modalContainer.parentElement !== null
            ){
                removeElementFromDOM(this.modalContainer)
            }  
        })
        
        if(this.modal !== null || !isUndefined(this.modal)){
            removeElementFromDOM(this.modalContainer)
            // ON DOIT AJOUTER UN TIMEOUT ICI MAIS D'ABORD IL FAUT QU'ON TROUVE LE MOYEN DE FAIRE
            // EXECUTER LE CODE IMMEDIATEMENT SANS ATTENDRE LA QUEUE
        }
        
        this.manageRemainingModal(numberOfModalToClose) 
    }

    manageRemainingModal(numberOfModalToClose)
    {
        let notRemovedModalContainer = document.querySelector('.modal_container')
        if(notRemovedModalContainer){
            if(numberOfModalToClose > 1){
                removeElementFromDOM(notRemovedModalContainer)
            }else {
                this.modalContainer = notRemovedModalContainer
                this.modal = this.modalContainer.querySelector('.main_modal')
            }
            
        }
    }
    
    /**
     * @return {HTMLElement} element
     */
    createElement(type, className = null) 
    {
        let element = document.createElement(type);
        if (className !== null) {
            element.className = className;
        }
        return element;
    }

    /**
     * 
     * @param {string} className 
     * @param {string} content 
     * @param {{defaultModalContent:true}|null} options 
     * @returns 
     */
    createModal(className, content, options = null)
    {
        this.modalContainer = this.createElement('div', 'modal_container')
        this.modal = this.createElement('div', `main_modal ${className}`)
        this.appendModalToDOM()
        this.animateElementFromClassname(this.modal, 'active_modal')
        
        if(
            options !== null && 
            options.defaultModalContent !== undefined
        ) {
            this.innerDefaultModalContent()
            this.innerElementContentHTML(this.modalContentContainer,  content)
        }else {
            this.innerElementContentHTML(this.modal,  content)
        }
        
        this.saveModalAndBodyAndFormOriginalHeigth()
        this.modalContainer.addEventListener('click', this.closeModalThenRemoveHisEventListener.bind(this))
        this.avoidCloseModalOnClickIn()

        return this.modal
    }

    saveModalAndBodyAndFormOriginalHeigth()
    {
        this.originalBodyHeight = document.body.offsetHeight
        this.originalModalHeigth = this.modal.offsetHeight
        if(this.modal.querySelector('form') !== null){
            this.originalModalFormHeigth = this.modal.querySelector('form').offsetHeight
        }
        
    }

    innerDefaultModalContent()
    {
        this.modalContentContainer = this.createElement('div', 'container')
        
        this.modal.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close_btn">
        <line x1="15" y1="9" x2="9" y2="15">
        </line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`

        this.modal.appendChild(this.modalContentContainer)
    }

    avoidCloseModalOnClickIn()
    {
        this.modal.addEventListener('click', (e)=>{
            e.stopPropagation()
        })
    }

    /**
     * 
     * @param {number} numberOfModalToClose nombre de modales ouvertes à fermer
     */
    closeModal(numberOfModalToClose = 1)
    {
        this.removeModalFromDOMWithAnimation(numberOfModalToClose)
    }

    handleActionsInModalContent()
    {
        if(this.isModalAForm()){
            this.modalForm = this.modal.querySelector('form')
            this.handleActionsInModalForm()
        }else if(this.isModalConfirmation()){
            this.handleActionsInModalConfirmation()
        }else if(this.isModalAlert()){
            this.handleActionsInModalAlert()
        } else {
            this.handleActionsInSimpleModal()
        }
    }

    isModalAForm()
    {
        const modalForm = this.modal.querySelector('form')
        return modalForm !== null
    }

    isModalConfirmation()
    {
        return this.modal.querySelector('.sure') !== null
    }

    isModalAlert()
    {
        return this.modal.querySelector('.ok') !== null
    }

    handleActionsInModalForm()
    {
        this.modalAddBtn = this.modal.querySelector('.modal-add')
        this.modalAddBtn.addEventListener('click', this.handleModalAddButtonClick.bind(this))
        this.ClickOnCloseModalButton()
    }

    handleActionsInModalConfirmation()
    {
        this.modal.querySelector('.no')?.addEventListener('click', ()=>{
            this.removeModalFromDOMWithAnimation()
        })
    }

    handleActionsInModalAlert()
    {
        this.modal.querySelector('.ok').addEventListener('click', this.closeModal.bind(this))
    }

    ClickOnCloseModalButton()
    {
        this.modalCloseBtn = this.modal.querySelector('.close_btn')
        this.modalCloseBtn.addEventListener('click', this.closeModalThenRemoveHisEventListener.bind(this))
    }

    handleActionsInSimpleModal()
    {
        this.ClickOnCloseModalButton()
    }
    
    /**
     * 
     * @param {MouseEvent} e 
     */
    handleModalAddButtonClick(e)
    {
        e.preventDefault()
        this.createDataToPostObjFromModal()
        
        if(this.isDataPostValid()){
           this.postForm() 
        }else{
            this.alertEmptyInputs()
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    closeModalThenRemoveHisEventListener(e)
    {
        this.closeModal()
        e.target.removeEventListener('click', this.closeModalThenRemoveHisEventListener)
    }
    
    /**
     * @var this.currentClickedButton est déclarée dans une méthode là où l'on a besoin de le faire
     */
    createDataToPostObjFromModal()
    {
        this.modalInputs = this.selectAllFormInputsAndTextarea()
        
        if(this.currentClickedButton && isUndefined(this.hiddenInputsContainingDataNeededForXHR)){
            this.hiddenInputsContainingDataNeededForXHR = [].slice.call(this.currentClickedButton.parentElement.querySelectorAll('input[type="hidden"]'))
        }
        
        if(this.modalInputs !== null && this.modalInputs !== undefined){
            this.modalInputs.forEach(input => {
                this.setIntoDataToPostValueOf(input) 
            })
            if(this.hiddenInputsContainingDataNeededForXHR !== null 
                && this.hiddenInputsContainingDataNeededForXHR !== undefined
            ) {
                this.hiddenInputsContainingDataNeededForXHR.forEach(input => {
                    this.setIntoDataToPostValueOf(input)
                })
            }
        }else if(this.hiddenInputsContainingDataNeededForXHR !== null 
            && this.hiddenInputsContainingDataNeededForXHR !== undefined
        ) {
            this.hiddenInputsContainingDataNeededForXHR.forEach(input => {
                this.setIntoDataToPostValueOf(input)
            })
        }
        
    }

    selectAllFormInputsAndTextarea()
    {
        let inputs = [].slice.call(this.modal.querySelectorAll('input'))
        this.modal.querySelectorAll('textarea')?.forEach(textarea => {
            inputs.push(textarea)
        })
        return inputs
    }

    setIntoDataToPostValueOf(input)
    {
        if(
            input.type !== 'file'
        ){
            this.dataToPostObj[input.name] = input.value
        }else {
            this.dataToPostObj[input.name] = input.files[0]
        }
    }

    /**
     * @return {boolean} retourne s'il y a un input vide
     */
    isDataPostValid()
    {
        let noEmptyInput = true
        for(const name in this.dataToPostObj){
            if(this.dataToPostObj[name] === null ||
                this.dataToPostObj[name] === '' || 
                this.dataToPostObj[name] === undefined
            ){
                this.emptyInputsMessage[name] = "Ce champ ne peut pas être vide."
                noEmptyInput = false
            }
        }

        return noEmptyInput
    }

    postForm()
    {
        if(this.showNotification){
            this.postContentWithNotificationThenReload()
        }else{
            this.submitDirectyly()
        }
        
    }
    
    alertEmptyInputs()
    {
        this.modalInputs.forEach(input => {
            if(this.isMessageCorrespondsTo(input.name)){
                this.showErrorMessage(input)
            }
        })
    }
    

    /**
     * 
     * @param {string} inputName 
     * @returns {boolean} Est-ce qu'il y a un message d'erreur correspondant au nom de l'input ?
     */
    isMessageCorrespondsTo(inputName)
    {
        return this.emptyInputsMessage[inputName] !== null || this.emptyInputsMessage[inputName] !== undefined
    }

    /**
     * 
     * @param {HTMLInputElement} input 
     */
    showErrorMessage(input)
    {
        if(input.name === 'image'){
            this.alertEmptyImage(input)
        }else{
            this.showMessageAfter(input)
        }
    }

    /**
     * 
     * @param {HTMLInputElement} input 
     */
    alertEmptyImage(input)
    {
        input.focus()
        this.showMessageAfter(input)
    }

    createFailParapgraph(inputName)
    {
        const message = this.emptyInputsMessage[inputName]
        if(!isUndefined(message)){
            let failParagraph = this.createElement('small', 'form-text text-muted fail')
            failParagraph.innerHTML = message
            return failParagraph
        }
        return ''
    }
    
    showAlertMsgBeforeBtn(inputName)
    {
        this.form.removeChild(this.modalAddBtn)
        let failParagraph = this.createFailParapgraph(inputName)

        this.form.appendChild(failParagraph)
        this.form.appendChild(this.modalAddBtn)
    }

    showMessageAfter(input)
    {
        const failParagraph = this.createFailParapgraph(input.name)
        const elementAfterInput = input.nextElementSibling

        if(elementAfterInput === null && failParagraph !== ''){
            input.after(failParagraph)
            this.modalHeightToAdd = failParagraph.offsetHeight
            this.growModalHeigth()
        }
    }
    

    growModalHeigth()
    {
        this.modal.style.height = this.modal.offsetHeight + this.modalHeightToAdd + 'px'
    }

    postContentWithNotificationThenReload()
    {
        post(this.formAction, this.dataToPostObj, this.showProgressBar)
            .then(response => {
                this.closeModal()
                if(this.showNotification) {
                    this.showNotificationWithDataInMilliseconds({
                        className: this.notificationClassName, 
                        content: JSON.parse(response).success
                    }, 2000)
                    this.reloadPage()
                }else if(!this.showNotification && this.showProgressBar){
                    removeProgressbar()
                }
        }).catch(error => {
            this.handleErrorsCatching(error)
            // IL FAUT TRAITER LES ERREURS PLUS TARD
        })
    }

    handleErrorsCatching(catchedError)
    {
        let errorResponse = JSON.parse(catchedError)
        if("errors" in errorResponse){
            this.handleErrorsMessageFromServer(errorResponse.errors)
        }else if("fail" in errorResponse){
            this.handleFailMessageFromServer(errorResponse.fail)
        }
    }
    
    handleErrorsMessageFromServer(errors)
    {
        console.log(errors)
    }

    handleFailMessageFromServer(failMessage)
    {
        console.log(failMessage)
    }

    submitDirectyly()
    {
        this.modal.querySelector('form').submit()
    }

    reloadPage()
    {
        setTimeout(()=>{
            location.reload()
        }, this.timeOutForReload)
    }

    /**
     * 
     * @param {{className: string, content: string}} data 
     * @param {number} timeInMilliseconds 
     */
    showNotificationWithDataInMilliseconds(data, timeInMilliseconds)
    {
        this.createModal(data.className, data.content)
        setTimeout(()=>{
            console.log('close modal in show notif')
            this.closeModal()
        }, timeInMilliseconds)
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} contentHTML 
     */
    innerElementContentHTML(element, contentHTML)
    {
        if(typeof contentHTML === "object") {
            element.appendChild(contentHTML)
        }else {
            element.innerHTML = contentHTML
        }
        
    }

    stopEventPropagationInBody()
    {
        document.body.addEventListener('click', e => {
            e.stopPropagation()
        })
    }

    /**
     * 
     * @param {Event} e 
     * @param {{className: string, content: string | {}, appendTo: HTMLElement | null}} data 
     */
    toggleMenu(e, data)
    {   
        this.menu = document.querySelector(".menu." + data.className)
        if(this.menu === null){
            this.showMenu(data, e.currentTarget)
        }else{
            this.hideMenu()
        }
    }

    /**
     * 
     * @param {{className: string, content: string}} data 
     */
    showMenu(data, btnClickedForMenu)
    {
        this.btnClickedForMenu = btnClickedForMenu
        this.menu = this.createElement('div', `menu ${data.className}`)
        document.body.appendChild(this.menu) 

        this.setMenuPositionByBtnClickedAndMenuWidth()
        this.innerElementContentHTML(this.menu, data.content)
        this.animateElementFromClassname(this.menu, 'active-menu')
    }
    

    hideMenu()
    {
        if(this.menu){
            this.menu.classList.remove('active-menu')
            this.menu.addEventListener('transitionend', ()=>{
                if(this.menu.parentElement){
                    this.menu.parentElement.removeChild(this.menu)
                }
            })
        }
    }

    hideMenuWhenBodyClick()
    {
        document.body.addEventListener('click', (e)=>{
            this.hideMenu()
        })
    }

    setMenuPositionByBtnClickedAndMenuWidth()
    {
        let buttonRect = this.btnClickedForMenu.getBoundingClientRect()
        this.menu.style.left = buttonRect.x - this.menu.offsetWidth / 2 + "px"
        this.menu.style.top = buttonRect.top + this.btnClickedForMenu.offsetHeight + 'px'
        
    }

    createTooltipMenu(e, data)
    {
        this.toggleMenu(e, data)
    }

    static removeCircleLoader()
    {
        const circleLoader = document.querySelector('.circle_loader')
        if(circleLoader !== null){
            document.body.removeChild(circleLoader)
        }   
    }

    /**
     * 
     * @param {string} method 
     * @param {string} className 
     * @returns {HTMLFormElement}
     */
    createForm(method, className = null)
    {
        let form = this.createElement('form', className)
        form.method = method
        form.action = this.formAction
        return form
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {number} milliseconds 
     * @param {{classNameToRemove: string | null, elementWithHeightToDecrease: [element: HTMLElement, value: number]}} options
     */
    removeElementAfterMilliseconds(element, milliseconds, options)
    {
        setTimeout(()=>{
            if(options.classNameToRemove !== null){
                element.classList.remove(options.classNameToRemove)
            }
            if(options.elementWithHeightToDecrease) {
                let element = options.elementWithHeightToDecrease[0]
                element.style.height = element.offsetHeight - options.elementWithHeightToDecrease[1] + 'px'
            }
            element.parentElement.removeChild(element)
        }, milliseconds)
    }

    removeElementTh(parentElement, toRemoveElement, toAppendElement){
        parentElement.removeChild(toRemoveElement)
        parentElement.appendChild(toAppendElement)
    }

    alertFocusOnElement(element){
        element.classList.add('focus-for-warning')
    }

    removeAlertFocusWhenclick(input)
    {
        input.addEventListener('click', ()=>{
            input.classList.remove('focus-for-warning')
        })
    }
}