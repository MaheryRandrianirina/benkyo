

/**
 * 
 * @param {HTMLCollection} elementsCollection 
 * @returns HTMLElement[]
 */
function createConstArray(elementsCollection) {
    return [].slice.call(elementsCollection)
}

function createArray(elementsCollection) {
    return Array.from(elementsCollection)
}


function foreachArrayElements(array, callback) 
{
    array.forEach(element => {
        callback(element)
    })
}

/**
 * 
 * @param {{}} object 
 * @param {(index: number, array: HTMLElement[])=>void} callback 
 */
function loopOverObject(object, callback)
{
    for(let index in object) {
        callback(index, object[index])
    }
}
function classicForLoop(array, callback) {
    for(let i = 0; i < array.length; i++){
        callback(array[i], array[i+1])
    }
}

function pushElementToArray(element, array) {
    array.push(element)
}

/**
 * 
 * @param {any} element 
 * @returns boolean
 */
function isUndefined(element)
{
    return element === undefined
}

/**
 * 
 * @param {[] | undefined} obj 
 */
function IsIterable(obj){
    return !isUndefined(obj) && obj.length > 0 
}

export { 
    createConstArray, createArray, pushElementToArray, foreachArrayElements,
    classicForLoop, loopOverObject, isUndefined, IsIterable
}