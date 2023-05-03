import { IsIterable, classicForLoop, createArray, foreachArrayElements, isUndefined, loopOverObject, pushElementToArray } from "../../Functions/Tools/Tools"

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
        this.inputsWithPlusValueToAdd = []
        this.currentDateTypeInput
        this.linesToRepeat = {}
        this.linesOfInputsWithSameDate = {}
        /**
         * @type {{[key: string]: HTMLTableRowElement[]} | undefined}
         */
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
    
    fetchRowsWithSameDate()
    {
        let tableLines = createArray(this.modal.querySelector('tbody').querySelectorAll('tr'))
        tableLines.forEach(line => {
            const date = line.querySelector('#date-input').value
            const hour = line.querySelector('#hour-input').value

            if(isUndefined(this.linesOfInputsWithSameDate[date])){
                this.linesOfInputsWithSameDate[date] = []
            }
            
            this.linesOfInputsWithSameDate[date].push(line)
        })
    }

    spaceEveryRevisionsSpacedUnder2H()
    {
        this.countDate = 0
        this.lastCountDate = 0
        
        for(const date in this.linesOfInputsWithSameDate){
            this.currentRowsOfADate = this.linesOfInputsWithSameDate[date]
            this.countDate++
            if(IsIterable(this.currentRowsOfADate)){
                this.comparateTimeValuesInEachRow()
            }
            this.lastCountDate = this.countDate
        }
    }

    
    comparateTimeValuesInEachRow()
    {
        if(!isUndefined(this.currentRowsOfADate)){
            this.takeEachRowAndComparateWithOtherRows()
        }else{
            throw new Error("La propriété this.currentRowWithSameDate est undefined")
        }
    }

    takeEachRowAndComparateWithOtherRows()
    {
        if(isUndefined(this.countDate) || isUndefined(this.lastCountDate)){
            throw new Error("Les propriétés this.countDate et this.lastCountDate ne peuvent pas être undefined.")
        }

        this.currentRowsOfADate?.forEach(row => {
            this.currentHourInput = row.querySelector('#hour-input')
            this.makeComparisonPerDate(row) 
        })
    }

    /**
     * Fait en sorte que la comparaison ne se fasse que dans les lignes de même date.
     * Fait la comparaison des heures à l'intérieur de l'input type=hour des lignes de même date. 
     * @param {HTMLTableRowElement} row
     */
    makeComparisonPerDate(row)
    {
        if(this.currentRowIsOneStepAwayFromThePrecedent()){
            this.comparateCurrentWithDifferentOne(row)
        }
    }

    /**
     * 
     * @returns {boolean} la ligne courrante suit directement la précédente. Il n'y a pas de saut ou autres
     */
    currentRowIsOneStepAwayFromThePrecedent()
    {
        return this.countDate === this.lastCountDate + 1
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     */
    comparateCurrentWithDifferentOne(row)
    {
        this.splittedHourValueOfCurrentInput = this.currentHourInput?.value.split(':')

        this.currentRowsOfADate.forEach(parallelRow => {
            if (row !== parallelRow) {
                this.parallelRowHourInput = parallelRow.querySelector('#hour-input')
                this.splittedParallelRowHourInputValue = this.parallelRowHourInput.value.split(':')
                
                this.currentRowHourValue = this.splittedHourValueOfCurrentInput[0]
                this.currentRowMinutesValue = this.splittedHourValueOfCurrentInput[1]
                this.parallelRowHourValue = this.splittedParallelRowHourInputValue[0]
                this.parallelRowMinutesValue = this.splittedParallelRowHourInputValue[1]

                this.currentAndLastInputsHoursDiff = parseInt(this.currentRowHourValue) -
                    parseInt(this.parallelRowHourValue)
                this.currentAndLastInputsMinutesDiff = parseInt(this.currentRowMinutesValue) -
                    parseInt(this.parallelRowMinutesValue)
                
                if (this.revisionsAreSpacedUnder2H()) {
                    this.spaceIsUnder2H = true
                    this.modifyHour()
                }
            }
        })
    }

    /**
     * @returns boolean
     * @throws {Error} si la variable this.currentAndLastInputsHoursDiff n'est pas définie
     * avant l'appel de la fonction
     */
    revisionsAreSpacedUnder2H() {
        if(!isUndefined(this.currentAndLastInputsHoursDiff)){
            return Math.abs(this.currentAndLastInputsHoursDiff) < 2 || this.fewMinutesMissedToComplete2H()
        }

        throw new Error("La variable this.currentAndLastInputsHoursDiff undefined")
    }

    /**
     * 
     * @returns boolean
     * @throws {Error} si les variables this.currentAndLastInputsMinutesDiff 
     * et this.currentAndLastInputsHoursDiff ne sont pas définies 
     * avant l'appel de la fonction
     */
    fewMinutesMissedToComplete2H()
    {
        if(!isUndefined(this.currentAndLastInputsHoursDiff)
            && !isUndefined(this.currentAndLastInputsMinutesDiff)
        ){
            return (this.currentAndLastInputsHoursDiff < 0 
                && Math.abs(this.currentAndLastInputsHoursDiff) === 2 &&
                this.currentAndLastInputsMinutesDiff > 0) || (this.currentAndLastInputsHoursDiff > 0 
                && Math.abs(this.currentAndLastInputsHoursDiff) === 2 &&
                this.currentAndLastInputsMinutesDiff < 0)
        }

        throw new Error("Les variables this.currentAndLastInputsHoursDiff et this.currentAndLastInputsMinutesDiff sont undefined")
    }

    modifyHour()
    {
        if (
          !isUndefined(this.currentAndLastInputsHoursDiff) &&
          !isUndefined(this.currentAndLastInputsMinutesDiff)
        ) {
            if (this.currentRowHourValueIsSuperior()) {

                this.AddNewHourValue(this.currentHourInput, {
                    hour: parseInt(this.currentRowHourValue) + 1, 
                    minutes: this.parallelRowMinutesValue.length === 1
                    ? "0" + this.parallelRowMinutesValue
                    : this.parallelRowMinutesValue
                }) 

            } else if (this.bothHoursValuesAreEquals()) {

                if (this.currentAndLastInputsMinutesDiff > 0) {
                    this.AddNewHourValue(this.currentHourInput, {
                        hour: parseInt(this.currentRowHourValue) + 2,
                        minutes: this.parallelRowMinutesValue.length === 1
                        ? "0" + this.parallelRowMinutesValue
                        : this.parallelRowMinutesValue
                    })
                } else if (this.currentAndLastInputsMinutesDiff === 0) {
                    this.AddNewHourValue(this.parallelRowHourInput, {
                        hour: parseInt(this.currentRowHourValue) + 2,
                        minutes: this.parallelRowMinutesValue.length === 1
                        ? "0" + this.parallelRowMinutesValue
                        : this.parallelRowMinutesValue
                    })
                } else {
                    this.AddNewHourValue(this.parallelRowHourInput, {
                        hour: parseInt(this.parallelRowHourValue) + 2,
                        minutes: this.currentRowMinutesValue.length === 1
                        ? "0" + this.currentRowMinutesValue
                        : this.currentRowMinutesValue
                    })
                }
            } else {
                this.AddNewHourValue(this.parallelRowHourInput, {
                    hour: parseInt(this.parallelRowHourValue) + 1,
                    minutes: this.currentRowMinutesValue.length === 1
                    ? "0" + this.currentRowMinutesValue
                    : this.currentRowMinutesValue
                })
            }
        }else {
            throw new Error("Les propriétés this.currentAndLastInputsHoursDiff et this.currentAndLastInputsMinutesDiff sont undefined")
        }
    }

    /**
     * 
     * @param {HTMLTableRowElement} hourInput 
     * @param {{hour: number, minutes: number}} time 
     */
    AddNewHourValue(hourInput, time)
    {
        hourInput.value = time.hour.toString().length > 1
                ? time.hour.toString() + ":" + time.minutes
                : "0" + time.hour.toString() + ":" + time.minutes;
    }

    currentRowHourValueIsSuperior()
    {
        return this.currentAndLastInputsHoursDiff > 0
    }

    bothHoursValuesAreEquals()
    {
        return this.currentAndLastInputsHoursDiff === 0
    }

    pushRemoveButtonIfInRowActionButtonsToArray(rowActionButtons, array)
    {
        if(document.querySelector('.remove_line_button') in rowActionButtons) {
            console.log('ok it\'s in')
        }
    }
}