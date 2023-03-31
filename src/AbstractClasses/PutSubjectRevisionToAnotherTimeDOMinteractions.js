import { createArray } from "../Functions/Tools/Tools";
import { ThereAreDataToSendWithGETRequest } from "./ThereAreDataToSendWithGETRequest";

export class PutSubjectRevisionToAnotherTimeDOMinteractions extends ThereAreDataToSendWithGETRequest {
    formAction = '/save-revision-for-another-time'
    notificationClassName = 'another_time_revision_notification'
    constructor()
    {
        super()
    }

    processActionsWithoutSendingDataToServer()
    {

    }

    processSendingDataToServer()
    {
        this.closeModal()
        this.hiddenInputsContainingDataNeededForXHR = createArray(this.currentClickedButton.parentElement.parentElement.parentElement.parentElement.querySelectorAll('input[type="hidden"]'))
        this.createDataToPostObjFromModal()
        this.postContentWithNotificationThenReload()
    }
}