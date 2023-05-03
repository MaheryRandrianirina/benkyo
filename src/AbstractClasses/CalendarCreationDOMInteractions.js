import { post } from "../Functions/Request/ajax";
import { elementHasClassName, removeElementFromDOM } from "../Functions/Tools/DOMTools";
import { createArray, foreachArrayElements, isUndefined, loopOverObject } from "../Functions/Tools/Tools";
import Repetition from "../RepetitionsGeneration/Repetition";
import RepetitionDate from "../RepetitionsGeneration/RepetitionDate";
import { modalResize } from "../responsives/modalResize";
import DOMInteractions from "./DOMInteractions";
import calendarGenerationTools from "./Tools/calendarGenerationTools";

export default class CalendarCreationDOMInteractions extends DOMInteractions {
    formAction = '/create-calendar'
    notificationClassName = 'calendar_creation_notification'

    constructor()
    {
        super()
        this.actionsButtonsPerRow = {}
        this.atLeastOneRowIsExercise = 4
        this.atLeastTwoRowsAreExercises = 5
        this.repetitionLinesHaveBeenCreated = false
        this.tableLinesLengthOfCalendarCreationLines = 1
        this.normalDailyNumberOfSubjects = 3
        this.numberOfRepetitions = 5
        this.createdLines = 0
        this.currentRowToRepeat
        this.isQuotaError = false
        this.isWarning = false
        this.messageForQuotaErrorOne = "Erreur du quota 3 matières/j. Il faut au moins que l'une d'entre elles soient un exercice."
        this.messageForQuotaErrorTwo = "Erreur du quota 3 matières/j. Il faut au moins que deux d'entre elles soient un exercice."
        this.currentQuotaErrorMessageToShow
        this.repetition = new Repetition()
        this.date = new RepetitionDate()
    }

    handleActionsInModalForm()
    {
        super.handleActionsInModalForm()
        this.toolsForCalendarGeneration = new calendarGenerationTools()
        this.handleAddLineButtonClick()
        this.handleCalendarGeneration()
    }

    handleAddLineButtonClick()
    {
        let addLineButton = this.modal.querySelector('.add-line')
        addLineButton.addEventListener('click', this.appendNewLineToCalendarCreationTable.bind(this))  
    }

    appendNewLineToCalendarCreationTable(e){
        this.createLine()
        this.handleRemoveLineButtonClick()
        this.removeRowActionMenuIfExists(e)
        this.handleCalendarGeneration()
        this.handleAddLineButtonClick()
    }

    createLine (){
        this.tableLinesLengthOfCalendarCreationLines++
        this.currentCreatedLine = this.createElement('tr', 'subject-line')
        let removeLineButton = this.modal.querySelector('.remove-line')
        let addLineButton = this.modal.querySelector('.add-line')
        let subjectLine
        let generateCalendarButton 
        if(addLineButton){
            this.addLineButtonContainer = addLineButton.parentElement 
            subjectLine = this.addLineButtonContainer.parentElement
            generateCalendarButton = subjectLine.querySelector('.generate-calendar')
            this.generateCalendarButtonContainer = generateCalendarButton.parentElement
        }
        
        this.calendarCreationTbody = this.modal.querySelector('.calendar-creation-tbody')
        if(removeLineButton !== null){
            removeLineButton.parentElement.parentElement.removeChild(removeLineButton.parentElement) 
        }
        
        this.calendarCreationTbody.appendChild(this.currentCreatedLine)
        let currentCreatedLineInnerHTML = `
        <td><input type='text' name='subject-${this.tableLinesLengthOfCalendarCreationLines}' id='subject-input'></td>
        <td><input type='text' name='chapter-${this.tableLinesLengthOfCalendarCreationLines}' id='chapter-input'></td>
        <td><input type='date' name='date-${this.tableLinesLengthOfCalendarCreationLines}' id='date-input'></td>
        <td><input type='time' name='hour-${this.tableLinesLengthOfCalendarCreationLines}' id='hour-input'></td>
        `
        if(!this.repetitionLinesHaveBeenCreated) {
            currentCreatedLineInnerHTML += `
            <td class='row_action_button add_line_button'><i class='fas fa-plus add-line'></i></td>
            <td class='row_action_button generate_calendar_button'><i class='fas fa-check generate-calendar'></i></td>
            <td class='row_action_button remove_line_button'><i class='fas fa-window-close remove-line'></i></td>
            `
        }
        
        this.currentCreatedLine.innerHTML = currentCreatedLineInnerHTML
        if(window.innerWidth <= 800) {
            this.appendRowActionButtonsIntoAMenu()
        }else {
            if(!isUndefined(subjectLine)){
                subjectLine.removeChild(this.addLineButtonContainer)
                subjectLine.removeChild(this.generateCalendarButtonContainer)
            }
        }
        this.growFormHeight()
        this.growModalHeight()
        this.growBodyHeightIfModalCollapse()
    }

    
    handleRemoveLineButtonClick()
    {
        this.removeLineButton = this.modal.querySelector('.remove-line')      
        if(this.removeLineButton !== null){
            this.handleClickOnRemoveLineButton()
        }
    }

    handleClickOnRemoveLineButton()
    {
        this.removeLineButton.addEventListener('click', (e)=>{
            this.tableLinesLengthOfCalendarCreationLines--
            this.removeLineButtonContainer = this.removeLineButton.parentNode
            let removeLineButtonContainerParent = this.removeLineButtonContainer.parentNode
            
            if(elementHasClassName(removeLineButtonContainerParent, 'action_menu')) {
                removeElementFromDOM(removeLineButtonContainerParent.previousElementSibling)
                removeElementFromDOM(removeLineButtonContainerParent.parentElement)
                this.removeRowActionMenu(removeLineButtonContainerParent)
                this.appendToLastRowActionButtons()
                this.appendRowActionButtonsIntoAMenu()
            }else {
                removeLineButtonContainerParent.classList.add('invisible-subject-line')
                removeLineButtonContainerParent.addEventListener('animationend', ()=>{
                    this.calendarCreationTbody.removeChild(removeLineButtonContainerParent)
                    this.appendToLastRowActionButtons()
                })
            }
            
        })
    }

    appendToLastRowActionButtons()
    {
        this.calendarCreationTbody.lastElementChild.appendChild(this.addLineButtonContainer)
        this.calendarCreationTbody.lastElementChild.appendChild(this.generateCalendarButtonContainer)
        if(this.calendarCreationTbody.firstElementChild !== this.calendarCreationTbody.lastElementChild){
            this.calendarCreationTbody.lastElementChild.appendChild(this.removeLineButtonContainer)
        }

        this.reduceFormHeightUntilNormal()
        this.reduceModalHeightUntilNormal()
        this.reduceBodyHeigthUntilNormal()
    }

    growFormHeight()
    {
        this.growElementSize(this.modalForm, {
            attribute: 'height',
            value: this.modalForm.offsetHeight + this.currentCreatedLine.offsetHeight
        })
    }

    growModalHeight()
    {
        this.growElementSize(this.modal, {
            attribute: 'height',
            value: this.modal.offsetHeight + this.currentCreatedLine.offsetHeight
        })
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {{attribute: string, value: number}} options 
     */
    growElementSize(element, options)
    {
        if(options.attribute === 'width'){
            element.style.width = options.value + 'px'
        }else {
            element.style.height = options.value + 'px'
        }

    }

    growBodyHeightIfModalCollapse()
    {
        if(this.modal.offsetHeight >= 470) {
            this.growElementSize(document.body, {
                attribute: 'height',
                value: document.body.offsetHeight + this.currentCreatedLine.offsetHeight
            })
        }
    }

    reduceFormHeightUntilNormal() {
        let modalFormHeight = this.modalForm.offsetHeight
        if(modalFormHeight > this.originalModalFormHeigth) {
            this.modalForm.style.height = modalFormHeight - this.modal.querySelector('tr').offsetHeight + 'px'
        }
    }

    reduceModalHeightUntilNormal()
    {
        if(this.modal.offsetHeight > this.originalModalHeigth) {
            this.modal.style.height = this.modal.offsetHeight - this.modal.querySelector('tr').offsetHeight + 'px'
        }
    }

    reduceBodyHeigthUntilNormal()
    {
        if(document.body.offsetHeight > this.originalBodyHeight) {
            document.body.style.height = document.body.offsetHeight - this.modal.querySelector('tr').offsetHeight + 'px'
        }
    }

    handleCalendarGeneration()
    {
        let generateCalendarButton = this.modal.querySelector('.generate-calendar')
        generateCalendarButton?.addEventListener('click', this.generateCalendar.bind(this))
    }

    generateCalendar(e)
    {
        this.toolsForCalendarGeneration.fillInputsWithSameDate()
        this.toolsForCalendarGeneration.fetchLinesToRepeat()
        this.generateLinesOfRepetitions()
        this.removeRowActionMenuIfExists(e)
        this.toolsForCalendarGeneration.fetchRowsWithSameDate()
        
        try {
            this.toolsForCalendarGeneration.spaceEveryRevisionsSpacedUnder2H()
        }catch(error){
            console.error(error)
        }
    }

    generateLinesOfRepetitions()
    {
        loopOverObject(this.toolsForCalendarGeneration.inputsWithSameDate, (date, inputs)=>{
            this.numberOfSubjectsIsNormal(inputs, date)
            this.numberOfSubjectsMoreThanNormal(inputs, date)
            
        })
    }

    numberOfSubjectsIsNormal(inputs, date)
    {
        if(inputs.length < this.atLeastOneRowIsExercise 
            && this.toolsForCalendarGeneration
                .linesToRepeat[date] !== undefined
        ){
            this.toolsForCalendarGeneration.linesToRepeat[date].forEach(row => {
                this.currentRowToRepeat = row
                this.generateRepetitionsCalendar(row)    
            })
        }
    }

    numberOfSubjectsMoreThanNormal(inputs, date)
    {
        switch(inputs.length){
            case this.atLeastOneRowIsExercise: 
                this.generateRepetitionsOrShowWarningOne(date)
                break
            case this.atLeastTwoRowsAreExercises:
                this.generateRepetitionsOrShowWarningTwo(date)
                break      
        }
    }
    
    generateRepetitionsOrShowWarningOne(date)
    {
        this.currentQuotaErrorMessageToShow = this.messageForQuotaErrorOne
        this.generateRepetitionsOrShowWarning(date)
    }

    generateRepetitionsOrShowWarningTwo(date)
    {
        this.currentQuotaErrorMessageToShow = this.messageForQuotaErrorTwo
        this.generateRepetitionsOrShowWarning(date)
    }

    generateRepetitionsOrShowWarning(date)
    {
        if(this.toolsForCalendarGeneration.numberOfLinesOfExercisePerDate[date] >= 1){
            if(!this.isQuotaError){
                foreachArrayElements(this.toolsForCalendarGeneration.linesToRepeat[date], (line)=>{
                    this.currentRowToRepeat = line
                    this.generateRepetitionsCalendar(line)
                })
            }
        }else{
            this.showWarning(date)
        }
    }

    showWarning(date)
    {
        this.isQuotaError = true
        this.focusChapterInputOn(this.toolsForCalendarGeneration.linesToRepeat[date])
        this.createWarning(this.currentQuotaErrorMessageToShow)
    }
    
    /**
     * 
     * @param {HTMLTableRowElement[]} linesToRepeatOfADate 
     */
    focusChapterInputOn(linesToRepeatOfADate){
        foreachArrayElements(linesToRepeatOfADate, (line)=>{
            this.alertFocusOnElement(line.querySelector('#chapter-input'))
        })
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    generateRepetitionsCalendar(row){
        let rowInputs = row.querySelectorAll('input')
        let emptyInputExists = false

        rowInputs.forEach(input => {
            if(input.value === ''){
                emptyInputExists = true
            }
        })
        
        if(!emptyInputExists){
            this.repetitionLinesHaveBeenCreated = true
            this.generateLines(row)
        }else{
            if(document.querySelector('.warning') === null){
                this.isWarning = true
                this.createWarning("Impossible de générer les répétitions si les champs sont vides.")
            }
            
        }
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    generateLines(row) {
        for(let i = 1; i <= this.numberOfRepetitions; i++){
            this.createLine()
            this.createdLines = i
            this.generateInputsValue()
        }
    }

    /**
     * 
     * @param {HTMLElement} element IL FAUT REGLER CECI CAR CET ELEMENT RESTE L'ELEMENT INITIAL
     */
    generateInputsValue(){
        let tbody = document.querySelector('tbody')
        let tbodyLastChild = tbody.lastElementChild
        let subjectInput = tbodyLastChild.querySelector('#subject-input')
        let chapterInput = tbodyLastChild.querySelector('#chapter-input')
        let dateInput = tbodyLastChild.querySelector('#date-input')
        let hourInput = tbodyLastChild.querySelector('#hour-input')
    
        subjectInput.value = this.currentRowToRepeat?.querySelector('#subject-input').value
        chapterInput.value = this.currentRowToRepeat?.querySelector('#chapter-input').value
        
        /**
         * @type {[string, string]}
         */
        let splittedHour = this.currentRowToRepeat?.querySelector('#hour-input').value.split(':')
        let splittedDate = this.currentRowToRepeat?.querySelector('#date-input').value.split('-')
        
        let year = splittedDate[0]
        let month = splittedDate[1]
        let day = splittedDate[2]

        
        const hoursForNextRepetitions = this.repetition.hoursForNextRepetitions[this.createdLines]
        let hourBetweenCurrentAndNextRepetition = hoursForNextRepetitions[0]
        
        let hourForNexRepetition = parseInt(splittedHour[0], 10) + hourBetweenCurrentAndNextRepetition
        
        if(this.createdLines === 1){
            if(hourForNexRepetition < 20){
                dateInput.value = this.currentRowToRepeat?.querySelector('#date-input').value
                hourInput.value = hourForNexRepetition.toString(10).length === 1 ? 
                    "0" + hourForNexRepetition + ':' + splittedHour[1] :
                    hourForNexRepetition + ':' + splittedHour[1]
            }else {
                let intNewDayValue = parseInt(day) + 1
                let newDayValue = intNewDayValue.toString().length === 1 ? '0' + intNewDayValue.toString() : intNewDayValue
                hourForNexRepetition = 8
                dateInput.value = year + '-' + month + '-' + newDayValue

                if(dateInput.value === ''){
                    let intMonth = parseInt(month)
                    if(intMonth < 12){
                        dateInput.value = year + '-0' + (intMonth + 1) + '-' + '01'
                    }else{
                        dateInput.value = (parseInt(year) + 1) + '-' + '01' + '-' + '01'
                    }
                }
        
                hourInput.value = '0' + hourForNexRepetition + ':' + splittedHour[1]
            }
            
        }else {
            const intDay = parseInt(day)
            let intNewDayValue = intDay + hoursForNextRepetitions[1]
            let newDayValue = intNewDayValue.toString().length === 1 ? '0' + intNewDayValue.toString() : intNewDayValue
            
            dateInput.value = year + '-' + month + '-' + newDayValue
            if(dateInput.value === ''){
                let intMonth = parseInt(month)
                const intDayInNextMonth = intNewDayValue - this.date.numberOfDaysPerMonth[intMonth]
                const dayInNextMonth = intDayInNextMonth.toString().length === 1 ? "0" + intDayInNextMonth : intDayInNextMonth
                
                if(intMonth < 12){
                    dateInput.value = year + '-0' + (intMonth + 1) + '-' + dayInNextMonth
                }else{
                    dateInput.value = (parseInt(year) + 1) + '-' + '01' + '-' + '01'
                }
            }
            hourInput.value = splittedHour[0] + ':' + splittedHour[1]
        }   

        this.currentRowToRepeat = tbodyLastChild
    }

    createWarning(message){
    
        let warningParagraph = this.createElement('p', 'warning')
        let i = this.createElement('i', 'fas fa-exclamation-triangle')
        let span = this.createElement('span', 'warning-message')

        warningParagraph.appendChild(i)
        warningParagraph.appendChild(span)
        span.innerHTML = message

        this.modal.querySelector('button').before(warningParagraph)
        warningParagraph.offsetWidth
        warningParagraph.classList.add('active_warning')
        const marginBottom = 30
        this.modal.style.height = this.modal.offsetHeight + warningParagraph.offsetHeight + marginBottom + 'px'

        this.removeElementAfterMilliseconds(warningParagraph, 5000, {
            classNameToRemove: 'active_warning',
            elementWithHeightToDecrease: [this.modal, warningParagraph.offsetHeight + marginBottom]
        })
    }

    postContentWithNotificationThenReload()
    {
        post(this.formAction, this.dataToPostObj)
            .then(response => {
                this.handleRequestResponse(response)
            }).catch(error => {
                console.error("Il y a eu une erreur :" + error)
            })
    }

    handleRequestResponse(response)
    {
        let responseJson = JSON.parse(response)
        const message = responseJson.success !== undefined ? responseJson.success : responseJson.fail
        
        this.showNotificationWithDataInMilliseconds({
            className: this.notificationClassName, 
            content: message
        }, 2000)
        
        this.reloadPage() 
    }

    closeModal()
    {
        super.closeModal()
        document.body.style.height = this.originalBodyHeight + 'px'
    }

    removeRowActionMenuIfExists(e)
    {
        let clickedButtonGrandParent = e.currentTarget.parentElement.parentElement
        if(clickedButtonGrandParent 
            && elementHasClassName(clickedButtonGrandParent,'action_menu')
            && !this.isWarning    
        ) {
            this.removeRowActionMenu(clickedButtonGrandParent)
        }
    }

    removeRowActionMenu(rowActionMenu)
    {
        this.hideRowActionMenu(rowActionMenu)
        let rowActionMenuButton = rowActionMenu.parentNode.querySelector('.action_menu_button')
        if(rowActionMenuButton){
            removeElementFromDOM(rowActionMenuButton)
        }
        
        removeElementFromDOM(rowActionMenu)
    }

    handleModalResponsive()
    {
        new modalResize(this)
    }

    appendRowActionButtonsIntoAMenu()
    {
        if(
            (this.modal.querySelector('.action_menu_button') === null || this.lastSubjectRow !== null)
            && !this.repetitionLinesHaveBeenCreated
        ){
            this.subjectRows = createArray(this.modal.querySelectorAll('.subject-line'))
            this.lastSubjectRowIndex = this.subjectRows.length - 1
            this.lastSubjectRow = this.subjectRows[this.lastSubjectRowIndex]
            let rowActionButtons = createArray(this.lastSubjectRow.querySelectorAll('.row_action_button'))
            this.actionsButtonsPerRow[this.lastSubjectRowIndex] = rowActionButtons
            this.createMenuForLastRow()
        }else if(this.repetitionLinesHaveBeenCreated) {
            this.lastSubjectRow = null
            this.rowActionMenuButton = null
            this.actionMenu = null
        }
        
    }

    createMenuForLastRow()
    {
        this.createActionMenuButton(this.lastSubjectRow)
        this.createMenuInRowThenAppendChildren(this.lastSubjectRow, this.actionsButtonsPerRow[this.lastSubjectRowIndex])
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    createActionMenuButton(row)
    {
        this.rowActionMenuButton = row.querySelector('.action_menu_button')
        if(isUndefined(this.rowActionMenuButton) || this.rowActionMenuButton === null) {
            this.rowActionMenuButton = this.createElement('td', 'action_menu_button')
            this.rowActionMenuButton.innerHTML = `<p class='hot_dog_menu_circle'></p>
            <p class='hot_dog_menu_circle'></p>
            <p class='hot_dog_menu_circle'></p>`
            row.appendChild(this.rowActionMenuButton)
            this.rowActionMenuButton.addEventListener('click', this.toggleActionMenuOfTheRow.bind(this, row))
        }
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    createMenuInRowThenAppendChildren(row, futurChildren)
    {
        this.actionMenu = this.createElement('div', 'action_menu')
        futurChildren.forEach(futurChild => {
            this.actionMenu.appendChild(futurChild)
        })
        this.actionMenu.setAttribute('hidden', 'true')
        row.appendChild(this.actionMenu)
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    toggleActionMenuOfTheRow(row)
    {
        let rowActionMenu = row.lastElementChild
        if(rowActionMenu.hasAttribute('hidden')) {
            this.showRowActionMenu(rowActionMenu)
        }else {
            this.hideRowActionMenu(rowActionMenu)
        }
    }

    showRowActionMenu(rowActionMenu)
    {
        rowActionMenu.removeAttribute('hidden')
        rowActionMenu.offsetWidth
        rowActionMenu.classList.add('visible_action_menu')
        if(rowActionMenu.children.length === 3) {
            rowActionMenu.classList.add('three_children')
        }
    }

    hideRowActionMenu(rowActionMenu) 
    {
        rowActionMenu.classList.remove('visible_action_menu')
        const handleTransitionEnd = ()=>{
            rowActionMenu.setAttribute('hidden', 'true')
            if(elementHasClassName(rowActionMenu, 'three_children')) {
                rowActionMenu.classList.remove('three_children')
            }
            rowActionMenu.removeEventListener('transitionend', handleTransitionEnd)
        }
        rowActionMenu.addEventListener('transitionend', handleTransitionEnd)
    }

    getRowActionButtonsOutOfMenu()
    {
        if(this.actionMenuExists()) {
            this.appendActionButtonsInParentRow()
            if(this.actionMenu !== null && !isUndefined(this.actionMenu)) {
                removeElementFromDOM(this.actionMenu)
                removeElementFromDOM(this.rowActionMenuButton)
            }
        }
    }

    actionMenuExists()
    {
        return this.lastSubjectRow !== null && this.rowActionMenuButton !== null && this.actionMenu !== null
    }

    appendActionButtonsInParentRow()
    {
        this.actionsButtonsPerRow[this.lastSubjectRowIndex].forEach(actionButton => {
            this.subjectRows[this.lastSubjectRowIndex].appendChild(actionButton)
        })
    }

    alertEmptyInputs()
    {
        this.modalInputs.forEach(input => {
            if(this.isMessageCorrespondsTo(input.name)){
                this.alertFocusOnElement(input)
                this.removeAlertFocusWhenclick(input)
            }
        })
    }
}