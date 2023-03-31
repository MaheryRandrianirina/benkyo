import { isUndefined } from "../Functions/Tools/Tools";
import FilePicker from "../Functions/Upload/filePicker";
import DOMInteractions from "./DOMInteractions";

export class EditProfilePhotoDOMInteractions extends DOMInteractions {
    formAction = '/profilePhotoAction'
    notificationClassName = 'edit_profile_photo_notification'

    constructor()
    {
        super()
        this.fileData
        this.showProgressBar = true
    }

    handleActionsInModalForm()
    {
        super.handleActionsInModalForm()
        this.clickOnPickProfilePhotoIcon()
    }

    clickOnPickProfilePhotoIcon()
    {
        const pickProfilePhotoIcon = this.modal.querySelector('.pick-profile-photo')
        pickProfilePhotoIcon.addEventListener('click', this.handlePickProfilePhoto.bind(this))
    }

    async handlePickProfilePhoto()
    {
        this.fileData = await FilePicker()
        const imgName = this.fileData.name
        let imgfilename = document.querySelector('.imgfilename')
        if(isUndefined(imgfilename) || imgfilename === null){
            imgfilename = this.createElement('div', "imgfilename")
            imgfilename.innerHTML = imgName
            this.modal.querySelector('.pick-profile-photo').after(imgfilename)
        }else{
            span.innerHTML = ""
            span.innerHTML = imgName
        }
    }

    createDataToPostObjFromModal()
    {
        if(!isUndefined(this.fileData) && this.fileData !== null) {
            this.dataToPostObj['profilePhoto'] = this.fileData
        }
    }
}