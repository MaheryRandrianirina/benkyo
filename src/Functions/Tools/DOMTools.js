/**
 * 
 * @param {string} type 
 * @param {string} className 
 * @returns HTMLElement
 */
function createElement(type, className = null) {
    let element = document.createElement(type)
    if(className !== null) {
        element.className = className
    }

    return element
}

function createProgressbar()
{
    let progressBar = createElement('div', "progress-bar")
    document.body.appendChild(progressBar)
    return progressBar
}

function showProgressBar(progressBar, step)
{
    let widthToAdd = window.innerWidth / 4
    let width = 0
    for(let i = 0; i < step; i++){
        width += widthToAdd
        progressBar.style.width = width + "px"
    }
}

function removeProgressbar()
{
    removeElementFromDOM(document.querySelector('.progress-bar'))
}
/**
 * 
 * @param {HTMLCollection} element 
 */
function goUpToGrandParentGrandParent(elements) {
    elements.forEach(element => {
        element.parentElement.parentElement.parentElement.parentElement.appendChild(element)
    })
}

function elementHasClassName(element, className) {
    return element.classList.contains(className)
}

/**
 * 
 * @param {HTMLElement} element
 */
function removeElementFromDOM(element) {
    element.parentElement.removeChild(element)
}

export { 
    createElement, createProgressbar, goUpToGrandParentGrandParent, 
    elementHasClassName, removeElementFromDOM, showProgressBar , removeProgressbar
}