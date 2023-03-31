import { get } from "jquery";
import { loadContent } from "../home";
import SidebraLeft from "../Modules/SidebarLeft";
import { ThereAreDataToSendWithGETRequest } from "./ThereAreDataToSendWithGETRequest";

export default class deleteCalendarDOMInteractions extends ThereAreDataToSendWithGETRequest {
    
    constructor()
    {
        super()
    }

    processSendingDataToServer()
    {
        get('/drop-calendar').then(res => {
            this.closeModal()
            this.showNotificationWithDataInMilliseconds({
                className: "calendar_deletion_notification",
                content: JSON.parse(res).message
            }, 2000)
            new SidebraLeft()
        }).catch(err => {
            console.error(err)
        }) 
    }
}