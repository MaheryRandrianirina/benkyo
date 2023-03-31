import { classicForLoop, createArray, foreachArrayElements, isUndefined, loopOverObject, pushElementToArray } from "../../Functions/Tools/Tools"

export default class calendarGenerationTools {
    /**
     * 
     * @param {calendarGeneration} calendarGeneration 
     */
    constructor()
    {
        this.modal = document.querySelector('.calendar_creation_modal')
        this.dateTypeInputs = []
        this.inputsWithSameDate = {}
        this.currentDateTypeInput
        this.linesToRepeat = {}
        this.linesOfInputsWithSameDate = {}
        this.linesOfInputsWithSameDatetime = {}
        this.currentObjToLoopForSpacing
        this.nextDateTypeInput
        this.numberOfLinesOfExercise = 0
        this.numberOfLinesOfExercisePerDate = []
        this.spaceIsUnder2H = false
    }

    fillInputsWithSameDate()
    {
        this.inputs = createArray(this.modal.querySelectorAll('input'))
        this.fillDateTypeInputs()
        this.fillInputsWithSameByDateTypeInputs()
        
    }

    fillDateTypeInputs()
    {
        foreachArrayElements(this.inputs, (input) => {
            if(input.id === 'date-input') {
                pushElementToArray(input, this.dateTypeInputs)
            }
        })
    }

    fillInputsWithSameByDateTypeInputs()
    {
        classicForLoop(this.dateTypeInputs, (currentDateTypeInput, nextDateTypeInput) => {
            this.currentDateTypeInput = currentDateTypeInput
            this.nextDateTypeInput = nextDateTypeInput
            if(!isUndefined(nextDateTypeInput)){
                this.handleDateInCurrentAndNextDateTypeInputsAreSame()
                this.handleDateInCurrentAndNextDateTypeInputsAreDifferents()
            }else{
                this.pushCurrentDateTypeInput()
            }
        })
    }

    handleDateInCurrentAndNextDateTypeInputsAreSame()
    {
        const dateInCurrentInput = this.currentDateTypeInput.value
        const dateInNextInput = this.nextDateTypeInput.value
        if(dateInCurrentInput === dateInNextInput){
           this.pushCurrentAndNextDateTypeInputInSameArray(dateInCurrentInput)   
        }
    }

    pushCurrentAndNextDateTypeInputInSameArray(date)
    {
        if(isUndefined(this.inputsWithSameDate[date])){
            this.inputsWithSameDate[date] = []
            this.inputsWithSameDate[date].push(this.currentDateTypeInput)
            this.inputsWithSameDate[date].push(this.nextDateTypeInput)
        }else{
            this.inputsWithSameDate[date].push(this.nextDateTypeInput)
        }
    }

    handleDateInCurrentAndNextDateTypeInputsAreDifferents()
    {
        const dateInCurrentInput = this.currentDateTypeInput.value
        const dateInNextInput = this.nextDateTypeInput.value
        if(dateInCurrentInput !== dateInNextInput){
            this.pushCurrentAndNextDateTypeInputInDifferentArrays(dateInCurrentInput, dateInNextInput)
        }
    }

    pushCurrentAndNextDateTypeInputInDifferentArrays(dateInCurrentInput, dateInNextInput)
    {
        if(isUndefined(this.inputsWithSameDate[dateInCurrentInput])){
            this.inputsWithSameDate[dateInCurrentInput] = []
            this.inputsWithSameDate[dateInCurrentInput].push(this.currentDateTypeInput)
        }else{
            if(isUndefined(this.inputsWithSameDate[dateInNextInput])){
                this.inputsWithSameDate[dateInNextInput] = []
                this.inputsWithSameDate[dateInNextInput].push(this.nextDateTypeInput)
            }
        }
    }

    pushCurrentDateTypeInput()
    {
        const dateInCurrentInput = this.currentDateTypeInput.value
        if(isUndefined(this.inputsWithSameDate[dateInCurrentInput])){
            this.inputsWithSameDate[dateInCurrentInput] = []
            this.inputsWithSameDate[dateInCurrentInput].push(this.currentDateTypeInput)
        }  
    }

    fetchLinesToRepeat()
    {
        loopOverObject(this.inputsWithSameDate, (date, inputs)=>{
            foreachArrayElements(inputs, (input)=> {
                this.pushIntoLinesToRepeatLinesWichAreNotExercise(input, date)
            })
        })
    }

    pushIntoLinesToRepeatLinesWichAreNotExercise(input, date)
    {
        let inputLine = input.parentElement.parentElement
        let inputTypeChapter = inputLine.querySelector('#chapter-input')
        const inputValue = inputTypeChapter.value
        if(inputValue.includes("exercice")){
            this.numberOfLinesOfExercise++
            this.numberOfLinesOfExercisePerDate[date] = this.numberOfLinesOfExercise
        }else {
            if(isUndefined(this.linesToRepeat[date])){
                this.linesToRepeat[date] = []
            }
            this.linesToRepeat[date].push(inputTypeChapter.parentElement.parentElement)
        }
    }
    
    fetchLinesWithSemblablesTimes()
    {
        let tableLines = createArray(this.modal.querySelector('tbody').querySelectorAll('tr'))
        tableLines.forEach(line => {
            const date = line.querySelector('#date-input').value
            const hour = line.querySelector('#hour-input').value
            if(isUndefined(this.linesOfInputsWithSameDate[date])){
                this.linesOfInputsWithSameDate[date] = []
            }
            
            if(isUndefined(this.linesOfInputsWithSameDatetime[date + hour])){
                this.linesOfInputsWithSameDatetime[date + hour] = []
            }

            this.linesOfInputsWithSameDatetime[date + hour].push(line)  
            this.linesOfInputsWithSameDate[date].push(line)
        })
    }

    spaceEveryRevisionsWithSameHour()
    {
        this.currentObjToLoopForSpacing = this.linesOfInputsWithSameDatetime
        this.spaceRevisions()
    }

    spaceEveryRevisionsSpacedUnder2H()
    {
        this.currentObjToLoopForSpacing = this.linesOfInputsWithSameDate
        this.spaceIsUnder2H = true
        this.spaceRevisions()
    }

    spaceRevisions(){
        for(let date in this.currentObjToLoopForSpacing){
            const linesOfInputsPerDateLength = this.currentObjToLoopForSpacing[date].length
            this.addHourIfThereIsMultipleLinesWithSemblablesTime(date, linesOfInputsPerDateLength)    
        }
    }

    addHourIfThereIsMultipleLinesWithSemblablesTime(date, linesOfInputsPerDateLength)
    {
        this.lastHour = 0
        this.lastHourInput
        if(linesOfInputsPerDateLength > 1){
            for(let i = 0; i < linesOfInputsPerDateLength; i++){
                this.hourInputInCurrentLine = this.currentObjToLoopForSpacing[date][i].querySelector('#hour-input')
                this.splittedHour = this.hourInputInCurrentLine.value.split(':')
                this.hourInLine = parseInt(this.splittedHour[0])
                this.handleSameHour(linesOfInputsPerDateLength, i)
                this.handleSpaceUnder2H()
            } 
        }
    }

    handleSameHour(linesOfInputsPerDateLength, indexOfLine)
    {
        if(!this.spaceIsUnder2H && indexOfLine >= Math.floor(linesOfInputsPerDateLength / 2)){
            this.AddNewHourValue({
                hourValue: this.hourInLine,
                valueToAdd: 2
            }, this.hourInputInCurrentLine)
        }
    }
    
    AddNewHourValue(hourProperties, hourInput){
        let newHour = hourProperties.hourValue + hourProperties.valueToAdd
        hourInput.value = newHour + ':' + this.splittedHour[1]
    }

    handleSpaceUnder2H()
    {
        if(this.spaceIsUnder2H){
            if(this.lastHour > 0){
                if(this.hourInLine > this.lastHour){
                        
                    if((this.hourInLine - this.lastHour) < 2 && (this.hourInLine - this.lastHour) > 0){
                            
                        this.AddNewHourValue({
                            hourValue: this.hourInLine,
                            valueToAdd: 1
                        }, this.hourInputInCurrentLine)
                    }
                }else if(this.lastHour > this.hourInLine){
                        
                    if((this.lastHour - this.hourInLine) < 2 && (this.lastHour - this.hourInLine) > 0){
                        this.AddNewHourValue({
                            hourValue: this.lastHour,
                            valueToAdd: 1
                        }, this.lastHourInput)
                    }
                }       
            }

            this.lastHour = this.hourInLine
            this.lastHourInput = this.hourInputInCurrentLine
        }
    }

    pushRemoveButtonIfInRowActionButtonsToArray(rowActionButtons, array)
    {
        if(document.querySelector('.remove_line_button') in rowActionButtons) {
            console.log('ok it\'s in')
        }
    }
}