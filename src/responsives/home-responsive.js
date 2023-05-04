import { createElement, elementHasClassName, removeElementFromDOM } from "../Functions/Tools/DOMTools"
import { createArray, createConstArray, foreachArrayElements, isUndefined } from "../Functions/Tools/Tools"

export default class HomeResponsive {
    constructor(){
        this.headCellsIndexedByTheirOriginalIndexes = []
        this.tbodyRowsWithChidren = []
        this.home = document.getElementById('home-main')
        this.content = this.home.querySelector('.content')
        this.isMedium = false
        this.isMobile = false
        this.mediumCount = 0
        this.mobileCount = 0
        this.mediumScreenWidth = 901
        this.mobileScreenWidth = 601
        this.revisionHeadsChildren = []
        this.sidebarLeftButton
        this.subjectsInnerHTML = []
        this.userProfileButton
        this.visibleSidebarLeftWidth
        this.visibleUserProfileWidth

        this.handleResize()
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    /**
     * 
     * @param {Event | null} e 
     */
    handleResize(e = null){
        e?.preventDefault()
        
        let medium = window.innerWidth < this.mediumScreenWidth && window.innerWidth >= this.mobileScreenWidth
        let mobile = window.innerWidth < this.mobileScreenWidth
        
        if(this.isMedium !== medium){
            this.isMedium = medium
        }else if(this.isMobile !== mobile) {
            this.isMobile = mobile
        }

        if(this.isMobile){
            this.displayMobile()
        }else if(this.isMedium){
            this.displayMediumScreen()
        }else {
            this.displayLargeScreen()
        }

        this.toggleRevisionHeadLabels()
    }

    displayMobile()
    {
        this.mediumCount = 0
        this.content.style.width = '100%'

        this.appendSidebarLeftToNavbar()
        this.appendUserProfileButton()

        if(window.innerWidth < 520){
            this.clipSubjectsName()
            this.transformCalendarTable()
        }else{
            this.unclipSubjectsName()
            this.renderCalendarTableToHisOriginalForm()
        }
    }

    appendSidebarLeftToNavbar()
    {
        const className = 'sidebar-left'
        let sidebarLeft = document.querySelector(`.${className}`)
        if(sidebarLeft){
            let logo = document.querySelector('.logo')
            logo.after(sidebarLeft)
            sidebarLeft.classList.add('menu')
            sidebarLeft.classList.remove(className)
        } 
    }

    appendUserProfileButton()
    {
        if(!this.thereAreButtons()){
            this.userProfileButton = createElement('div', 'buttons_for_hidden_sidebars user_profile_button')
            this.userProfileButton.innerHTML = `
            <i class='fas fa-arrow-left'></i>
            `
            this.home.appendChild(this.userProfileButton)
            this.userProfileButton?.addEventListener('click', this.toggleUserProfile.bind(this))
        } 
    }

    clipSubjectsName()
    {
        this.subjects = createArray(this.content.querySelectorAll('.subject-name'))
        if(this.subjectsInnerHTML.length === 0) {
            this.subjects.forEach(subject => {
                let subjectText = subject.innerHTML
                this.subjectsInnerHTML[this.subjects.indexOf(subject)] = subjectText
                if(subjectText.length > 4){
                    subject.innerHTML = subjectText.substring(0,4).toUpperCase()
                }
            })
        }
    }

    transformCalendarTable()
    {
        this.calendar = this.content.querySelector('.calendar')
        if(this.calendar) {
            this.appendHeadCellsIntoSelectElement()
            this.fetchAllTbodyRows()
            this.showOnlyColumsCorrespondantsToSelectedOption()
            this.optionChoice()
        }
    }

    appendHeadCellsIntoSelectElement()
    {
        let thead = this.calendar.querySelector('thead')
        let tr = thead.querySelector('tr')
        let th = createArray(thead.querySelectorAll('th'))
        if(tr.querySelector('select') === null){
            let select = createElement('select')
            let selectParent = createElement('th')
            tr.appendChild(selectParent)
            selectParent.appendChild(select)
            th.forEach(cell => {
                let option = createElement('option')
                select.appendChild(option)
                if(cell.innerText !== 'Matière'){
                    this.headCellsIndexedByTheirOriginalIndexes[th.indexOf(cell)] = cell
                    const i = cell.querySelector('i')
                    if(i){
                        i.setAttribute('hidden', 'true')
                    }
                    option.appendChild(cell)
                    option.setAttribute('value', cell.innerText)
                    select.selectedIndex = 1
                }
            })
        }
    }

    fetchAllTbodyRows()
    {
        if(this.tbodyRowsWithChidren.length === 0){
            let tbodyRows = createArray(this.calendar.querySelectorAll('tbody tr'))
            tbodyRows.forEach(row => {
                let rowChildren = createArray(row.children)
                this.tbodyRowsWithChidren[tbodyRows.indexOf(row)] = rowChildren
                rowChildren.forEach(rowChild => {
                    if(!rowChild.classList.contains('subject_name')){
                        rowChild.setAttribute('hidden', 'true')
                    }
                })
            })
        }
    }

    showOnlyColumsCorrespondantsToSelectedOption()
    {
        this.select = this.calendar.querySelector('select')
        const selectedIndex = this.select.selectedIndex
        this.tbodyRowsWithChidren.forEach(rowWithChildren => {
            rowWithChildren.forEach(child => {
                if(!child.hasAttribute('hidden') && !child.classList.contains('subject_name')){
                    child.setAttribute('hidden', 'true')
                }
            })
            rowWithChildren[selectedIndex].removeAttribute('hidden')
        })
    }

    optionChoice()
    {
        this.select.addEventListener('click', this.showOnlyColumsCorrespondantsToSelectedOption.bind(this))
    }

    unclipSubjectsName()
    {
        if(this.subjectsInnerHTML.length > 0 && this.subjects){
            for(const index in this.subjectsInnerHTML){
                this.subjects[index].innerHTML = this.subjectsInnerHTML[index]
            }
        }
        this.subjectsInnerHTML = []
        this.subjects = undefined
    }

    renderCalendarTableToHisOriginalForm()
    {
        if(this.tbodyRowsWithChidren.length > 0 && this.calendar){
            this.headCellsIndexedByTheirOriginalIndexes.forEach(headCell => {
                this.calendar.querySelector('thead tr').appendChild(headCell)
                let i = headCell.querySelector('i')
                if(i){
                    i.removeAttribute('hidden')
                }
            })
            
            this.tbodyRowsWithChidren.forEach(rowWithChildren => {
                rowWithChildren.forEach(child => {
                    if(child.hasAttribute('hidden')){
                        child.removeAttribute('hidden')
                    }
                })
            })
            
            if(this.select !== null){
                removeElementFromDOM(this.select.parentElement)
                this.select = null
            }
        }
    }

    displayMediumScreen()
    {
        this.mediumCount++
        if(this.mediumCount === 1){
            this.content.style.width = '100%'
            this.removeUserProfileButtonFromMobileScreen()
        }
        
        this.adjustContentWidthFollowingSidebarsWidth()
        this.handleLeftAndRightButtonsInteractions()
        this.renderMenuBackToSidebarLeftIfNecessary()
    }

    removeUserProfileButtonFromMobileScreen()
    {
        if(this.onlyUserProfileButtonExists()){
            this.removeButtonsForHiddenSidebars(true)
        }
    }

    onlyUserProfileButtonExists()
    {
        return this.userProfileButton !== undefined && 
            this.userProfileButton !== null && 
            this.userProfileButton instanceof  HTMLElement && 
            this.sidebarLeftButton === undefined
    }

    /**
     * @param {boolean = false} onlyUserProfile précise si on doit seulement supprimer le sidebar avec
     * la classe "useProfile"
     */
    removeButtonsForHiddenSidebars(onlyUserProfile = false)
    {
        if(!onlyUserProfile && !isUndefined(this.sidebarLeftButton)){
            removeElementFromDOM(this.sidebarLeftButton)
            this.sidebarLeftButton = undefined
        }
        removeElementFromDOM(this.userProfileButton)
        this.userProfileButton = undefined
    }

    /**
     * ajuste la largeur de l'élément possédant la classe "content" suivant la largeur de chacun des sidebars
     */
    adjustContentWidthFollowingSidebarsWidth()
    {
        let visibleSidebars = this.home.querySelectorAll('.visible_sidebar')
        if(visibleSidebars.length > 0){
            let visibleSidebarsWidthSum = 0
            visibleSidebars.forEach(visibleSidebar => {
                visibleSidebarsWidthSum += visibleSidebar.offsetWidth
            })
            this.content.style.width = this.convertToWindowPercent(window.innerWidth - visibleSidebarsWidthSum) + '%'
        }
    }

    handleLeftAndRightButtonsInteractions()
    {
        if(!this.thereAreButtons()){
            this.sidebarLeftButton = createElement('div', 'buttons_for_hidden_sidebars sidebar_left_button')
            this.userProfileButton = createElement('div', 'buttons_for_hidden_sidebars user_profile_button')
            this.sidebarLeftButton.innerHTML = `
            <i class='fas fa-arrow-right'></i>
            `
            this.userProfileButton.innerHTML = `
            <i class='fas fa-arrow-left'></i>
            `
            this.home.appendChild(this.sidebarLeftButton)
            this.home.appendChild(this.userProfileButton)
            this.sidebarLeftButton?.addEventListener('click', this.toggleSidebarLeft.bind(this))
            this.userProfileButton?.addEventListener('click', this.toggleUserProfile.bind(this))
        }  
    }

    thereAreButtons()
    {
        return document.querySelectorAll('.buttons_for_hidden_sidebars').length !== 0
    }

    toggleSidebarLeft(e)
    {
        e.preventDefault()
        let sidebarLeft = document.querySelector('.sidebar-left')
        const sidebarLeftVisibleClassName = 'visible_sidebar_left'
        this.toggleElementClassname(sidebarLeft, sidebarLeftVisibleClassName)
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} classNameToToggle 
     */
    toggleElementClassname(element, classNameToToggle)
    {
        if(!elementHasClassName(element, classNameToToggle)){
            element.classList.add('visible_sidebar')
            element.classList.add(classNameToToggle)
            if(!this.isMobile){
                this.decreaseElementWidth(this.content, element.offsetWidth)
            }
        }else {
            if(!this.isMobile){
                this.increaseElementWidth(this.content, element.offsetWidth)
            }
            element.classList.remove(classNameToToggle)
        }
    }

    /**
     * 
     * @param {HTMLElement} element élément dont la largeur est à diminuer
     * @param {number} toggledElementWidth largeur de l'élémént qui sera déduit à {element}
     */
    decreaseElementWidth(element, toggledElementWidth)
    {
        const elementWidthInPercent = this.convertToWindowPercent(element.offsetWidth - toggledElementWidth)
        element.style.width = elementWidthInPercent + '%'
    }

    convertToWindowPercent(elementWidth)
    {
        return parseFloat(parseFloat(100 / window.innerWidth * elementWidth).toFixed(3))
    }

    /**
     * 
     * @param {HTMLElement} element élément dont la largeur est à augmenter
     * @param {string} toggledElementWidth largeur de l'élémént qui sera ajoutée à {element}
     */
    increaseElementWidth(element, toggledElementWidth)
    {
        const elementWidthInPercent = this.convertToWindowPercent(element.offsetWidth + toggledElementWidth)
        element.style.width = elementWidthInPercent + '%'
    }

    toggleUserProfile(e)
    {
        e.preventDefault()
        let userProfile = document.querySelector('.user-profile-right')
        const userProfileVisibleClassName = 'visible_user_profile'
        this.toggleElementClassname(userProfile, userProfileVisibleClassName)
    }

    renderMenuBackToSidebarLeftIfNecessary()
    {
        let menu = document.querySelector('.menu')
        if(menu !== null){
            this.home.prepend(menu)
            menu.classList.remove('menu')
            menu.classList.add('sidebar-left')
        }
    }

    displayLargeScreen()
    {
        this.mediumCount = 0
        if(this.thereAreButtons()) {
            this.removeButtonsForHiddenSidebars()
            this.removeVisibleClassnameInSidebars()
            this.content.style.width = '74%'
        }
    }

    toggleRevisionHeadLabels()
    {
        this.revisionHeads = createArray(document.querySelectorAll('.revision_head'))
        if(this.revisionHeads.length > 0){
            if(window.innerWidth < 700) {
                this.replaceRevisionHeadLabelsToIcons()
            }else{
                this.reuseLettersForRevisionLabels()
            }
        }
    }

    replaceRevisionHeadLabelsToIcons()
    {
        this.revisionHeads.forEach(revisionHead => {
            let revisionHeadParagraphs = createConstArray(revisionHead.children)
            if(this.revisionHeadsChildren[this.revisionHeads.indexOf(revisionHead)] === undefined){
              this.revisionHeadsChildren[this.revisionHeads.indexOf(revisionHead)] = revisionHeadParagraphs 
            }
            foreachArrayElements(revisionHeadParagraphs, this.replaceToIcons)
        })
    }

    /**
     * 
     * @param {HTMLElement} paragraph 
     */
    replaceToIcons(paragraph)
    {
        let icon = createElement('i')
        
        if(elementHasClassName(paragraph, 'subject')){
            icon.classList.add('fas')
            icon.classList.add('fa-book')
        }else if(elementHasClassName(paragraph, 'chapter')){
            icon.classList.add('fas')
            icon.classList.add('fa-bookmark')
        }else if(elementHasClassName(paragraph, 'time')) {
            icon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-watch">
            <circle cx="12" cy="12" r="7"></circle>
            <polyline points="12 9 12 12 13.5 13.5"></polyline>
            <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
            </path>
            </svg>`
        }else {
            return
        }
        
        paragraph.replaceWith(icon)
    }

    reuseLettersForRevisionLabels()
    {
        this.firstRevisionHeadParagraphsCopy = []
        if(this.revisionHeadsChildren !== null) {
            this.revisionHeads = createArray(document.querySelectorAll('.revision_head'))
            this.appendLabelParagraphsForeachRevisionHead()
        }
    }

    appendLabelParagraphsForeachRevisionHead()
    {
        for(const revisionHeadIndex in this.revisionHeadsChildren) {
                
            this.revisionHeadsChildren[revisionHeadIndex].forEach(revisionHeadParagraph => {
                this.appendLabelParagraphsToARevisionHead(revisionHeadParagraph, revisionHeadIndex)
            })
        }
    }

    appendLabelParagraphsToARevisionHead(revisionHeadParagraph, revisionHeadIndex)
    {
        let currentLoopRevisionHead = this.revisionHeads[revisionHeadIndex]
        if(createArray(currentLoopRevisionHead.children).length === 3){
            currentLoopRevisionHead.innerHTML = ""
        }

        if(revisionHeadParagraph.nodeName === 'P'){
            this.firstRevisionHeadParagraphsCopy.push(revisionHeadParagraph.cloneNode(true))
            currentLoopRevisionHead.appendChild(revisionHeadParagraph)
        }else {
            const paragraphIndex = this.revisionHeadsChildren[revisionHeadIndex].indexOf(revisionHeadParagraph)
            currentLoopRevisionHead.appendChild(this.firstRevisionHeadParagraphsCopy[paragraphIndex])
        }
        
        if(this.revisionHeads.length === 2 && this.revisionHeadsChildren.length === 1){
            this.revisionHeads[1].appendChild(revisionHeadParagraph)
        }
    }

    removeVisibleClassnameInSidebars()
    {
        let visibleSidebarLeft = document.querySelector('.visible_sidebar_left')
        let visibleUserProfile = document.querySelector('.visible_user_profile')
        if(visibleSidebarLeft){
            visibleSidebarLeft.classList.remove('visible_sidebar_left')
        }
        if(visibleUserProfile){
            visibleUserProfile.classList.remove('visible_user_profile')
        }
    }
}