export default class Repetition {
    
    constructor() {
        /**
         * @property hoursForNextRepetitions indexé par les rangs de répétitions
         * @type {{number: [number, number],
         * number: [number, number], number: [number, number],
         * number: [number, number], number: [number, number]
         * }}
         */
        this.hoursForNextRepetitions = {
            1: [8, 0],
            2: [24, 1],
            3: [24*7, 7],
            4: [27*7*2, 14],
            5: [24*30, 30]
        }

        /**
         * @type {{morning: [number, number], afternoon: [number, number]}}
         */
        this.hoursInADay = {
            morning : [8, 11.30],
            afternoon: [14, 20]
        }
    }

    /**
     * 
     * @param {number} newHourValue 
     * @return {boolean}
     */
    isBeforeWorkTime(newHourValue) {
        return newHourValue < this.hoursInADay.morning[0]
    }

    /**
     * 
     * @param {number} newHourValue 
     * @return {boolean}
     */
    isInWorkTime(newHourValue) {
        let morningHours = this.repetition.hoursInADay.morning
        let afternoonHours = this.repetition.hoursInADay.afternoon

        return (newHourValue > morningHours[0] 
            && newHourValue < morningHours[1])
            || (newHourValue > afternoonHours[0] 
            && newHourValue < afternoonHours[1])
    }
}