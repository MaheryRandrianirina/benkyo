
export class modalResize {
    
    constructor(CalendarCreationDOM) 
    {
        /**
         * @type CalendarCreationDOMInteractions
         */
        this.calendarCreationDOM = CalendarCreationDOM
        this.isRowActionButtonsHidden = false
        this.handleWindowResize()
        window.addEventListener('resize', this.handleWindowResize.bind(this))
    }

    handleWindowResize()
    {
        let hideRowActionButtons = window.innerWidth <= 800
        if(hideRowActionButtons && this.calendarCreationDOM.modal){
            this.isRowActionButtonsHidden = true
            this.calendarCreationDOM.appendRowActionButtonsIntoAMenu()
        }else if(!hideRowActionButtons && this.calendarCreationDOM.modal && this.isRowActionButtonsHidden) {
            this.calendarCreationDOM.getRowActionButtonsOutOfMenu()
            this.isRowActionButtonsHidden = false
        }
    }
}