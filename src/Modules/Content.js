import { get } from 'jquery'
import { handleAddCalendar } from '../Functions/handleAddCalendar'
import handleDeleteCalendar from '../user/handleDeleteCalendar'
import SidebraLeft from './SidebarLeft'

export default class Content {
    constructor(content)
    {
        this.root = document.querySelector('.content')
        this.root.innerHTML = content
        this.addCalendarButtonClick()
        this.playButtonClick()
        this.anotherTimeButtonClick() 
        this.calendarTableInteractions()
    }

    addCalendarButtonClick()
    {
        const addCalendar = this.root.querySelector('.add-calendar')
        if(addCalendar !== null){
            addCalendar.addEventListener('click', handleAddCalendar)
        }
    }

    playButtonClick()
    {
        const playButton = this.root.querySelector('.revision-play')
        if(playButton !== null){
            import('../playSubject').then(module => {
                const playSubject = module.default
                playButton.addEventListener('click', playSubject)
            })
            
        }
    }

    anotherTimeButtonClick()
    {
        const anotherTimeButton = this.root.querySelectorAll('.another-time-revision-button')
        if(anotherTimeButton !== null){
            anotherTimeButton.forEach(button => {
                import('../another-time-revision-button-click').then(module => {
                    const anotherTimeRevisionButtonClick = module.default
                    button.addEventListener('click', anotherTimeRevisionButtonClick)
                })
            })
        }
    }

    calendarTableInteractions()
    {
        let tbody = this.root.querySelector('tbody')
            
        if(tbody !== null){
            let subjectDate = tbody.querySelectorAll('.subject-date')
            let date = new Date()
            subjectDate.forEach(sd => {
                const splittedDate = sd.innerHTML.split('-')
                const day = parseInt(splittedDate[0])
                const month = splittedDate[1]
                
                if((day < date.getDate() && month <= date.getMonth()) || month < date.getMonth() + 1){
                    //on supprime l'emploi du temps
                    get('/drop-calendar')
                    new SidebraLeft()
                }
            })

            this.root.querySelector('.delete_button')?.addEventListener('click', handleDeleteCalendar)
        } 
    }
}