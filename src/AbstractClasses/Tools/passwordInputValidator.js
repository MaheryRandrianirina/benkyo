import { isUndefined } from "../../Functions/Tools/Tools"

export default class passwordInputValidator{
    
    constructor(){

        /**
         * @var {string[]}
         */
        this.completedConditions = []
        this.inputElements = [
            document.getElementById('pwd'),
            document.getElementById('pwd-confirm')
        ]
        
        this.inputElements.forEach(element => {
            if(element !== null){
                element.addEventListener('keyup', this.handleInputElementKeyup.bind(this))
            } 
        })
    }
    
    handleInputElementKeyup(e){
        e.preventDefault()
        let input = e.currentTarget
        this.splittedValueOfEachInput = this.inputElements.map(input => {
            if(input !== null){
                return input.value.split("")
            }else{
                this.inputElements.pop()
            }
        })
        
        this.toggleValueLengthOkConditionCompletedFrom(this.inputElements.indexOf(input))
        this.checkoutInputValidationFrom(input)
    }
    
    toggleValueLengthOkConditionCompletedFrom(indexOfInput){
        const arrayValueOfInput = this.splittedValueOfEachInput[indexOfInput]
        if(!isUndefined(arrayValueOfInput) && arrayValueOfInput.length >= 8){
            this.pushCompletedCondition("valueLengthOk", this.splittedValueOfEachInput.indexOf(arrayValueOfInput))
        }else{
            this.removeLastCompletedCondition("valueLengthOk", this.splittedValueOfEachInput.indexOf(arrayValueOfInput))
        }
    }
    
    pushCompletedCondition(conditionToPush, index){
        if(isUndefined(this.completedConditions[index])){
            this.completedConditions[index] = []
        }
        if(!this.completedConditions[index].includes(conditionToPush)){
            this.completedConditions[index].push(conditionToPush)
        }
    }
    
    removeLastCompletedCondition(conditionToRemove, index)
    {
        if(!isUndefined(this.completedConditions[index]) && this.completedConditions[index].includes(conditionToRemove)){
            let indexOfConditionToRemove = this.completedConditions[index].indexOf(conditionToRemove)
            this.completedConditions[index].splice(indexOfConditionToRemove, 1)
        }
    }
    
    checkoutInputValidationFrom(input) {
        const indexOfInput = this.inputElements.indexOf(input)
        const arrayValueOfInput = this.splittedValueOfEachInput[indexOfInput]
        if(!isUndefined(arrayValueOfInput)){
            this.toggleThereIsNumberConditionCompletedFrom(arrayValueOfInput)
            this.markIfInputIsValidateOrNot(input, this.splittedValueOfEachInput.indexOf(arrayValueOfInput)) 
            this.toggleButtonActivation()
        }
    }
    
    toggleThereIsNumberConditionCompletedFrom(arrayValueOfInput)
    {
        let caraterTypeOfNumber = []
        arrayValueOfInput.forEach(caracter => {
            if(parseInt(caracter)){
                caraterTypeOfNumber.push(caracter)
            }
        })
    
        if(caraterTypeOfNumber.length >= 1){
            this.pushCompletedCondition("thereIsNumber", this.splittedValueOfEachInput.indexOf(arrayValueOfInput))
            
        }else{
            this.removeLastCompletedCondition("thereIsNumber", this.splittedValueOfEachInput.indexOf(arrayValueOfInput))
        }
    }
    
    markIfInputIsValidateOrNot(input, index)
    {
        if(!isUndefined(this.completedConditions[index]) && this.completedConditions[index].length === 2){
            if(!input.classList.contains('is_valid') && input.name !== 'pwd-confirm') {
                input.classList.remove('is_invalid')
                input.classList.add('is_valid')
            }else if((!input.classList.contains('is_valid') && 
                input.name === 'pwd-confirm') && 
                input.value === this.inputElements[0].value
            ) {
                input.classList.remove('is_invalid')
                input.classList.add('is_valid')
            }
        }else{
            input.classList.remove('is_valid')
            if(!input.classList.contains('is_invalid') && input.name !== 'pwd-confirm'){
                input.classList.add('is_invalid')
            }else if((!input.classList.contains('is_invalid') && 
                input.name === 'pwd-confirm') && 
                input.value !== this.inputElements[0].value
            ){
                input.classList.add('is_invalid')
            }
        }
    } 

    toggleButtonActivation()
    {
        let conditionsAreCompletedForEachInput = this.completedConditions.map(completedForInput => {
            if(completedForInput.length === 2) {
                return true
            }else {
                return false
            }
        })
        
        const submitButton = document.querySelector('.submitBtn')
        if(this.completedConditions.length === 2){
            if(conditionsAreCompletedForEachInput[0] === true && 
                conditionsAreCompletedForEachInput[1] === true
            ){
                submitButton.removeAttribute('disabled')
            }else {
                submitButton.setAttribute('disabled', 'true')
            }
        }else {
            if(conditionsAreCompletedForEachInput[0] === true)
            {
                submitButton.removeAttribute('disabled')
            }else {
                submitButton.setAttribute('disabled', 'true')
            } 
        }
    }
}

